import React, { useContext, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { CustomNumberField } from '../../../../../../../../../components/commonExportsFields/CommonExportsFields';
import { AlterationContext } from './../../AlterationPages';
import PremiumModal from '../premiumCard/PremiumModal';

const PremiumChange = () => {
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
                <div className='prem_calc_msg'>
                    <span className='circle-tick' /> <p>Premium Calculated !!!</p>
                </div>
            </div>
            <div className='change-table'>
                <table className='alter_table'>
                    <thead>
                        <tr>
                            <th />
                            <th>
                                FC AMOUNT <InfoCircleOutlined className='inf_icons' />
                            </th>
                            <th>
                                LC AMOUNT <InfoCircleOutlined className='inf_icons' />
                            </th>
                            <th>
                                CURRENCY <InfoCircleOutlined className='inf_icons' />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>OLD {key === 0 ? 'PREMIUM' : 'SUM ASURED'}</td>
                            <td>20,000</td>
                            <td>20,000</td>
                            <td>USD</td>
                        </tr>
                        <tr>
                            <td>NEW {key === 0 ? 'PREMIUM' : 'SUM ASURED'}</td>
                            <td>
                                <CustomNumberField
                                    placeholder='Enter amount'
                                    value={''}
                                    size='medium'
                                    onChange={e => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <CustomNumberField
                                    placeholder='Enter amount'
                                    value={''}
                                    size='medium'
                                    onChange={e => {
                                        console.log(e.target.value);
                                    }}
                                />
                            </td>
                            <td>USD</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='nav_buttons'>
                <button onClick={() => handlePrev()}>Back</button>
                <button>Premium calc</button>
            </div>

            <div className='mdified_data'>
                <hr />
                <div className='modified_grid'>
                    <p className='prem_style'>Modified {key === 0 ? 'Premium' : 'Sum Assured'}</p>

                    <div className='modfied-table'>
                        <table className='mo-table'>
                            <thead>
                                <tr>
                                    <th>
                                        FC AMOUNT <InfoCircleOutlined className='inf_icons' />
                                    </th>
                                    <th>
                                        LC AMOUNT <InfoCircleOutlined className='inf_icons' />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>40,000</td>
                                    <td>40,000</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='modfied_action'>
                            <div className='nav_buttons'>
                                <button onClick={() => setOpenPremMod(true)}>Back</button>
                                <button>Print</button>
                                <button>Summary</button>
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

export default PremiumChange;
