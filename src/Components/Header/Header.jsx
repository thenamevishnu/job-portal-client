import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../Redux/UserSlice/UserSlice"
import { Link, useNavigate } from "react-router-dom"
import { Fragment } from "react"

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id, type } = useSelector(state => state.user)

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
            <div>{id && <Fragment>
                { type === "Employer" && <Link to={"/applied-list"}>Applied List</Link>}
                <button className="bg-red-700 ms-4 text-white px-2 p-1 rounded-xl" onClick={logout}>LogOut</button>
            </Fragment>}</div>
        </div>
    )
}

export default Header
