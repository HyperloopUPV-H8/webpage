import { InputHTMLAttributes, ReactNode } from 'react';
import style from './style.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    before?: ReactNode;
    after?: ReactNode;
};

export default function FormInput({
    label,
    before,
    after,
    ...inputProps
}: Props) {
    return (
        <fieldset className={style.input}>
            <legend>{label}</legend>
            {before}
            <input {...inputProps} />
            {after}
        </fieldset>
    );
}
