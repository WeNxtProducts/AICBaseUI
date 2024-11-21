import React from 'react';
import { Button } from 'antd';

const PMActionButtons = () => {
    return (
        <div className='action-buttons'>
            <div className='section-1 flex flex-col items-center'>
                <Button>Withdrawal SetUp</Button>
                <Button>Product Factors</Button>
                <Button>Prem Calc</Button>
                <Button>Bus Rule</Button>
            </div>
        </div>
    );
};

export default PMActionButtons;
