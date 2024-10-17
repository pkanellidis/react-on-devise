import React from 'react';
import { Alert } from 'antd';

const ErrorMessage = ({ message }) => {
    if (!message) return null; // Don't render anything if no message is provided

    return (
        <Alert
            message="Error"
            description={message}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }} // Space below the alert
        />
    );
};

export default ErrorMessage;