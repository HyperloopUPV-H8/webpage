import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import style from './style.module.scss';

type Props = DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    id: string;
    label: string;
};

export default function FormTextArea({ label, ...inputProps }: Props) {
    return (
        <div className={style.input}>
            <label htmlFor={inputProps.id}>{label}</label>
            <textarea {...inputProps} />
        </div>
    );
}
