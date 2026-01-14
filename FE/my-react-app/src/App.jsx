import { Children, useEffect } from "react";

import "./App.css";
import { UserContext } from "./components/UserContext/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import CostExplorer from "./pages/CostExplorer/CostExplorer";
import UserManagement from "./pages/UserManagement/UserManagement";
import AwS_Services from "./pages/AWS_Services/AwS_Services";
import Onboarding from "./pages/Onboarding/Onboarding";
import AddUser from "./pages/AddUser/AddUser";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { Toaster } from "sonner";
import Onboarding2 from "./pages/Onboarding/Onboarding2";
import Onboarding3 from "./pages/Onboarding/Onboarding3";
import Onboarding_Parent from "./pages/Onboarding/Onboarding_Parent";
import Onboarding_Accounts from "./pages/Onboarding/Onboarding_Accounts";
import { CostContextFilter } from "./context/CostContext";
import { CostExplorerProvider } from "./pages/CostExplorer/CostExplorerProvider";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserInfo } from "./redux/action/actions";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userinfo");

    if (token && userInfo) {
      dispatch(loggedInUserInfo(userInfo));
    }
  }, [userInfo, dispatch]);

  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<CostExplorer />} />
              <Route path="cost-explorer" element={<CostExplorer />} />
              <Route path="aws-services" element={<AwS_Services />} />

              <Route
                element={
                  <ProtectedRoutes allowedRoles={["ADMIN", "READ_ONLY"]} />
                }
              >
                <Route path="user-management" element={<UserManagement />}>
                  <Route path="add-user" element={<AddUser />} />   
                </Route>

                <Route path="onboarding" element={<Onboarding_Accounts />} />
                <Route path="accounts" element={<Onboarding_Parent />} />
              </Route>

            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
