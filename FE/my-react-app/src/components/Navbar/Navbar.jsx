import CloudKeeper_Logo from "../../assets/ck.png"
import hamburger from "../../assets/hamburger-menu.svg"
import people from "../../assets/people.svg"
import logout from "../../assets//logout.svg"
import i from "../../assets/i.svg"
import './styles.css';
import Footer from '../Footer/Footer'
import { useContext } from "react"
import { SidebarContext } from "../UserContext/SidebarContext"
import { Navigate, useNavigate } from "react-router-dom"


function Navbar() {
        const navigate = useNavigate();
        const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);

        const handleOnClick = () => {
            setIsCollapsed(!isCollapsed);
        } 

        const handleLogout = ()=>{
            localStorage.removeItem('token');
            navigate('/')
    }
  return (
    <div>
        <nav className="flex w-full h-16 p-3 gap-5 shadow-lg shadow-lg-300">

            {/* 1st part */}
            <img className="h-[34px] cursor-pointer" src={CloudKeeper_Logo} alt="" />

            {/* 2nd part */}
            <div className="flex gap-[18px] w-[1200px] mt-[9px]">

                <img onClick={handleOnClick} className="h-[30px] relative bottom-1.0 cursor-pointer" src={hamburger} alt="" />

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
            <div className="flex gap-3 relative left-[60px]">

                {/* People + Welcome */}
                <div className="flex items-center gap-1.5">
                <img
                    src={people}
                    className="border-2 border-[#468ec9] rounded-[40px] p-[5px] bg-white 
                            shadow-sky-700 shadow-xs h-[30px]"
                    alt="People logo"
                />

                <main className="flex flex-col leading-[1.1]">
                    <p className="text-[#2677e2] font-bold">Welcome,</p>

                    <span className="flex items-center gap-[3px]">
                        <p className="m-0">Yogesh Mishra</p>
                        <img src={i} className="h-5" alt="Username" />
                    </span>
                </main>
                </div>

                {/* Vertical Divider */}
                <p className="text-[40px] mb-[50px] text-[#f0e9e3] relative bottom-[13px]">
                |
                </p>

                {/* Logout Button */}
                <button
                 onClick={handleLogout}
                className="flex items-center justify-around w-[150px] h-[55px] 
                            p-2.5 gap-3 border-2 border-[#5093d1] rounded 
                            text-[#5093d1] font-black bg-white text-[16px] relative bottom-1.5 cursor-pointer"
                
                >
                <img src={logout} alt="" className='h-[25px]' />
                <p className="font-black">Logout</p>
                </button>

            </div>
        </nav>

        {/* <Footer/> */}
    </div>
  )
}

export default Navbar