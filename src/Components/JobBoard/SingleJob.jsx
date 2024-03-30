import { useLocation, useNavigate } from "react-router-dom"
import { applyJob, getJobWithId } from "../../Services/job"
import toast from "react-hot-toast"
import moment from "moment"
import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Header from "../Header/Header"
import { getUser } from "../../Services/user"


const SingleJob = () => {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const post_id = query.get("id")
    const [job, setJob] = useState({})
    const [userData, setUserData] = useState({})
    const { id } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getJobWithId(post_id)
            const userinfo = await getUser(id)
            if (response.result && userinfo.result) {
                setJob(response.result)
                setUserData(userinfo.result)
            } else {
                return toast.error(response.message)
            }
        }
        fetchData()
    }, [])

    const checkAlreadyApplied = () => {
        if (job?.pending?.includes(id) || job?.rejected?.includes(id) || job?.accepted?.includes(id)) return true
        return false
    }

    const onApplyJob = async () => {
        navigate(`/apply?job_id=${post_id}`)
    }

    return (
        <Fragment>
            <Header />
            <div className="px-2 md:px-10 mt-20 grid gap-3 grid-cols-12">
                <div className="col-span-12 md:col-span-8 lg:col-span-9">
                    <div className="shadow shadow-black p-3 rounded-xl overflow-clip">
                        <h2 className="text-lg text-green-700 whitespace-pre-wrap">{job?.title}</h2>
                        <p className=" whitespace-pre-wrap mt-2">Location: {job?.location} | Company: {job?.companyName}</p>
                        <p className=" whitespace-pre-wrap mt-2">DESCRIPTION: {job?.description}</p>
                        <p className=" whitespace-pre-wrap mt-2">RESPONSIBILITIES: {job?.responsibilities}</p>
                        <p className=" whitespace-pre-wrap mt-2">QUALIFICATIONS: {job?.qualifications}</p>

                        <p className="mt-2">Posted: <span>{moment(job?.createdAt).fromNow()}</span></p>
                        <div className="md:hidden flex items-center flex-row mt-2">
                            <div className="flex justify-center mr-1.5">
                                <img className="rounded-full w-10 h-10" src={job?.posted?.[0]?.picture} />
                            </div>
                            <div className="text-center flex items-center flex-row">
                                <p className="text-sm mr-1">{job?.posted?.[0]?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:block hidden md:col-span-4 justify-between col-span-12 lg:col-span-3">
                    <div className="shadow p-3 shadow-black rounded-xl w-full">
                        <div className="hidden md:block">
                            <div className="text-md">Posted By</div>
                            <div className="flex justify-center">
                                <img className="rounded-full md:w-28 md:h-28 w-16 h-16" src={job?.posted?.[0]?.picture} />
                            </div>
                            <div className="text-center mt-3">
                                <p>{job?.posted?.[0]?.name}</p>
                            </div>
                        </div>
                        <div className="flex justify-center sm:flex-row md:flex-col flex-col w-full gap-2 mt-2">
                            <button className={`bg-opacity-90 w-full text-white p-1 rounded-xl px-2`} > Send Proposal</button>
                        </div>
                    </div>
                    <button className={`flex ${checkAlreadyApplied() ? `bg-gray-600` : `bg-green-600`} p-2 w-full mt-3 rounded-lg justify-center font-semibold text-white items-center`} onClick={() => !checkAlreadyApplied() && onApplyJob()}><i className="fa fa-paper-plane mt-1 mr-2" /> {checkAlreadyApplied() ? "Applied" : "Apply Now"}</button>
                </div>
            </div>
        </Fragment>
    )
}

export default SingleJob