import { ReactNode } from "react";

type borderStyle = "blue" | "orange" | "multicolor"
const styleToClass: Record<borderStyle, string> = {
  "blue": " blue-border",
  "orange": " orange-border",
  "multicolor": " multicolor-border",
}

interface TitledTextBoxProps {
  title: string,
  imageURL: string,
  imageClassName?: string,
  borderColor?: borderStyle,
  imageStyle?: React.CSSProperties,
  children?: ReactNode,
}



export const TitledImageBox: React.FC<TitledTextBoxProps> = ({ title, imageURL, imageClassName = "", imageStyle, borderColor = "orange", children }) => {
  return (
    <div className="titled-image-box">
      <h2 className="titled-image-box__title">
        {title}
      </h2>
      <div className={"titled-image-box__image" + styleToClass[borderColor] + " " + imageClassName} style={imageStyle}>
        <img src={imageURL}></img>
      </div>
      {children}
    </div>
  )
}