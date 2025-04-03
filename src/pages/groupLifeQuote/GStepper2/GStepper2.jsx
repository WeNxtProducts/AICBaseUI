import React from 'react'
import { Divider } from 'antd'
import PlanSummarySelected from './PlanSummarySelected'

const GStepper2 = () => {
    return (
        <div className='stepper_2'>
            <p className='head_benefits'>Plan Summary</p>
            <p className='head_benefits sub-head'>You can choose multiple plans for your convenience</p>
            <Divider />
            <div className='plan_summary'>
                <div className='cover_details'>
                    <PlanSummarySelected />
                </div>
                <div className='extra_details'><p>hello</p></div>
            </div>
        </div>
    )
}

export default GStepper2