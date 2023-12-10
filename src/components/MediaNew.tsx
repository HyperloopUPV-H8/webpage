import arrow from "../assets/icons/arrow.svg"

interface Props {
    image: string,
    category: "premium" | "gold" | "silver",
    url: string,
}

export const MediaNew = ({ image, category, url }: Props) => {

  return (
    <div className="new__container">
        <div className="new__title">
            <p>Noticias {category.toUpperCase()}</p>
        </div>

        <a href={url} target="_blank">
            <div className={`new__image ${category}`} style={{backgroundImage: `url(${image})`}}></div>
        </a>

        <div className="new__footer">
            <a href={url} target="_blank">
                <div className="new__footer__container">
                    <p>Leer Más</p>
                    <img src={arrow} alt="Arrow right" />
                </div>
            </a>
        </div>
    </div>
  )
}
