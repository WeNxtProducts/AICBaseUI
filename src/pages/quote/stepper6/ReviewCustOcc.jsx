import React from 'react'

const ReviewCustOcc = ({ title, details }) => {
    return (
        <div className='review_details'>
            <p className='review_title'>{title}</p>

            <div className='details_grid'>
                {details?.map((item) => (
                    <div key={item?.id} className='detail_field'>
                        <p>{item?.label}</p>
                        <p>{item?.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewCustOcc