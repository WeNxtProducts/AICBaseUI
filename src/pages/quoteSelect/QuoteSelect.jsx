import React from 'react'
import FromHeader from '../../components/fieldsWithValues/FromHeader'
import PlanCard from '../../components/quoteProdListing/productCard/PlanCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFrom, setLife } from '../../globalStore/slices/QuoteProdPlanSlice'

const QuoteSelect = ({ from, next }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const planList = [
        {
            LABEL: 'Individual Life',
            VALUE: 'IL'
        },
        {
            LABEL: 'Group Life',
            VALUE: 'GL'
        }
    ]

    const handleSelectPlan = item => {
        dispatch(setFrom(from));
        dispatch(setLife(item?.VALUE));
        navigate(next);
    };

    return (
        <div className='quote_selection'>
            <div>
                <FromHeader name={'Quote'} />
                <div className='mt-1 grid grid-cols-4 gap-5 pl-2'>
                    {planList?.map(item => (
                        <div key={item?.VALUE} className='col-span-1'>
                            <PlanCard value={item} onSelect={handleSelectPlan} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuoteSelect