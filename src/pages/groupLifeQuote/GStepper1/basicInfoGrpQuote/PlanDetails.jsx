import React from 'react'
import PlanListSelection from '../../../../components/planListSelection/PlanListSelection'

const PlanDetails = ({ planList }) => {
    return (
        <div className='plan_selection'>
            <p className='head_benefits'>Plan Details</p>
            <p className='head_benefits sub-head'>You can choose multiple plans for your convenience</p>
            <PlanListSelection planList={planList} />
        </div>
    )
}

export default PlanDetails