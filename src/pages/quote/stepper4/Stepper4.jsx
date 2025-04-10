import React from 'react'
import ListOfQuestions from './ListOfQuestions'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { setStepperIndex } from '../../../globalStore/slices/QuoteSlice'
import { useDispatch } from 'react-redux'

const Stepper4 = () => {
    const dispatch = useDispatch()

    return (
        <div className='stepper_4'>
            <div className="relative grid items-center">
                <div
                    onClick={() => dispatch(setStepperIndex(2))}
                    className="absolute left-0 flex items-center space-x-2 group cursor-pointer">
                    <ArrowLeftOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                    <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Back</span>
                </div>
                <p className="head_questionnaire">Questionnaire</p>
            </div>
            <ListOfQuestions />
        </div>
    )
}

export default Stepper4