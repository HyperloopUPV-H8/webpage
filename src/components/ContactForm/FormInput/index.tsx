import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import style from './style.module.scss';

type Props = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    id: string;
    label: string;
};

export default function FormInput({ label, ...inputProps }: Props) {
    return (
        <div className={style.input}>
            <label htmlFor={inputProps.id}>{label}</label>
            <input {...inputProps} />
        </div>
    );
}
