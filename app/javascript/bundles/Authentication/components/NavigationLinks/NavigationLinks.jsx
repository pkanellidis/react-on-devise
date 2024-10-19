import React from 'react';
import { Space, Typography, Button } from 'antd';

const { Link } = Typography;

const NavigationLinks = ({navigationPaths}) => {
    return (
        <div>
            <Space direction="vertical">
                {navigationPaths.login_path && <Link href={navigationPaths.login_path}>Log in</Link>}
                {navigationPaths.sign_up_path && <Link href={navigationPaths.sign_up_path}>Sign up</Link>}
                {navigationPaths.forgot_password_path && <Link href={navigationPaths.forgot_password_path}>Forgot your password?</Link>}
                {navigationPaths.comnfirm_path && <Link href={navigationPaths.comnfirm_path}>Didn't receive confirmation instructions?</Link>}
                {navigationPaths.unlock_path && <Link href={navigationPaths.unlock_path}>Didn't receive unlock instructions?</Link>}
                {navigationPaths.oath_paths && navigationPaths.oath_paths.providers.map((provider) => (
                    <Button key={provider} href={navigationPaths.oath_paths[provider]} type="link">
                        Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </Button>
                ))}
            </Space>
        </div>
    );
};

export default NavigationLinks;
