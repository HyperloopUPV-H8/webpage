import { sha256 } from 'js-sha256';
import { ChangeEvent, useState } from 'react';

type UserType = 'login' | 'basic' | 'manager' | 'admin';

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
        const hashedPassword = sha256(password);
        console.log(username, hashedPassword);
        const response = await fetch('http://localhost:8080/auth/verify', {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(`${username}:${hashedPassword}`)}`,
            },
        });

        const body = await response.text();

        setUserType(body as UserType);
    };

    switch (userType) {
        case 'login':
            return (
                <div className="dashboard__login">
                    <input type="text" onChange={usernameChange}></input>
                    <input type="password" onChange={passwordChange}></input>
                    <button onClick={verifyUser}>Log-In</button>
                </div>
            );
        case 'basic':
            return <div className="dashboard__login">BASIC</div>;
        case 'manager':
            return <div className="dashboard__page">MANAGER</div>;
        case 'admin':
            return <div className="dashboard__page">ADMIN</div>;
    }
};
