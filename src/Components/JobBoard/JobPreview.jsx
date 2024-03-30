import moment from "moment"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"

const JobPreview = ({ items, list, status }) => {

    const navigate = useNavigate()

    return (
        <Fragment>
            <div className="flex justify-between items-baseline">
                <h2 className="text-lg text-green-700 whitespace-pre-wrap cursor-pointer" onClick={() => navigate(`/view-job?id=${items._id}&timestamp=${new Date().getTime()}`)}>{items.title}</h2>
            </div>
            <p className="mt-2 text-sm">{items.location}</p>
            <p className="whitespace-pre-wrap mt-2">{items.description.replace(/\n/gm, " ").length <= 500 ? items.description.replace(/\n/gm, " ").slice(0, 500) : items.description.replace(/\n/gm, " ").slice(0, 500) + "..."}</p>
            <div className="flex justify-between items-baseline mt-3">
                {list ? `Status: ${status}` : <span>Posted: {moment(items.createdAt).fromNow()}</span>}
                <button className="p-1 text-sm px-2 bg-purple-900 bg-opacity-50 rounded-xl text-white" onClick={() => navigate(`/view-job?id=${items._id}&timestamp=${new Date().getTime()}`)}>View Job</button>
            </div>
        </Fragment>
    )
}

export default JobPreview
