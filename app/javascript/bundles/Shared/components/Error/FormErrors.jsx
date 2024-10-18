import React from 'react';
import { Alert } from 'antd';
import ErrorMessage from "./ErrorMessage";

const FormErrors = ({ messages }) => {
    if (!messages) return null; // Don't render anything if no message is provided

    return (
        <>
            {
                messages.map((message) => {
                    return (<ErrorMessage message={message} key={message}/> )
                })
            }
        </>
    )
};

export default FormErrors;