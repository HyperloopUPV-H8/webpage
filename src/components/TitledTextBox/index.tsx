import { ReactElement } from 'react';
import style from './style.module.scss';

interface TitledTextBoxProps {
    title: string;
    text: ReactElement<any, any>;
    titleSize?: string;
    titleAlign?: 'start' | 'center' | 'end';
    boxColor?:
        | 'white'
        | 'white-transparent'
        | 'black'
        | 'black-transparent'
        | 'transparent';
    textColor?: 'white' | 'black';
}

export default function TitledTextBox({
    title,
    text,
    titleSize = '1.8rem',
    titleAlign = 'start',
    textColor = 'black',
    boxColor = 'white',
}: TitledTextBoxProps) {
    let backgroundColor;
    // Switch to set the background, specially for the transparent boxes
    switch (boxColor) {
        case 'white-transparent':
            backgroundColor = 'rgba(255, 255, 255, 0.7)';
            break;
        case 'black-transparent':
            backgroundColor = 'rgba(0, 0, 0, 0.7)';
            break;
        default:
            backgroundColor = boxColor;
            break;
    }

    return (
        <div className={style.titled_text_box}>
            <h2
                className={style.title}
                style={{
                    fontSize: titleSize,
                    textAlign: titleAlign,
                }}
            >
                {title}
            </h2>
            <div
                className={style.box}
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                <p
                    className={style.text}
                    style={{
                        color: textColor,
                    }}
                >
                    {text}
                </p>
            </div>
        </div>
    );
}
