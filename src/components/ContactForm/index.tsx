import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';
import ReCAPTCHA from 'react-google-recaptcha';
import style from './style.module.scss';
import send_email from '../../utils/smtp.ts';

// const emailParams = {
//     toEmails: ['direction@hyperloopupv.com', 'partners@hyperloopupv.com'],
//     fromEmail: 'webpage@hyperloopupv.com',
// };

type Props = {
    to: string | string[];
    from: string;
    defaults?: FormState;
};

type FormState = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const defaultState = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

export default function ContactForm(props: Props) {
    let defaults = defaultState;
    if (props.defaults) {
        defaults = props.defaults;
    }

    const [formState, setFormState] = useState<FormState>(defaults);
    const captchaRef = useRef<ReCAPTCHA>(null);

    const onInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmitForm = async (
        event: React.SyntheticEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const validForm = validateForm();

        if (validForm.state == 'bad') {
            switch (validForm.reason) {
                case 'missing-value':
                    toast.error('Por favor, rellene todos los campos.');
                    return;
                case 'bad-email':
                    toast.error('Por favor, introduzca un correo válido.');
                    return;
            }
        }

        const isValidCaptcha = await validateCaptcha();
        if (!isValidCaptcha) {
            toast.error('Por favor, valide el Captcha.');
            return;
        }

        const { name, email, subject, message } = formState;
        send_email_with_progress(
            props.from,
            props.to,
            name,
            email,
            subject,
            message
        );

        resetForm();
    };

    function validateForm(): FormValidation {
        const formValues = Object.values(formState);

        if (formValues.some((value) => value === '')) {
            return {
                state: 'bad',
                reason: 'missing-value',
            };
        }

        if (!isEmail(formState.email)) {
            return {
                state: 'bad',
                reason: 'bad-email',
            };
        }

        return {
            state: 'ok',
        };
    }

    const validateCaptcha = async (): Promise<boolean> => {
        if (!captchaRef.current) {
            return false;
        }

        const value = captchaRef.current.getValue();
        if (!value) {
            return false;
        }

        const response = await fetch(
            'https://www.google.com/recaptcha/api/siteverify?' +
                new URLSearchParams({
                    secret: import.meta.env.VITE_RECAPTCHA_KEY,
                    response: value,
                }),
            {
                method: 'POST',
            }
        );

        const body = await response.json();

        return body.success;
    };

    const resetForm = () => {
        setFormState(defaults);
        if (captchaRef.current) {
            captchaRef.current.reset();
        }
    };

    return (
        <form className={style.form} onSubmit={onSubmitForm}>
            <div className={style.row}>
                <div className={style.input}>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={onInputChange}
                        value={formState.name}
                    />
                </div>
                <div className={style.input}>
                    <label htmlFor="correo">Correo</label>
                    <input
                        type="text"
                        name="email"
                        id="correo"
                        onChange={onInputChange}
                        value={formState.email}
                    />
                </div>
            </div>
            <div className={style.input}>
                <label htmlFor="subject">Asunto</label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    onChange={onInputChange}
                    value={formState.subject}
                />
            </div>
            <div className={style.input}>
                <label htmlFor="message">Mensaje</label>
                <textarea
                    name="message"
                    id="message"
                    onChange={onInputChange}
                    value={formState.message}
                ></textarea>
            </div>
            <div className={style.submit}>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                />

                <input
                    type="submit"
                    className="form__submit"
                    onChange={onInputChange}
                />
            </div>
        </form>
    );
}

function send_email_with_progress(
    from: string,
    to: string | string[],
    name: string,
    email: string,
    subject: string,
    message: string
) {
    toast.promise(
        send_email({
            SecureToken: import.meta.env.VITE_SECURE_TOKEN_SMTP,
            From: from,
            To: to,
            Subject: `[webpage] ${name} - ${subject}`,
            Body: `<h3>[Correo]: ${email}</h3> <br> [Mensaje]: ${message}`,
        }),
        {
            loading: 'Enviando mensaje...',
            success: 'Mensaje enviado!',
            error: 'Error al enviar el mensaje. Inténtelo más tarde.',
        }
    );
}

type FormValidation = FormValidationOk | FormValidationBad;

type FormValidationOk = {
    state: 'ok';
};

type FormValidationBad = {
    state: 'bad';
    reason: 'missing-value' | 'bad-email';
};
