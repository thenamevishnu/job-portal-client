import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../Redux/UserSlice/UserSlice"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useSelector(state => state.user)

    const logout = () => {
        dispatch(updateUser({
            id: "",
            name: "",
            username: "",
            email: "",
            picture: "",
            type: "",
            token: ""
        }))
        navigate("/login")
    }

    return (
        <div className="h-16 flex justify-between px-5 items-center bg-gray-100 shadow shadow-black">
            <div className="font-bold text-mg">JOB PORTAL</div>
            <div>{id && <button className="bg-red-700 text-white px-2 p-1 rounded-xl" onClick={logout}>LogOut</button>}</div>
        </div>
    )
}

export default Header
