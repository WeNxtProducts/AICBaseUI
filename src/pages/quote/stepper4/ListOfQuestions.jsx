import React, { useEffect, useState } from 'react';
import { Radio, Input } from 'antd';
import { initialQuestionnaire } from '../QuoteConstant';
import { CustomNumberField } from '../../../components/commonExportsFields/CommonExportsFields'
import { useDispatch } from 'react-redux';
import { setStepperIndex } from '../../../globalStore/slices/QuoteSlice';

const { Group: RadioGroup } = Radio;

const ListOfQuestions = () => {
    const dispatch = useDispatch();
    const [questionnaire, setQuestionnaire] = useState(initialQuestionnaire);

    const handleSectionResponse = (sectionId, response) => {
        setQuestionnaire((prevQuestionnaire) =>
            prevQuestionnaire.map((section) =>
                section.id === sectionId ? { ...section, selected: response } : section
            )
        );
    };

    const handleQuestionInput = (sectionId, questionId, inputValue) => {
        setQuestionnaire((prevQuestionnaire) =>
            prevQuestionnaire.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        questions: section.questions.map((question) =>
                            question.qId === questionId
                                ? { ...question, value: inputValue }
                                : question
                        ),
                    }
                    : section
            )
        );
    };

    return (
        <div>
            <div className='list_of_questions'>
                {questionnaire.map((section) => (
                    <div key={section.id} className='section'>
                        <div className='header'>
                            <span className='main_ques'>{section.label}</span>
                            <RadioGroup
                                options={[
                                    { label: 'Yes', value: 'Yes' },
                                    { label: 'No', value: 'No' },
                                ]}
                                onChange={(e) => handleSectionResponse(section.id, e.target.value)}
                                value={section.selected}
                                optionType='button'
                                buttonStyle='solid'
                            />
                        </div>
                        {section.selected === 'Yes' && section.questions.length > 0 && (
                            <div className='questions_container'>
                                {section.questions.map((question) => (
                                    <div key={question.qId} className='question_item'>
                                        <label className='question_label mr-5'>{question.quest}</label>
                                        <CustomNumberField
                                            format='number'
                                            size='Xsmall'
                                            value={question.value}
                                            onChange={(e) =>
                                                handleQuestionInput(section.id, question.qId, e.target.value)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='save_btn_grid_final mt-3'>
                <button
                    onClick={() => dispatch(setStepperIndex(4))}
                    type='submit'>
                    Save
                </button>
                <button
                    onClick={() => dispatch(setStepperIndex(2))}
                >
                    Previous
                </button>
            </div>
        </div>
    );
};

export default ListOfQuestions;
