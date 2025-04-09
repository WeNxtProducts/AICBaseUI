import React, { useState } from 'react'
import { Tabs } from 'antd'
import TabPanelHeader from '../../../components/collapsePanelHeader/TabPanelHeader';
import QuoteCheckList from './QuoteCheckList';
import { setLoader, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

const Stepper5 = () => {
    const dispatch = useDispatch();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const tranId = useSelector(state => state?.quote?.tranId);

    const handleTabChange = key => {
        setActiveTabKey(key);
    };

    return (
        <div className='Stepper5'>
            <p className='head_benefits'>Upload Document</p>
            <p className='head_benefits sub-head'>Please upload necessary proof of document</p>
            <p className='head_benefits sub-head mb-3'>Ensure that each document is not more than 300kb in size. file format(JPEG and PDF)</p>

            <div className='upload_docs_area'>
                <div className='plan-tabs p-2'>
                    <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
                        <TabPane key='1' tab={<TabPanelHeader name='CheckList' />}>
                            <QuoteCheckList
                                queryId='264'
                                setLoader={setLoader}
                                tranId={tranId.toString()}
                                uploadscrn='checklist-digital'
                            />
                        </TabPane>
                        <TabPane key='2' tab={<TabPanelHeader name='Medical Examination' />}>
                            <p>Hello</p>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
            <div className='save_btn_grid_final mt-3'>
                <button
                    onClick={() => dispatch(setStepperIndex(5))}
                    type='submit'>
                    Next
                </button>
                <button
                    onClick={() => dispatch(setStepperIndex(3))}
                >
                    Previous
                </button>
            </div>
        </div>
    )
}

export default Stepper5