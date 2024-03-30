
const Pagination = ({ count , updatePage, page}) => {

    return (
        <div className='flex justify-center mt-5 gap-3 mb-4'>
            {
                count.map((_, index) => {
                    return(
                        <div onClick={() => updatePage(index+1)} key={index} className={`w-8 cursor-pointer h-8 flex justify-center items-center ${index+1 == page ? `bg-gray-600` : `bg-purple-900`} bg-opacity-80 text-white rounded-full shadow shadow-gray-500`}>
                            {index+1}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Pagination
