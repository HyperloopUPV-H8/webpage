import { ReactElement } from "react";

interface TitledTextBoxProps {
    title: string;
    text: ReactElement<any, any>;
    titleSize?: string;
    titleAlign?: "start" | "center" | "end";
    boxColor?: "white" | "white-transparent" | "black" | "black-transparent" | "transparent";
    textColor?: "white" | "black";
}

export const TitledTextBox: React.FC<TitledTextBoxProps> = ({ title, text,  titleSize = "1.8rem", titleAlign = "start", textColor = "black", boxColor = "white" }) => {

  let backgroundColor;
  // Switch to set the background, specially for the transparent boxes
  switch (boxColor) {
    case "white-transparent":
      backgroundColor = "rgba(255, 255, 255, 0.7)"
      break;
    case "black-transparent":
      backgroundColor = "rgba(0, 0, 0, 0.7)"
      break;
    default:
      backgroundColor = boxColor;
      break;
  }

  return (
    <div className="titled-text-box">
        <h2 className="titled-text-box__title"
        style={{
          fontSize: titleSize,
          textAlign: titleAlign
        }}>{title}</h2>
        <div className="titled-text-box__box"
        style={{
          backgroundColor: backgroundColor
        }}
        >
            <p className="titled-text-box__text"
            style={{
              color: textColor
            }}>{text}</p>
        </div>
    </div>
  )
}
