import SearchIcon from "@mui/icons-material/Search";
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function ManageAccount({selectedAccounts, setSelectedAccounts}) {

  const [allAccounts, setAllAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState(new Map());

  useEffect(() => {
    console.log("inside effect");
    const fn = async () => {
      const res = await axiosInstance.get("/admin/account");
      console.log(res.data);
      setAllAccounts(res.data);
    };
    fn();
  }, []);

  const toggleAccountSelection = (account) => {
    setSelectedAccounts((prev) => {
      const currentSelection = new Map(prev);
      if (currentSelection.has(account.id)) {
        currentSelection.delete(account.id);
      } else {
        currentSelection.set(account.id, account);
      }
      return currentSelection;
    });
    console.log(selectedAccounts);
  };

  return (
    <div>
      <p className="text-2xl my-5">Manage Account ID(s)</p>
      <main className="flex gap-3">
        {/* left */}
        <div className="border border-gray-500 rounded">
          <nav className="flex gap-10 bg-sky-100 px-3 py-2">
            <p className="font-bold">Choose Account IDs to Associate</p>
            <p className="text-blue-700">10952 Available</p>
          </nav>

          <div className="flex gap-2 p-2 items-center">
            <div>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search"
              className=" rounded p-1 border-gray-300 w-full mx-1.5"
            />
          </div>

          <ul className=" h-80 overflow-y-auto">
            {allAccounts.map((account) => (
              <div className="p-1" key={account.id}>
                <li
                  className="flex font-bold h-7 mb-1.5 gap-1.5 text-gray-700 cursor-pointer"
                  onClick={() => toggleAccountSelection(account)}
                >
                    {
                        selectedAccounts.has(account.id) ? 
                            <CheckBoxIcon className="text-blue-500"/> : <CheckBoxOutlineBlankSharpIcon className="border-gray-500"/>
                    }



                  <div className="flex">
                    <p>( {account.accountName} )</p>
                    <p className="text-sm">{account.accountId}</p>
                  </div>
                </li>
                <p className="bg-gray-200 border-b "></p>
              </div>
            ))}
          </ul>
        </div>

        {/* middle-arrows */}

        <div className="flex flex-col justify-center gap-20">
          <ArrowCircleRightIcon />
          <ArrowCircleLeftIcon />
        </div>

        {/* right */}

        <div className="border border-gray-500 rounded">
          <nav className="flex gap-10 bg-sky-100 px-3 py-2">
            <p className="font-bold">Choose Account IDs to Associate</p>
            <p className="text-blue-700">10952 Available</p>
          </nav>

          {selectedAccounts.size <= 0 ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center flex-col mt-13">
                <FolderOpenIcon
                  style={{ fontSize: "66px", borderColor: "blue" }}
                />
                <h3>No Account IDs Added</h3>
              </div>
              <p className="text-center">
                Selected Account IDs will be shown here
              </p>
            </div>
          ) : (
            <ul className="h-80 overflow-y-auto">
              {Array.from(selectedAccounts.values()).map((account) => (
                <div className="p-1" key={account.id}>
                  <li
                    className="flex font-bold h-7 mb-1.5 gap-1.5 text-gray-700 cursor-pointer"
                    onClick={() => toggleAccountSelection(account)}
                  >
                    <div className="flex gap-2">
                      <p>({account.accountName})</p>
                      <p className="text-sm">{account.accountId}</p>
                    </div>
                  </li>
                  <p className="bg-gray-200 border-b"></p>
                </div>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
