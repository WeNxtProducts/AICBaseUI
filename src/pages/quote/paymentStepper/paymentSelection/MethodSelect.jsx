import React from 'react'
import { payMethodlist } from '../../QuoteConstant'
import { useDispatch, useSelector } from 'react-redux'
import MaterCard from '../../../../assets/MCStamp.png'
import { setPayMethod } from '../../../../globalStore/slices/QuoteSlice'

const MethodSelect = () => {
    const dispatch = useDispatch()
    const payMethod = useSelector((state) => state.quote?.payMethod)

    const handlePayMethod = (id) => {
        dispatch(setPayMethod(id))
    }

    return (
        <div>
            <p className='select_head mb-2'>Choose one of the payment options</p>
            {payMethodlist?.map((item) => (
                <div
                    key={item.id}
                    className={`pay_method_list 
                        ${payMethod === item.id ? 'active' : ''}`}
                    onClick={() => handlePayMethod(item.id)}
                >
                    <div>
                        <img className='pay_img' src={item.img} alt={item.name} />
                        {item.id === 1 && <img className='pay_img mt-2' src={MaterCard} alt={item.name} />}
                    </div>
                    <div className='pay_details'>
                        <p className='pay_name'>{item.name}</p>
                        <p className='pay_description'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MethodSelect