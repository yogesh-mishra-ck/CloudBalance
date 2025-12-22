import CloudKeeper_Logo from "../../assets/ck.png"
import hamburger from "../../assets/hamburger-menu.svg"
import people from "../../assets/people.svg"
import logout from "../../assets//logout.svg"
import i from "../../assets/i.svg"
import './styles.css';
import Footer from '../Footer/Footer'
import { useContext, useEffect } from "react"
import { SidebarContext } from "../UserContext/SidebarContext"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"


function Navbar() {
        const navigate = useNavigate();
        const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);

        const handleOnClick = () => {
            setIsCollapsed(!isCollapsed);
        } 

        const handleLogout = async()=>{

            try{
                const res = await axios.post("http://localhost:8080/logout");
                if(res.status === 200){
                    navigate("login");
                }
            }catch(e){
                console.log("Error occured "+e);
            }

            // localStorage.removeItem('token');
            // navigate('/')
        }

        // useEffect(()=>{
        //     navigate("/login");
        // },[navigate]);
  return (
    <div>
        <nav className="flex w-full h-16 p-3 gap-5 shadow-lg shadow-lg-300">

            {/* 1st part */}
            <img className="h-8 cursor-pointer" src={CloudKeeper_Logo} alt="" />

            {/* 2nd part */}
            <div className="flex gap-4 w-full max-w-screen mt-2">

                <img onClick={handleOnClick} className="h-7 relative bottom-1 cursor-pointer" src={hamburger} alt="" />

                <div className="flex flex-col items-start relative bottom-1.5">
                    <strong>Module</strong>

                    <select
                        className="border-none bg-white relative focus:outline-none bottom-1.5 right-1"
                    >
                        <option>AWS-U1</option>
                        <option>AWS-U2</option>
                    </select>
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
                        <p className="m-0">Yogesh Mishra</p>
                        <img src={i} className="h-5" alt="Username" />
                    </span>
                </main>
                </div>

                {/* Vertical Divider */}
                <p className="text-4xl text-[#f0e9e3]">
                |
                </p>

                {/* Logout Button */}
                <button
                 onClick={handleLogout}
                className="flex items-center justify-center w-39 h-14 
                             gap-3 border-2 border-[#5093d1] rounded 
                            text-[#5093d1] font-black bg-white text-base cursor-pointer"
                
                >
                <img src={logout} alt="" className='h-8' />
                <p className="font-black">Logout</p>
                </button>

            </div>
        </nav>

        {/* <Footer/> */}
    </div>
  )
}

export default Navbar