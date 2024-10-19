import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import ErrorMessage from "../../../Shared/components/Error/ErrorMessage";
import NavigationLinks from "../NavigationLinks/NavigationLinks";

const { Title } = Typography;

const Login = ({ loginPath, navigationPaths, csrf_token }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(loginPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': csrf_token,
                },
                body: JSON.stringify({
                    user: { email: values.email, password: values.password, remember_me: values.remember }
                }),
            });

            if (response.status === 200 && response.redirected) {
                window.location = response.url;
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError(error.message || "Network error, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: '500px', margin: 'auto', marginTop: '5%', padding: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Log in</Title>
            <Form
                name="login_form"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'The input is not a valid email!' }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loading}
                        style={{ width: '100%' }}
                    >
                        Log in
                    </Button>
                </Form.Item>

                {error && <ErrorMessage message={error} />}
            </Form>
            <NavigationLinks navigationPaths={navigationPaths} />
        </Card>
    );
};

export default Login;
