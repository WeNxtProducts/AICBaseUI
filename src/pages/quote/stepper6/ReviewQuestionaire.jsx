import React from 'react'

const ReviewQuestionaire = ({ list }) => {

    return (
        <div className='review_questionaire'>
            <p className="review_title">Health Questions</p>
            {list?.map((item, index) => (
                <div key={item?.id} className='mt-1'>
                    <p className='question'><span className='answer_label'>{index + 1} : </span>{item?.label}</p>
                    <p className='question'><span className='answer_label'>Answer : </span>{item?.yesOrNo === 'yes' ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    )
}

export default ReviewQuestionaire
