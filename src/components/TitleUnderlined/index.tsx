import style from './style.module.scss';

interface Props {
    text: string;
    color: 'white' | 'black';
}

export default function TitleUnderlined({ text, color }: Props) {
    return (
        <div className={style.title_underlined}>
            <h3 className={style.title} style={{ color: color }}>
                {text}
            </h3>
            <div
                className={style.line}
                style={{ backgroundColor: color }}
            ></div>
        </div>
    );
}
