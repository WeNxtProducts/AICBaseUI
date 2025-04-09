import React from 'react'
import PlanSummaryList from '../../../components/planSummaryList/PlanSummaryList'

const PlanSummarySelected = () => {
    const plans = [
        { type: "GOLD", name: "Plan A" },
        { type: "SILVER", name: "Plan B" },
        { type: "PLATINUM", name: "Plan C" }
    ];

    return (
        <div className="selected_plan_summary">
            {plans.map((plan, index) => (
                <PlanSummaryList key={index} type={plan.type} name={plan.name} />
            ))}
        </div>
    )
}

export default PlanSummarySelected