import { useLocation, useNavigate } from "react-router-dom"
import { getFullJob } from "../../Services/job"
import toast from "react-hot-toast"
import { Fragment, useEffect, useRef, useState } from "react"
import Header from "../Header/Header"
import { useSelector } from "react-redux"
import Pagination from "../Pagination"
import JobPreview from "./JobPreview"


const JobBoard = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const query = new URLSearchParams(location.search)
    const q = query.get("q")
    const page = query.get("page")
    const pages = useRef(null)
    const [jobs, setJobs] = useState([])
    const [debounceState, setDebounceState] = useState(false)
    const [filters, setFilters] = useState({ q: q || "", page: page || 1 })
    const { id } = useSelector(state => state.user)

    useEffect(() => {
        const getJobs = async () => {
            const job = await getFullJob(filters.q, filters.page)
            if (job.result) {
                setJobs(job.result)
                pages.current = job.pages
            } else {
                return toast.error(job.message)
            }
        }
        getJobs()
    }, [page, debounceState])

    const updatePage = (page) => {
        query.set("page", page)
        setFilters({ ...filters, page: page })
        navigate("/?" + query)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (filters.q) {
                query.set("q", filters.q)
                query.set("page", 1)
                setDebounceState(prev => !prev)
                navigate("/?" + query)
            } else {
                query.delete("q")
                setDebounceState(prev => !prev)
                navigate("/?" + query)
            }
        }, 2000);
        return () => clearTimeout(debounce)
    }, [filters.q])

    return (
        <Fragment>
            <Header />
            <div className="px-2 md:px-10 mt-20 grid gap-3">
                <div className="col-span-12 md:col-span-8 lg:col-span-9 font-primary rounded-xl relative">
                    <div className="flex justify-between items-center">
                        <div className="text-xl uppercase hidden md:block">job board</div>
                        <div className="flex w-full md:w-[300px] lg:w-[400px] xl:w-[550px] items-center shadow shadow-gray-500 rounded-xl mb-2">
                            <input placeholder="Search job..." type="text" name="q" className="p-2 w-full outline-none rounded-xl" value={filters.q} onChange={e => setFilters({ ...filters, q: e.target.value })} />
                            <i className="fa fa-search pr-2 cursor-pointer"></i>
                        </div>
                    </div>
                    {
                        jobs.length == 0 ?
                            <div className="flex flex-col justify-center items-center animate-floating">
                                <img src="data:image/png;base64,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" className="w-96" />
                                <h4 className="">Please try a different combination of filters</h4>
                            </div>
                            : <>{
                                jobs.map(items => {
                                    return (
                                        <div key={items._id} className="w-full shadow shadow-gray-500 mb-2 rounded-xl p-2">
                                            <JobPreview items={items} />
                                        </div>
                                    )
                                })
                            }
                                <Pagination updatePage={updatePage} page={page} count={Array(pages?.current).fill(0)} />
                            </>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default JobBoard
