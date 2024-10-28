import React from 'react';
import { Button } from 'antd';

const GLActionButtons = () => {
    return (
        <div className='action-buttons'>
            <div className='section-1 flex flex-col items-center'>
                <Button>More Info</Button>
                <Button>Copy</Button>
                <Button>Prem Calc</Button>
                <Button>Bus Rule</Button>
            </div>
        </div>
    );
};

export default GLActionButtons;
