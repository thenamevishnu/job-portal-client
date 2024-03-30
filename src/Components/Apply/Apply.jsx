import { useLocation, useNavigate } from "react-router-dom"
import { applyJob, getJobWithId, uploadResume } from "../../Services/job"
import { getUser } from "../../Services/user"
import toast from "react-hot-toast"
import Header from "../Header/Header"
import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

const Apply = () => {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const post_id = query.get("job_id")
    const [job, setJob] = useState({})
    const [userData, setUserData] = useState({})
    const { id } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState({ name: "", resume: "", coverletter: "" })

    useEffect(() => {
        const fetchData = async () => {
            const response = await getJobWithId(post_id)
            const userinfo = await getUser(id)
            if (response.result && userinfo.result) {
                if (response.result?.pending?.includes(id) || response.result?.rejected?.includes(id) || response.result?.accepted?.includes(id)) {
                    navigate("/")
                } else {
                    setJob(response.result)
                    setUserData(userinfo.result)
                }

            } else {
                return toast.error(response.message)
            }
        }
        fetchData()
    }, [])

    const onApplyJob = async (e) => {
        e.preventDefault()
        if (!userInput.name) {
            return toast.error("Name is empty")
        }
        if (!userInput.coverletter) {
            return toast.error("Cover letter is empty")
        }
        if (!userInput.resume) {
            return toast.error("select your resume")
        }
        const url = await uploadResume(userInput.resume)
        const userForm = { ...userInput, resume: url, post_id: post_id, user_id: id, status: "pending" }
        const response = await applyJob(id, post_id, userForm)
        if (response.status == "OK") {
            job?.pending?.push(id)
            navigate(`/view-job?id=${post_id}&timestamp=${new Date().getTime()}`)
        } else {
            return toast.error(response.message)
        }
    }

    return (
        <Fragment>
            <Header />
            <div className="mt-20 flex justify-center font-primary px-2 md:px-10">
                <form className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={async (e) => await onApplyJob(e)}>
                    <h1 className=" text-center font-medium text-xl mb-5">Apply For The Job</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-user"></i>
                        <input type="text" placeholder="Name" name="name" className=" outline-none p-2 w-full" value={userInput.name} onChange={(e) => setUserInput({ ...userInput, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="p-1 px-2 rounded-xl h-12 mt-3 shadow shadow-black flex items-center relative">
                        <div className="flex justify-center w-full items-center"><i className="fa fa-upload"></i>
                            <p className="w-full ms-2 text-gray-400">Select Resume</p></div>
                        <input type="file" placeholder="resume" name="resume" className="opacity-0 absolute outline-none p-2 w-full" onChange={(e) => setUserInput({ ...userInput, [e.target.name]: e.target.files[0] })} />
                        <span className="text-sm flex whitespace-nowrap">{userInput?.resume?.name}</span>
                    </div>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center mt-3">
                        <i className="fa fa-book"></i>
                        <textarea type="text" placeholder="Cover letter" name="coverletter" className=" outline-none p-2 w-full" value={userData.coverletter} onChange={(e) => setUserInput({ ...userInput, [e.target.name]: e.target.value })} ></textarea>
                    </div>
                    <div className="flex flex-col text-center justify-center mt-5">

                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-1.5 px-2" type="submit">Apply</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Apply