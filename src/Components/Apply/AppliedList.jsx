import { Fragment, useEffect, useState } from "react"
import { getAppliedList } from "../../Services/job"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import Header from "../Header/Header"
import JobPreview from "../JobBoard/JobPreview"

const AppliendList = () => {

    const [appliedList, setAppliedList] = useState([])
    const { id } = useSelector(state => state.user)

    useEffect(() => {
        const getJobs = async () => {
            const list = await getAppliedList(id)
            if (list.result) {
                setAppliedList(list.result)
            } else {
                return toast.error(list.message)
            }
        }
        getJobs()
    }, [])

    return (
        <Fragment>
            <Header />
            <div className="px-2 md:px-10 mt-20 grid gap-3">
                <div className="col-span-12 md:col-span-8 lg:col-span-9 font-primary rounded-xl relative">

                    {
                        appliedList.length == 0 ?
                            <div className="flex flex-col justify-center items-center animate-floating">
                                <h4 className="">List is empty</h4>
                            </div>
                            : <>{
                                appliedList.map(items => {
                                    return (
                                        <div key={items._id} className="w-full shadow shadow-gray-500 mb-2 rounded-xl p-2">
                                            <JobPreview list status={ items?.status } items={items?.job_info[0]} />
                                        </div>
                                    )
                                })
                            }
                            </>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default AppliendList
