
interface Props {
    text: string,
    color: "white" | "black"
}

export const TitleUnderlined = ( { text, color } : Props ) => {
  return (

    <div className="title-underlined">
          <h3 className="title-underlined__title" style={{color: color}}>{text}</h3>
          <div className="title-underlined__line" style={{backgroundColor: color}}></div>
    </div>

  )
}
