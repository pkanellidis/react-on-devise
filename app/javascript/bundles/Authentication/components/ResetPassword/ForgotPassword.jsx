import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import axios from 'axios';
import ErrorMessage from "../../../Shared/components/Error/ErrorMessage";
import InfoMessage from "../../../Shared/components/Info/InfoMessage";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import {readResponseErrors, readResponseMessage} from "../../../utils/Api/api";
import FormErrors from "../../../Shared/components/Error/FormErrors";

const { Title } = Typography;

const ForgotPassword = ({ passwordResetPath, csrfToken, navigationPaths }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        setErrors(null);
        setMessage(null);

        try {
            const response = await axios.post(
                passwordResetPath,
                {
                    user: {
                        email: values.email,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-Token': csrfToken,
                    },
                }
            );

            setMessage(readResponseMessage(response));
        } catch (error) {
            setErrors(readResponseErrors(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            style={{
                maxWidth: '500px',
                margin: 'auto',
                marginTop: '5%',
                padding: '2rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Title level={2} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Forgot your password?
            </Title>

            <Form name="forgot_password_form" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input type="email" placeholder="Enter your email" autoComplete="email" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ width: '100%' }}
                    >
                        Send me reset password instructions
                    </Button>
                </Form.Item>

                {errors && <FormErrors messages={errors} />}
                {message && <InfoMessage message={message} />}
            </Form>

            <NavigationLinks navigationPaths={navigationPaths} />
        </Card>
    );
};

export default ForgotPassword;
