// BrokerCard.js
import React from 'react';
import { Card } from 'antd';

const BrokerCard = ({ broker }) => {
    return (
        <Card title={broker.PBRK_BRK_NAME} style={{ margin: '10px 0' }}>
            <p>Broker Code: {broker.PBRK_BRK_CODE}</p>
            <p>Designation: {broker.PBRK_BRK_DESGNATION}</p>
        </Card>
    );
};

export default BrokerCard;
