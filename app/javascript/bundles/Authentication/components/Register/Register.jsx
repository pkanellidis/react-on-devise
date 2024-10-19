import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import axios from 'axios';
import { readResponseErrors, readResponseMessage } from "../../../utils/Api/api";
import FormErrors from "../../../Shared/components/Error/FormErrors";
import InfoMessage from "../../../Shared/components/Info/InfoMessage";
import NavigationLinks from "../NavigationLinks/NavigationLinks";

const { Title } = Typography;

const Register = ({ registrationPath, navigationPaths, csrfToken, minimumPasswordLength = 6 }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        setErrors(null);

        try {
            const response = await axios.post(
                registrationPath,
                {
                    user: {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        username: values.username,
                        password: values.password,
                        password_confirmation: values.password_confirmation
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

            setMessage(readResponseMessage(response));
        } catch (error) {
            setErrors(readResponseErrors(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: '500px', margin: 'auto', marginTop: '5%', padding: '1.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>Sign up</Title>

            <Form name="signup_form" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                    style={{ marginBottom: '0.5rem' }}
                >
                    <Input placeholder="Enter your first name" autoComplete="given-name" />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                    style={{ marginBottom: '0.5rem' }}
                >
                    <Input placeholder="Enter your last name" autoComplete="family-name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                    style={{ marginBottom: '0.5rem' }}
                >
                    <Input type="email" placeholder="Enter your email" autoComplete="email" />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                    ]}
                    style={{ marginBottom: '0.5rem' }}
                >
                    <Input placeholder="Enter your username" autoComplete="username" />
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Password {minimumPasswordLength && <em>({minimumPasswordLength} characters minimum)</em>}
                        </span>
                    }
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: minimumPasswordLength, message: `Password must be at least ${minimumPasswordLength} characters long!` }
                    ]}
                    style={{ marginBottom: '0.5rem' }}
                >
                    <Input.Password placeholder="Enter your password" autoComplete="new-password" />
                </Form.Item>

                <Form.Item
                    label="Password Confirmation"
                    name="password_confirmation"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Passwords do not match!');
                            },
                        }),
                    ]}
                    style={{ marginBottom: '1rem' }}
                >
                    <Input.Password placeholder="Confirm your password" autoComplete="new-password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Sign up
                    </Button>
                </Form.Item>
            </Form>

            {message && (<InfoMessage message={message} />)}
            {errors && <FormErrors messages={errors} />}

            <NavigationLinks navigationPaths={navigationPaths} />
        </Card>
    );
};

export default Register;
