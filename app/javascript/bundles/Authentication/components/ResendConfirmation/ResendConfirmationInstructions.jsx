import React, {useState} from 'react';
import {Form, Input, Button, Card, Typography} from 'antd';
import axios from 'axios';
import InfoMessage from '../../../Shared/components/Info/InfoMessage';
import {readResponseErrors, readResponseMessage} from "../../../utils/Api/api";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import FormErrors from "../../../Shared/components/Error/FormErrors";

const {Title} = Typography;

const ResendConfirmationInstructions = ({confirmationPath, resource, navigationPaths, csrfToken}) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        setErrors(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(confirmationPath, {
                    user: {email: values.email},
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-Token': csrfToken,
                    }
                }
            );

            setSuccessMessage(readResponseMessage(response));
        } catch (errors) {
            setErrors(readResponseErrors(errors));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{
            maxWidth: '500px',
            margin: 'auto',
            marginTop: '5%',
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <Title level={2} style={{textAlign: 'center', marginBottom: '1.5rem'}}>Resend Confirmation
                Instructions</Title>

            <Form
                name="resend_confirmation_form"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: 'Please input your email!'},
                        {type: 'email', message: 'Please enter a valid email!'},
                    ]}
                >
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        autoFocus
                        defaultValue={resource.pending_reconfirmation ? resource.unconfirmed_email : resource.email}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Resend confirmation instructions
                    </Button>
                </Form.Item>
            </Form>

            {errors && <FormErrors messages={errors}/>}
            {successMessage && <InfoMessage message={successMessage}/>}

            <NavigationLinks navigationPaths={navigationPaths}/>
        </Card>
    );
};

export default ResendConfirmationInstructions;
