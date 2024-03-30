import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from "../Pages/SignupPage"
import ProtectedRoute from "../ProtectedRoute"
import LoginPage from "../Pages/LoginPage"
import RoleProtectedRoute from "../RoleProtectedRoute"
import PostJob from "../Components/Employer/PostJob/PostJob"
import JobBoardPage from "../Pages/JobBoardPage"
import SingleJob from "../Components/JobBoard/SingleJob"
import ApplyPage from "../Pages/ApplyPage"

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">

                    <Route exact path="" element={<ProtectedRoute><RoleProtectedRoute role={"Employer"}><JobBoardPage /></RoleProtectedRoute></ProtectedRoute>} />
                    <Route path="/view-job" element={<ProtectedRoute><RoleProtectedRoute role={"Employer"}><SingleJob /></RoleProtectedRoute></ProtectedRoute>} />
                    <Route path="/apply" element={<ProtectedRoute><RoleProtectedRoute role={"Employer"}><ApplyPage /></RoleProtectedRoute></ProtectedRoute>} />

                    <Route path="signup" element={<ProtectedRoute signup><SignupPage /></ProtectedRoute>} />
                    <Route path="login" element={<LoginPage />} />

                    <Route path="post">
                        <Route path="job" element={<ProtectedRoute>
                            <RoleProtectedRoute role={"Job Post"}>
                                <PostJob />
                            </RoleProtectedRoute>
                        </ProtectedRoute>} />

                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router