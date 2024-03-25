import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';
import ReCAPTCHA from 'react-google-recaptcha';
// @ts-ignore
import Email from '../utils/smtp.js';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const emailParams = {
    toEmails: ['direction@hyperloopupv.com', 'partners@hyperloopupv.com'],
    fromEmail: 'webpage@hyperloopupv.com',
};

const initialState = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

export const ContactForm = () => {
    const [formState, setFormState] = useState<FormState>(initialState);
    const captchaRef = useRef<ReCAPTCHA>(null);

    const onChangeInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { name, subject, email, message } = formState;
        const { toEmails } = emailParams;

        const error = validateForm(formState);

        if (error) {
            toast.error(error);
            return;
        }

        if (!captchaRef.current?.getValue()) {
            toast.error('Por favor, valide el captcha.');
            return;
        }

        captchaRef.current?.reset();
        setFormState(initialState);

        toast.promise(
            Promise.any(
                toEmails.map((toEmail) => {
                    Email.send({
                        SecureToken: import.meta.env.VITE_SECURE_TOKEN_SMTP,
                        To: toEmail,
                        From: emailParams.fromEmail,
                        Subject: `[webpage] ${name} - ${subject}`,
                        Body: `<h3>[Correo]: ${email}</h3> <br> [Mensaje]: ${message}`,
                    });
                })
            ),
            {
                loading: 'Enviando mensaje...',
                success: 'Mensaje enviado',
                error: 'Error al enviar el mensaje. Inténtelo más tarde.',
            }
        );
    };

    return (
        <form className="form" onSubmit={onSubmitForm}>
            <div className="contact__name-email__container">
                <div className="form__input">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={onChangeInput}
                        value={formState.name}
                    />
                </div>
                <div className="form__input">
                    <label htmlFor="correo">Correo</label>
                    <input
                        type="text"
                        name="email"
                        id="correo"
                        onChange={onChangeInput}
                        value={formState.email}
                    />
                </div>
            </div>
            <div className="form__input">
                <label htmlFor="subject">Asunto</label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    onChange={onChangeInput}
                    value={formState.subject}
                />
            </div>
            <div className="form__input">
                <label htmlFor="message">Mensaje</label>
                <textarea
                    name="message"
                    id="message"
                    onChange={onChangeInput}
                    value={formState.message}
                ></textarea>
            </div>
            <div className="form__submit__container">
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                />

                <input
                    type="submit"
                    className="form__submit"
                    onChange={onChangeInput}
                />
            </div>
        </form>
    );
};

function validateForm(formState: FormState): string {
    const formValues = Object.values(formState);

    if (formValues.some((value) => value === '')) {
        return 'Por favor, rellene todos los campos.';
    }

    if (!isEmail(formState.email)) {
        return 'Por favor, introduzca un correo válido.';
    }

    return '';
}
