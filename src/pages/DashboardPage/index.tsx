import { sha256 } from 'js-sha256';
import { ChangeEvent, useState } from 'react';

import LoginPage from './LoginPage';
import ManagerPage from './ManagerPage';

type UserType = 'login' | 'basic' | 'manager' | 'admin' | 'failed';

export const DashboardPage = () => {
    const [userType, setUserType] = useState<UserType>('login');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const usernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value);
    };

    const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const verifyUser = async () => {
        try {
            const hashedPassword = sha256(password);
            const response = await fetch('http://localhost:8080/auth/verify', {
                method: 'GET',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${username}:${hashedPassword}`
                    )}`,
                },
            });

            const body = await response.text();

            setUserType(body as UserType);
        } catch (e) {
            setUserType('failed');
        }
    };

    const signOut = () => {
        setUserName('');
        setPassword('');
        setUserType('login');
    };

    switch (userType) {
        case 'login':
        case 'basic':
        case 'failed':
            return (
                <LoginPage
                    onUsernameChange={usernameChange}
                    onPasswordChange={passwordChange}
                    onVerifyUser={verifyUser}
                    error={
                        userType == 'basic'
                            ? 'Please, enter a valid username and password'
                            : userType == 'failed'
                            ? 'Failed to authenticate, please try again later'
                            : ''
                    }
                ></LoginPage>
            );
        case 'manager':
            return (
                <ManagerPage
                    username={username}
                    password={password}
                    onSignOut={signOut}
                />
            );
        case 'admin':
            return (
                <div className="dashboard__page">
                    ADMIN
                    <button onClick={signOut}>Sign Out</button>
                </div>
            );
    }
};
