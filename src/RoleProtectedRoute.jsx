import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const RoleProtectedRoute = ({ role, children }) => {

    const reduxData = useSelector(state => state.user)
    if (role == reduxData.type) {
        return children
    } else {
        return <Navigate to={"/post/job"} />
    }
}

export default RoleProtectedRoute
