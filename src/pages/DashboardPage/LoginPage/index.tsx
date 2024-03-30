import { ChangeEvent, MouseEvent } from 'react';
import style from './style.module.scss';
import FormInput from '../../../components/ContactForm/FormInput';

type Props = {
    onUsernameChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    onVerifyUser: (ev: MouseEvent<HTMLButtonElement>) => void;
    error: string;
};

export default function LoginPage(props: Props) {
    return (
        <div className={style.login}>
            <form className={style.form} onSubmit={(ev) => ev.preventDefault()}>
                <FormInput
                    label="Usuario"
                    id="login-user"
                    name="user"
                    type="text"
                    onChange={props.onUsernameChange}
                />
                <FormInput
                    label="Contraseña"
                    id="login-password"
                    name="password"
                    type="password"
                    onChange={props.onPasswordChange}
                />

                <button onClick={props.onVerifyUser}>Log-In</button>
            </form>
            <p className={style.error}>{props.error}</p>
        </div>
    );
}
