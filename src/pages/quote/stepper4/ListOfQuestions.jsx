import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { CustomInput } from '../../../components/commonExportsFields/CommonExportsFields'
import { useDispatch } from 'react-redux';
import { setLoader, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { useSelector } from 'react-redux';

const { Group: RadioGroup } = Radio;

const ListOfQuestions = () => {
    const dispatch = useDispatch();
    const LTQuoteQuestionaire = useApiRequests('LTQuoteQuestionaire', 'POST');
    const LTQuoteQuestionaireSave = useApiRequests('LTQuoteQuestionaireSave', 'POST');
    const tranId = useSelector((state) => state.quote.tranId);
    const [questionnaire, setQuestionnaire] = useState([]);

    useEffect(() => {
        handleGetQuestionnaire();
    }, []);

    const handleGetQuestionnaire = async () => {
        dispatch(setLoader(true));
        try {
            const payload = { queryParams: { DTL_DS_TYPE: 1, DTL_DS_CODE: "PRO", DTL_DTG_GROUP_CODE: "UWQUEST" } };
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
                    ? { ...section, yesOrNo: response }
                    : section
            )
        );
    };


    const handleQuestionInput = (sectionId, questionId, inputValue) => {
        setQuestionnaire((prevQuestionnaire) =>
            prevQuestionnaire.map((section) => {
                if (section.id === sectionId) {
                    if (section.questions && section.yesOrNo) {
                        const updatedQuestions = {
                            ...section.questions,
                            [section.yesOrNo]: section.questions[section.yesOrNo].map((question) =>
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

    const validateQuestions = (questionnaire) => {
        for (const item of questionnaire) {
            if (!Object.prototype.hasOwnProperty.call(item, 'yesOrNo') || !item.yesOrNo) {
                return false;
            }
            const { yes = [], no = [] } = item.questions || {};
            const areQuestionsAnswered = (questions) => {
                return questions.every(question => question.value && question.value.trim() !== '');
            };
            if (item.yesOrNo === 'yes' && yes.length > 0 && !areQuestionsAnswered(yes))
                return false;
            if (item.yesOrNo === 'no' && no.length > 0 && !areQuestionsAnswered(no))
                return false;
        }
        return true;
    };

    const handleSaveQuestions = async () => {
        dispatch(setLoader(true));
        const isValid = validateQuestions(questionnaire);
        if (!isValid) {
            dispatch(setLoader(false));
            showNotification.WARNING('Please fill all the questions');
            return;
        }
        const modifiedPayload = questionnaire.map(item => {
            const { questions, ...rest } = item;
            return { ...rest, quotTranId: tranId, inQuestions: [questions] };
        });
        const payload = { saveQuestions: modifiedPayload };
        console.log(payload);
        try {
            const response = await LTQuoteQuestionaireSave(payload);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                // dispatch(setStepperIndex(4));
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
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
                                value={section.yesOrNo || ''}
                                optionType='button'
                                buttonStyle='solid'
                            />
                        </div>
                        {section.yesOrNo && section.questions && section?.questions?.[section.yesOrNo]?.length > 0 && (
                            <div className='questions_container'>
                                {section?.questions?.[section.yesOrNo]?.map((question, index) => (
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
