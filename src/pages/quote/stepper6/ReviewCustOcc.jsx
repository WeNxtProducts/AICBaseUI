import React, { useEffect } from 'react'

const ReviewCustOcc = ({ title, details, data }) => {
    useEffect(() => {
        console.log("Data : ", data)
    }, [])

    return (
        <div className='review_details'>
            <p className='review_title'>{title}</p>

            <div className='details_grid'>
                {Object.keys(data?.formFields).map(fieldKey => {
                    console.log("fieldKey : ", fieldKey)
                    return (
                        <div key={fieldKey} className='detail_field'>
                            <p>{data?.formFields[fieldKey]?.PFD_FLD_NAME}</p>
                            <p>{data?.formFields[fieldKey]?.PFD_FLD_VALUE}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ReviewCustOcc