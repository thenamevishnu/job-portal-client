import { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createNewJob } from "../../../Services/job"
import Header from "../../Header/Header"
import toast from "react-hot-toast"

const PostJob = () => {

    const navigate = useNavigate()
    const [postData, setPostData] = useState({ title: "", companyName: "", location: "", description: "", qualifications: "", responsibilities: "" })
    const { id } = useSelector(state => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (let key in postData) {
            if (postData[key] == "") {
                return toast.error(`${key.replace(key[0], key[0].toUpperCase())} is empty`)
            }
        }
        postData.postedBy = id
        const response = await createNewJob(postData)
        if (response.status) {
            setPostData({ title: "", companyName: "", location: "", description: "", qualifications: "", responsibilities: "" })
            return toast.success("New Job Created")
        } else {
            return toast.error(response.message)
        }
    }

    return (
        <Fragment>
            <Header />
            <div className="mt-20 flex justify-center font-primary px-2 md:px-10">
                <form className="w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow shadow-gray-400 rounded-2xl p-5" onSubmit={async (e) => handleSubmit(e)}>
                    <h1 className=" text-center font-medium text-xl mb-5">Post Jobs</h1>
                    <div className="p-1 px-2 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-heading"></i>
                        <input type="text" placeholder="Job Title" className=" outline-none p-2 w-full" name="title" value={postData.title} onChange={e => setPostData({ ...postData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-building"></i>
                        <input type="text" placeholder="Company Name" className=" outline-none p-2 w-full" name="companyName" value={postData.companyName} onChange={e => setPostData({ ...postData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-location-dot"></i>
                        <input type="text" placeholder="Location" className=" outline-none p-2 w-full" name="location" value={postData.location} onChange={e => setPostData({ ...postData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fab fa-readme"></i>
                        <textarea type="text" placeholder="Description" className=" outline-none p-1.5 w-full resize-none hide-scroll" rows={1} name="description" value={postData.description} onChange={e => setPostData({ ...postData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-book"></i>
                        <textarea type="text" placeholder="Qualifications" className=" outline-none p-1.5 w-full resize-none hide-scroll" rows={1} name="qualifications" value={postData.qualifications} onChange={e => setPostData({ ...postData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className="p-1 px-2 mt-3 rounded-xl shadow shadow-black flex items-center">
                        <i className="fa fa-book"></i>
                        <textarea type="text" placeholder="Responsibilities" className=" outline-none p-1.5 w-full resize-none hide-scroll" rows={1} name="responsibilities" value={postData.responsibilities} onChange={e => setPostData({ ...postData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className="flex flex-col text-center justify-center mt-3">
                        <button className="bg-green-700 rounded-xl shadow shadow-gray-900 text-white p-2" type="submit"><i className="fa fa-paper-plane"></i> POST NOW</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default PostJob
