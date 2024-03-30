import { sha256 } from 'js-sha256';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLogo from '../assets/corporative/navbar-logo.svg';
import { PartnerEdit } from '../components/PartnerEdit';
import SideBar from '../components/SideBar';
import { MemberEdit } from '../components/MemberEdit';

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
        const response = await fetch('http://localhost:8080/auth/verify', {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(`${username}:${hashedPassword}`)}`,
            },
        });

        const body = await response.text();

        setUserType(body as UserType);
    };

    const signOut = () => {
        setUserName('');
        setPassword('');
        setUserType('login');
    };

    switch (userType) {
        case 'login':
        case 'basic':
            return (
                <div className="dashboard__login">
                    <form onSubmit={(ev) => ev.preventDefault()}>
                        <input type="text" onChange={usernameChange}></input>
                        <input
                            type="password"
                            onChange={passwordChange}
                        ></input>
                        <button onClick={verifyUser}>Log-In</button>
                    </form>
                    {userType == 'basic' ? (
                        <div>Invalid username or password, try again</div>
                    ) : (
                        <></>
                    )}
                </div>
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

type UserProps = {
    username: string;
    password: string;
    onSignOut: () => void;
};

type ManagerProps = UserProps;

const ManagerPage = (props: ManagerProps) => {
    return (
        <div className="dashboard__page">
            <div className="dashboard__navigation">
                <div className="navbar__logo">
                    <Link to={'/'}>
                        <img src={NavbarLogo} alt="Hyperloop Logo" />
                    </Link>
                </div>
                <button onClick={props.onSignOut}>Sign Out</button>
            </div>
            <SideBar
                tabs={[
                    {
                        name: 'members',
                        icon: 'm',
                        content: <MemberEdit />,
                    },
                    {
                        name: 'partners',
                        icon: 'p',
                        content: <PartnerEdit />,
                    },
                ]}
            />
        </div>
    );
};
