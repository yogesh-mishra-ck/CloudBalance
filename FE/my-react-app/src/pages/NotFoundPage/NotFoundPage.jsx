
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../../assets/not_found.png";
export default function NotFoundPage(){

    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <img src={NotFoundImage} />
            <p className="text-2xl font-bold">404 The requested page was not found</p>

            <div className="mt-5 flex gap-2 items-center">
                <p>Go To </p>
                <button className="text-white bg-blue-600 px-2 py-1 rounded cursor-pointer" onClick={()=>{
                    navigate("/dashboard")
                }}>Dashboard</button>
            </div>
        </div>
    )
}