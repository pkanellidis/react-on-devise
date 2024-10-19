import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import axios from 'axios';
import InfoMessage from "../../../Shared/components/Info/InfoMessage";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import FormErrors from "../../../Shared/components/Error/FormErrors";
import {readResponseErrors, readResponseMessage} from "../../../utils/Api/api";

const { Title } = Typography;

const ChangePassword = ({ passwordResetPath,
                            navigationPaths,
                            csrfToken,
                            minimumPasswordLength,
                            resetPasswordToken }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);


    const onFinish = async (values) => {
        setLoading(true);
        setErrors(null);

        try {
            const response = await axios.put(
                passwordResetPath,
                {
                    user: {
                        password: values.password,
                        password_confirmation: values.password_confirmation,
                        reset_password_token: resetPasswordToken
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-Token': csrfToken,
                    }
                }
            );

            setMessage(readResponseMessage(response))
        } catch (error) {
            setErrors(readResponseErrors(error))
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: '500px', margin: 'auto', marginTop: '5%', padding: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Change your password</Title>

            <Form name="change_password_form" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label={`New password ${minimumPasswordLength ? `(${minimumPasswordLength} characters minimum)` : ''}`}
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: minimumPasswordLength, message: `Password must be at least ${minimumPasswordLength} characters long!` }
                    ]}
                >
                    <Input.Password placeholder="Enter your new password" autoComplete="new-password" />
                </Form.Item>

                <Form.Item
                    label="Confirm new password"
                    name="password_confirmation"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Passwords do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm your new password" autoComplete="new-password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Change my password
                    </Button>
                </Form.Item>

                {message && <InfoMessage message={message} />}
                {errors && <FormErrors messages={errors} />}
            </Form>

            <NavigationLinks navigationPaths={navigationPaths} />
        </Card>
    );
};

export default ChangePassword;
