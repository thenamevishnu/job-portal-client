import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ login, signup, children }) => {
    
    const reduxData = useSelector(state => state.user)

    if (reduxData.token) {
        if (login || signup) {
            return <Navigate to={"/"} />
        } else {
            return children
        }
    } else {
        if (login || signup) {
            return children
        } else {
            return <Navigate to={"/login"} />
        }
    }
}

export default ProtectedRoute
