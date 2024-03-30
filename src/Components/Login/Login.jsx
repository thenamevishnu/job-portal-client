import { Fragment, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userLogin } from "../../Services/user"
import { updateUser } from "../../Redux/UserSlice/UserSlice"
import Header from "../Header/Header"


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (let key in userData) {
            if (!userData[key]) {
                toast.error(key.replace(key[0], key[0].toUpperCase()) + " is empty!")
                return
            }
        }
        const response = await userLogin(userData)
        if (response.userData) {
            dispatch(updateUser(response.userData))
            localStorage.setItem("token", response.userData.token)
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
                <form className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={async (e) => handleSubmit(e)}>
                    <h1 className=" text-center font-medium text-xl mb-5">Login Now</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-envelope"></i>
                        <input type="text" placeholder="Email" className=" outline-none p-2 w-full" value={userData.email} name="email" onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-key"></i>
                        <input type="password" placeholder="Password" className=" outline-none p-2 w-full" value={userData.password} name="password" onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="flex flex-col text-center justify-center mt-5">
                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-1 px-2" type="submit">Login</button>
                        <p className="mt-3 text-sm">Don't have an account? <span onClick={() => navigate("/signup")} className="text-blue-900 cursor-pointer">Create</span></p>
                    </div>
                </form>
            </div>

        </Fragment>
    )
}

export default Login
