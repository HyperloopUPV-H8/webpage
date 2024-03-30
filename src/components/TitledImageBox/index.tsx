import { ReactNode } from 'react';
import style from './style.module.scss';

type borderStyle = 'blue' | 'orange' | 'multicolor';
const styleToClass: Record<borderStyle, string> = {
    blue: 'blue_border',
    orange: 'orange_border',
    multicolor: 'multicolor_border',
};

interface TitledTextBoxProps {
    title: string;
    imageURL: string;
    imageClassName?: string;
    borderColor?: borderStyle;
    imageStyle?: React.CSSProperties;
    children?: ReactNode;
}

export default function TitledImageBox({
    title,
    imageURL,
    imageStyle,
    imageClassName,
    borderColor = 'orange',
    children,
}: TitledTextBoxProps) {
    return (
        <div className={style.titled_image_box}>
            <h2 className={style.title}>{title}</h2>
            <div
                className={`${style.image} ${
                    style[styleToClass[borderColor]]
                } ${imageClassName}`}
                style={imageStyle}
            >
                <img src={imageURL}></img>
            </div>
            {children}
        </div>
    );
}
