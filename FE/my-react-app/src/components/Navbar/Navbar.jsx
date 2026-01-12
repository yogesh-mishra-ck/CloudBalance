import CloudKeeper_Logo from "../../assets/ck.png";
import hamburger from "../../assets/hamburger-menu.svg";
import people from "../../assets/people.svg";
import logout from "../../assets//logout.svg";
import i from "../../assets/i.svg";
import "./styles.css";
import Footer from "../Footer/Footer";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../UserContext/SidebarContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetStore, storeAccountIdSelected } from "../../redux/action/actions";
import axiosInstance from "../../utils/axiosInterceptor";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountsDropdownRef = useRef();
  const role = useSelector((state) => state.loggedInUser.role);

  const userData = useSelector((storeData) => {
    return storeData.loggedInUser;
  });

  const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);
  const [accountsThisUser, setAccountsThisUser] = useState([]);
  const [showUserAccounts, setShowUserAccounts] = useState(false);
  const [selectedAccountUI, setSelectedAccountUI] = useState("");

  const handleOnClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleShowAccounts = () => {
    setShowUserAccounts(!showUserAccounts);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true }
      );
    } catch (e) {
      console.log("Error occured " + e);
    } finally {
      dispatch(resetStore());
      localStorage.removeItem("token");
      // setTimeout(() => {
      // }, 0);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!role) return;

    const getAccountsThisUser = async () => {
      try {
        let res;

        if (role === "CUSTOMER") {
          res = await axiosInstance.get("/me/account");
        } else {
          res = await axiosInstance.get("/admin/account");
        }

        setAccountsThisUser(res.data);
      } catch (err) {
        if (err.response?.status === 403) {
          console.warn("Forbidden: role not allowed for this endpoint");
          setAccountsThisUser([]);
        } else {
          console.error("Unexpected error", err);
        }
      }
    };

    getAccountsThisUser();
  }, [role]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        accountsDropdownRef.current &&
        !accountsDropdownRef.current.contains(e.target)
      ) {
        setShowUserAccounts(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountClicked = (account)=>{
    console.log(account.accountId);
    dispatch(storeAccountIdSelected(account.accountId))
    setSelectedAccountUI(account.accountName)
    setShowUserAccounts(false)
   }

  return (
    <div>
      <nav className="flex w-full h-16 p-3 gap-5 shadow-lg-300">
        {/* 1st part */}
        <img className="h-8 cursor-pointer" src={CloudKeeper_Logo} alt="" />

        {/* 2nd part */}
        <div className="flex gap-4 w-full max-w-screen mt-2 accounts-dropdown">
          <img
            onClick={handleOnClick}
            className="h-7 relative bottom-1 cursor-pointer"
            src={hamburger}
            alt=""
          />

          <div className="flex flex-col items-start relative bottom-1.5">
            <div className="relative " ref={accountsDropdownRef}>
              <div>
                <button
                  className="p-2 ml-3 cursor-pointer border rounded bg-white"
                  onClick={handleShowAccounts}
                >
                  {
                  selectedAccountUI == ""
                  ? accountsThisUser[0]?.accountName
                  : selectedAccountUI
                  }
                </button>
              </div>

              {showUserAccounts && (
                <ul className="absolute border mt-1.5 rounded w-48 z-50 bg-white shadow-lg shadow-gray-400">
                  {accountsThisUser.map((account) => (
                    <li key={account.id} className="px-3 py-1 hover:bg-blue-200 cursor-pointer" onClick={() => handleAccountClicked(account)}>
                      {account.accountName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 3rd part */}
        <div className="flex items-center gap-4 shrink-0">
          {/* People + Welcome */}
          <div className="flex items-center gap-1.5">
            <img
              src={people}
              className="border-2 border-[#468ec9] rounded-full p-1 bg-white 
                            shadow-sky-700 shadow-xs h-7"
              alt="People logo"
            />

            <main className="flex flex-col leading-tight">
              <p className="text-[#2677e2] font-bold">Welcome,</p>

              <span className="flex items-center gap-1">
                <p className="m-0">{userData.firstName}</p>
                <p className="m-0">{userData.lastName}</p>
                <img src={i} className="h-5" alt="Username" />
              </span>
            </main>
          </div>

          {/* Vertical Divider */}
          <p className="text-4xl text-[#f0e9e3]">|</p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-39 h-14 
                             gap-3 border-2 border-[#5093d1] rounded 
                            text-[#5093d1] font-black bg-white text-base cursor-pointer"
          >
            <img src={logout} alt="" className="h-8" />
            <p className="font-black">Logout</p>
          </button>
        </div>
      </nav>

      {/* <Footer/> */}
    </div>
  );
}

export default Navbar;
