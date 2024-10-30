import React, { useEffect } from 'react'
import PlanMRVList from './PlanMRVList'
import MedFeeMRV from './../../../../../medicalFee/medPolicyDetails/medFeeMRV/MedFeeMRV';
import PlanMRVForm from './planMRVForm/PlanMRVForm';

const PlanMRV = ({ currentPlan }) => {

    useEffect(() => {
        console.log("currentPlan : ", currentPlan)
    }, [currentPlan])

    return (
        <div className='plan_mrv'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <PlanMRVForm />
                </div>
                <div className='col-span-3 list_grid'>
                    <PlanMRVList queryId={230} tranId={833} />
                </div>
            </div>
        </div>
    )
}

export default PlanMRV
