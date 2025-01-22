import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';
import ReCAPTCHA from 'react-google-recaptcha';
import style from './style.module.scss';
import send_email from '../../utils/smtp.ts';
import FormInput from './FormInput/index.tsx';
import FormTextArea from './FormTextArea/index.tsx';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

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
                    toast.error(t('required'));
                    return;
                case 'bad-email':
                    toast.error(t('email-invalid'));
                    return;
            }
        }

        const isValidCaptcha = await validateCaptcha();
        if (!isValidCaptcha) {
            toast.error(t('captcha-required'));
            return;
        }

        const { name, email, subject, message } = formState;
        send_email_with_progress(
            props.from,
            props.to,
            name,
            email,
            subject,
            message,
            t
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

    const { t } = useTranslation('contact');

    return (
        <form className={style.form} onSubmit={onSubmitForm}>
            <div className={style.row}>
                <FormInput
                    label={t('name')}
                    id="contact-name"
                    name="name"
                    type="text"
                    onChange={onInputChange}
                    value={formState.name}
                />
                <FormInput
                    label={t('email')}
                    id="contact-email"
                    name="email"
                    type="text"
                    onChange={onInputChange}
                    value={formState.email}
                />
            </div>
            <FormInput
                label={t('subject')}
                id="contact-subject"
                name="subject"
                type="text"
                onChange={onInputChange}
                value={formState.subject}
            />
            <FormTextArea
                label={t('message')}
                id="contact-message"
                name="message"
                onChange={onInputChange}
                value={formState.message}
            />
            <div className={style.submit}>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                />

                <input
                    value={t('send')}
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
    message: string,
    t: TFunction
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
            loading: t('loading'),
            success: t('success'),
            error: t('error'),
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
