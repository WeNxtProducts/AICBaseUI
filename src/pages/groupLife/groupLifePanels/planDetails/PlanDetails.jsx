import React, { useEffect, useState } from 'react'
import PlanList from './planList/PlanList'
import PlansTab from './plansTab/PlansTab';

const PlanDetails = () => {
    const [checkedCards, setCheckedCards] = useState([]);

    return (
        <div className='plan_details'>
            <PlanList
                checkedCards={checkedCards} setCheckedCards={setCheckedCards}
            />
            <PlansTab planList={checkedCards} />
        </div>
    )
}

export default PlanDetails
