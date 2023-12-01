interface TitledTextBoxProps {
    title: string;
    text: string;
}

export const TitledTextBox: React.FC<TitledTextBoxProps> = ({ title, text }) => {
  return (
    <div className="titled-text-box">
        <h2 className="titled-text-box__title">{title}</h2>
        <div className="titled-text-box__box">
            <p className="titled-text-box__text">{text}</p>
        </div>
    </div>
  )
}
