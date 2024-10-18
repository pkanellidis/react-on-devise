import React from 'react';
import { Alert } from 'antd';

const InfoMessage = ({ message }) => {
    if (!message) return null;

    return (
        <Alert
            message="Information"
            description={message}
            type="info"
            showIcon
            style={{ marginBottom: '16px' }}
        />
    );
};

export default InfoMessage;
