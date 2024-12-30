import React, { useContext, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { CustomInput, CustomTextArea } from '../../../../../../../../../components/commonExportsFields/CommonExportsFields';
import { AlterationContext } from './../../AlterationPages';
import PremiumModal from '../premiumCard/PremiumModal';

const BasicInfoChange = () => {
    const { alterationType, setSelectedAlteration, selectedAlteration } =
        useContext(AlterationContext);
    const { key } = selectedAlteration;

    const [openPremMod, setOpenPremMod] = useState(false)

    const handlePrev = () => {
        setSelectedAlteration(null);
    };

    const handleClose = () => {
        setOpenPremMod(false)
    }

    return (
        <div className='alter_change_page'>
            <div className='flex items-center'>
                <p className='change_style'>Endorsement Details</p>
                {/* <div className='prem_calc_msg'>
                    <span className='circle-tick' /> <p>Premium Calculated !!!</p>
                </div> */}
            </div>
            <div className='change-table'>
                <table className='alter_table alter_left_80'>
                    <thead>
                        <tr>
                            <th />
                            <th>
                                OLD DETAILS <InfoCircleOutlined className='inf_icons' />
                            </th>
                            <th>
                                NEW DETAILS <InfoCircleOutlined className='inf_icons' />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CHANGE IN NAME</td>
                            <td>TEST1 BENEFICIARY</td>
                            <td>
                                <CustomInput
                                    placeholder='name'
                                    value={''}
                                    size='large'
                                    onChange={e => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CHANGE IN BENEFICIARY</td>
                            <td>TEST TEST</td>
                            <td>
                                <CustomInput
                                    placeholder='beneficiary'
                                    value={''}
                                    size='large'
                                    onChange={e => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CHANGE IN ADDRESS</td>
                            <td>35/1,TESTETESTETSTETETSTETEE,
                                UEUIDODIDIDIDIDIDI,EIEIIETTRDSNDU,
                                UTSHJES,EIERYRYYYEY,TETETE-8376483.</td>
                            <td>
                                <CustomTextArea
                                    placeholder='address'
                                    value={''}
                                    size='large'
                                    minHeight={80}
                                    onChange={e => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CHANGE IN E-MAIL</td>
                            <td>TEST@gmail.com</td>
                            <td>
                                <CustomInput
                                    placeholder='email'
                                    value={''}
                                    size='large'
                                    onChange={e => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='nav_buttons'>
                <button onClick={() => handlePrev()}>Back</button>
                <button>Submit</button>
            </div>

            <div className='mdified_data'>
                <hr />
                <div className='modified_grid'>
                    <p className='prem_style'>Details Modified</p>

                    <div className='modfied-table'>
                        <table className='mo-table mo-table-basic-info'>
                            <thead>
                                <tr>
                                    <th />
                                    <th>
                                        OLD DETAILS <InfoCircleOutlined className='inf_icons' />
                                    </th>
                                    <th>
                                        NEW DETAILS <InfoCircleOutlined className='inf_icons' />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Change in Name</th>
                                    <td>TEST</td>
                                    <td>HPHPHP</td>
                                </tr>
                                <tr>
                                    <th>Change in E-mail</th>
                                    <td>Test@gmail.com</td>
                                    <td>hphphp@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='modfied_action'>
                            <div className='nav_buttons'>
                                <button onClick={() => setOpenPremMod(true)}>Back</button>
                                <button>Approve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openPremMod && <PremiumModal open={openPremMod} handleClose={handleClose} />}
        </div>
    );
};

export default BasicInfoChange;
