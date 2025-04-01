import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { CustomInput } from '../../../components/commonExportsFields/CommonExportsFields'
import { useDispatch } from 'react-redux';
import { setLoader, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';

const { Group: RadioGroup } = Radio;

const ListOfQuestions = () => {
    const dispatch = useDispatch();
    const LTQuoteQuestionaire = useApiRequests('LTQuoteQuestionaire', 'POST');
    const [questionnaire, setQuestionnaire] = useState([]);

    useEffect(() => {
        handleGetQuestionnaire();
    }, []);

    useEffect(() => {
        console.log('questionnaire : ', questionnaire);
    }, [questionnaire]);

    const handleGetQuestionnaire = async () => {
        dispatch(setLoader(true));
        try {
            const payload = { queryParams: { DTL_DS_TYPE: 1, DTL_DS_CODE: "PRO" } };
            const response = await LTQuoteQuestionaire(payload);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                setQuestionnaire(response?.Data);
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleSectionResponse = (sectionId, response) => {
        setQuestionnaire(prevQuestionnaire =>
            prevQuestionnaire.map(section =>
                section.id === sectionId
                    ? { ...section, selected: response }
                    : section
            )
        );
    };


    const handleQuestionInput = (sectionId, questionId, inputValue) => {
        setQuestionnaire((prevQuestionnaire) =>
            prevQuestionnaire.map((section) => {
                if (section.id === sectionId) {
                    if (section.questions && section.selected) {
                        const updatedQuestions = {
                            ...section.questions,
                            [section.selected]: section.questions[section.selected].map((question) =>
                                question.id === questionId ? { ...question, value: inputValue } : question
                            ),
                        };
                        return { ...section, questions: updatedQuestions };
                    }
                }
                return section;
            })
        );
    };

    const handleSaveQuestions = () => {
        // dispatch(setStepperIndex(4))
    }

    return (
        <div>
            <div className='list_of_questions'>
                {questionnaire.map(section => (
                    <div key={section.id} className='section'>
                        <div className='header'>
                            <span className='main_ques'>{section.label}</span>
                            <RadioGroup
                                options={[
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' },
                                ]}
                                onChange={e => handleSectionResponse(section.id, e.target.value)}
                                value={section.selected || ''}
                                optionType='button'
                                buttonStyle='solid'
                            />
                        </div>
                        {section.selected && section.questions && section?.questions?.[section.selected]?.length > 0 && (
                            <div className='questions_container'>
                                {section?.questions?.[section.selected]?.map((question, index) => (
                                    <div key={question.id} className='question_item'>
                                        <label className='question_label mr-5'>Q{index + 1}. {question.quest}</label>
                                        <CustomInput
                                            size='small'
                                            value={question.value || ''}
                                            onChange={e => handleQuestionInput(section.id, question.id, e.target.value)}
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
                    onClick={() => handleSaveQuestions()}
                >
                    Save
                </button>
                <button
                    onClick={() => dispatch(setStepperIndex(2))}
                >
                    Previous
                </button>
            </div>
        </div >
    );
};

export default ListOfQuestions;
