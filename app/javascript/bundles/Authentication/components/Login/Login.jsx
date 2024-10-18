import React, {useState} from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import ErrorMessage from "../../../Shared/components/Error/ErrorMessage";

const Login = ({loginPath, navigationPaths, csrf_token}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle form submission
    const onFinish = async (values) => {
        setLoading(true);
        setError(null)

        // Simulate login request
        await fetch(loginPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-Token': csrf_token, // Include Rails CSRF token
            },
            body: JSON.stringify({user: {email: values.email, password: values.password, remember_me: values.remember}})
        }).then((response) => {
            if (response.status === 200 && response.redirected) {
                if (location) {
                    window.location = response.url;
                }
            } else {
                return response.json()
            }
        }).then((data) => {
            console.log(data)
            setLoading(false)
            setError(data.error)
        }).catch((error) => {
            setError(error || "Network error, please try again")
        })
    };

    return (
        <Form
            name="login_form"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
            style={{maxWidth: '500px', margin: 'auto', padding: '2rem'}}
        >

            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!'
                    },
                    {
                        type: 'email',
                        message: 'The input is not a valid email!'
                    }
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon"/>}
                    type="email"
                    placeholder="Email"
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href={navigationPaths.forgot_password_path} style={{float: 'right'}}>
                    Forgot password?
                </a>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                    style={{width: '100%'}}
                >
                    Log in
                </Button>
                Or <a href={navigationPaths.sign_up_path}>register now!</a>
            </Form.Item>

            {error ? <ErrorMessage message={error}/> : null}
        </Form>
    );
};

export default Login;
