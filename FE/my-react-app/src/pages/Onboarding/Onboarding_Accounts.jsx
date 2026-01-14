import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { useNavigate } from "react-router-dom";

export default function Onboarding_Accounts() {

    const [allAccounts, setAllAccounts] = useState([]);

    const navigate = useNavigate();
    const handleLinkAccount = ()=>{
        navigate("/dashboard/accounts");
    };

    useEffect(()=>{
        const getAccounts = async()=>{
          try{
            const res = await axiosInstance.get("/admin/account");
            console.log("response is");
            console.log(res.data);
            console.log(res.status)
            setAllAccounts(res.data);

          }catch(err){
            console.error(err);
            setAllAccounts([])
          }
        }
        getAccounts();
        
    },[])

  return (
    <div>
      <button className="text-white font-bold px-4 py-2 bg-blue-900 rounded-md cursor-pointer" onClick={handleLinkAccount}>
        Link Accounts
      </button>

      {/* table  */}

      <main className="w-300 mt-5">
        <div className="overflow-y-auto h-220">
          <table className="table-auto  w-full">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border-r border-gray-300  w-65 px-2 py-1">
                  <div className="flex justify-between font-medium">
                    <span>Account ARN</span>
                    
                  </div>
                </th>
                <th className="border-r border-gray-300   w-65 px-2 py-1">
                  <div className="flex justify-between font-medium">
                    <span>Account Name</span>
                    
                  </div>
                </th>
                <th className="border-r border-gray-300 w-65 px-2 py-1">
                  <div className="flex justify-between font-medium">
                    <span>Account ID</span>
                    
                  </div>
                </th>
                
              </tr>
            </thead>

            <tbody className="">
              {allAccounts.map((account, index) => (
                <tr key={account.id}>
                  <td
                    className={` border-r border-gray-300 border-l w-65  px-2 py-1 ${
                      index === allAccounts.length - 1 ? "border-b" : ""
                    } ${index % 2 !== 0 ? "bg-gray-200" : ""}`}
                  >
                    <div className="flex justify-between font-medium">
                      <span>{account.arnNumber}</span>
                    </div>
                  </td>
                  <td
                    className={` border-r border-gray-300 border-l w-65  px-2 py-1 ${
                      index === allAccounts.length - 1 ? "border-b" : ""
                    } ${index % 2 !== 0 ? "bg-gray-200" : ""}`}
                  >
                    <div className="flex justify-between font-medium">
                      <span>{account.accountName}</span>
                    </div>
                  </td>
                  <td
                    className={` border-r border-gray-300 border-l w-65  px-2 py-1 ${
                      index === allAccounts.length - 1 ? "border-b" : ""
                    } ${index % 2 !== 0 ? "bg-gray-200" : ""}`}
                  >
                    <div className="flex justify-between font-medium">
                      <span>{account.accountId}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
