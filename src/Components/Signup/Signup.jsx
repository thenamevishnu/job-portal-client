import { Fragment, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createNewAccount } from "../../Services/user"
import { updateUser } from "../../Redux/UserSlice/UserSlice"
import Header from "../Header/Header"

const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ name: "", username: "", email: "", password: "", confirm: "", type: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (let key in userData) {
            if (!userData[key]) {
                return toast.error(`${key.replace(key[0], key[0].toUpperCase())} is empty`)
            }
            if (userData.password != userData.confirm) {
                return toast.error(`Password does not match`)
            }
        }
        const response = await createNewAccount(userData)
        if (response.userData) { 
            dispatch(updateUser(response.userData))
            setTimeout(() => {
                if (response.userData.type == "Employer") {
                    navigate("/")
                } else {
                    navigate("/post/job")
                }
            }, 1000)
        } else {
            return toast.error(response.message)
        }
        
    }

    return (
        <Fragment>
            <Header />
            <div className="mt-20 flex justify-center font-primary px-2 md:px-10">
                <form className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={async (e) => await handleSubmit(e)}>
                    <h1 className=" text-center font-medium text-xl mb-5">Register Now</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-user"></i>
                        <input type="text" placeholder="Name" name="name" className=" outline-none p-2 w-full" value={userData.name} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="p-1 px-2 rounded-xl mt-3 shadow shadow-black flex items-center">
                        <i className="fa fa-at"></i>
                        <input type="text" placeholder="Username" name="username" className=" outline-none p-2 w-full" value={userData.username} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-envelope"></i>
                        <input type="text" placeholder="Email" name="email" className=" outline-none p-2 w-full" value={userData.email} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="mt-3 rounded-xl relative flex w-full gap-3 text-center items-center">
                        <div className="shadow shadow-black rounded-xl w-1/2 p-2 relative cursor-pointer" onClick={() => setUserData({ ...userData, type: "Employer" })}>Employer {userData.type == "Employer" && <i className="fa fa-circle-check text-green-700"></i>}<i className="fa fa-circle-info text-gray-500 text-xs absolute top-1 right-1 cursor-pointer group"><span className="font-primary font-normal absolute rounded-md opacity-0 group-hover:opacity-100 pointer-events-none duration-150 transition-all text-white bg-black bg-opacity-80 whitespace-nowrap p-1 right-2 bottom-5 px-2">Account-Type: Employer</span></i></div>
                        <div className="shadow shadow-black rounded-xl w-1/2 p-2 relative cursor-pointer" onClick={() => setUserData({ ...userData, type: "Job Post" })}>Job Post {userData.type == "Job Post" && <i className="fa fa-circle-check text-green-700"></i>}<i className="fa fa-circle-info text-gray-500 text-xs absolute top-1 right-1 cursor-pointer group"><span className="font-primary font-normal absolute rounded-md opacity-0 group-hover:opacity-100 duration-150 pointer-events-none transition-all text-white bg-black bg-opacity-80 whitespace-nowrap p-1 right-2 bottom-5 px-2">Account-Type: Job Post</span></i></div>
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-key"></i>
                        <input type="password" placeholder="Password" name="password" className=" outline-none p-2 w-full" value={userData.password} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center mt-3">
                        <i className="fa fa-lock"></i>
                        <input type="password" placeholder="Confirm Password" name="confirm" className=" outline-none p-2 w-full" value={userData.confirm} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="flex flex-col text-center justify-center mt-5">

                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-1.5 px-2" type="submit">Create Account</button>

                        <p className="mt-3 text-sm">Already have an account? <span onClick={() => navigate("/login")} className="text-blue-900 cursor-pointer">Login</span></p>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Signup
