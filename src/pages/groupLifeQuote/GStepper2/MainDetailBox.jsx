import React from 'react'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

const MainDetailBox = () => {
    return (
        <div className='main_detail_box'>
            <div className='dwn_box'>
                <p className='head1'>Reached SI limit !</p>
                <p className='head2'>Download Medical checklist summary</p>
                <Button htmlType='button' className='btn1_download'>Download</Button>
            </div>

            <div className='communication_box'>
                <p className='head1'>Need your cover summary</p>
                <p className='head1'>as a copy ?</p>
                <p className='head1'>Share it with your device.</p>
                <div className='comm_btn'>
                    <Button htmlType='button' className='btn1_download'>E-mail</Button>
                    <Button htmlType='button' className='btn1_download'>Whatsapp</Button>
                </div>
            </div>

            <div className='grp_details_box'>
                <p className='grp_details_title'>Group Insurance Details</p>
                <hr className='hor_divider' />
                <div className='grp_details'>
                    <div className='grp_details1'>
                        <p className='grp_details_label'>Employer Name</p>
                        <p className='grp_details_value'>ABX TEST</p>
                    </div>
                    <div className='grp_details1'>
                        <p className='grp_details_label'>Assignee Name</p>
                        <p className='grp_details_value'>Rakesh KM</p>
                    </div>
                    <div className='grp_details1'>
                        <p className='grp_details_label'>Total Employee uploded</p>
                        <p className='grp_details_value'>100</p>
                    </div>
                </div>
            </div>

            <div className='grp_details_box'>
                <p className='grp_details_title'>Employee Details</p>
                <hr className='hor_divider' />
                <div className='grp_details'>
                    <div className='grp_details1'>
                        <p className='grp_details_label'>Pension Employees</p>
                        <div className='with_download'>
                            <p className='grp_details_value'>0</p>
                            <DownloadOutlined className='down_icon' />
                        </div>
                    </div>
                    <div className='grp_details1'>
                        <p className='grp_details_label'>Pending Employees</p>
                        <div className='with_download'>
                            <p className='grp_details_value'>0</p>
                            <DownloadOutlined className='down_icon' />
                        </div>
                    </div>
                    <div className='grp_details1'>
                        <p className='grp_details_label'>Rejected Employees</p>
                        <div className='with_download'>
                            <p className='grp_details_value'>0</p>
                            <DownloadOutlined className='down_icon' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDetailBox