import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from "../Pages/SignupPage"
import ProtectedRoute from "../ProtectedRoute"
import LoginPage from "../Pages/LoginPage"
import PostJob from "../Components/Employer/PostJob/PostJob"
import JobBoardPage from "../Pages/JobBoardPage"
import SingleJob from "../Components/JobBoard/SingleJob"
import ApplyPage from "../Pages/ApplyPage"
import AppliedListPage from "../Pages/AppliedListPage"
import { Fragment } from "react"
import { useSelector } from "react-redux"

const Router = () => {

    const { type } = useSelector(state => state.user)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">

                    {
                        type === "Employer" && <Fragment>
                            <Route exact path="" element={<ProtectedRoute><JobBoardPage /></ProtectedRoute>} />
                            <Route path="/view-job" element={<ProtectedRoute><SingleJob /></ProtectedRoute>} />
                            <Route path="/apply" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
                            <Route path="/applied-list" element={<ProtectedRoute><AppliedListPage /></ProtectedRoute>} />
                        </Fragment>
                    }

                    <Route path="signup" element={<ProtectedRoute signup><SignupPage /></ProtectedRoute>} />
                    <Route path="login" element={<LoginPage />} />

                    {
                        type === "Job Post" && <Fragment>
                            <Route path="post">
                                <Route path="job" element={<ProtectedRoute>
                                    <PostJob />
                                </ProtectedRoute>} />
                            </Route>
                        </Fragment>
                    }

                </Route>
                <Route path="*" element={(<div>Page Not Found!</div>)} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router