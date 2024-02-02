import plusCircleOutline from "../assets/icons/pluscircleoutline.svg"
import awardTrophyOutline from "../assets/icons/awardtrophyoutline.svg"
import hyperloopPodCompetition from "../assets/corporative/hyperloop-pod-competition.svg"
import europeanHyperloopWeek from "../assets/corporative/european-hyperloop-week.svg"

interface Props {
    generation: string,
    inityear: string,
    endyear: string,
    title: string,
    banner: string,
    description: string,
    competition: "HyperloopPodCompetition" | "EuropeanHyperloopWeek",
    awards: string[]
}

export const TimelineGeneration = ({generation="H?", inityear, endyear, title, banner, description, competition, awards}: Props) => {

    const competitionImage = competition === "HyperloopPodCompetition" ? hyperloopPodCompetition : europeanHyperloopWeek;

  return (
    <section className="timeline__section">
      <div className="timeline__generation">
        <div className="timeline__generation__header">
          <div className="timeline__generation__header__gaussian-blur"></div>
          <div className="timeline__generation__header__content">
            <div className="timeline__generation__header__date">
                {generation}<span> {`${inityear} - ${endyear}`}</span>
            </div>
            <div className="timeline__generation__header__title">
              {title}
              <img src={plusCircleOutline} alt="Show more icon" />
            </div>
          </div>
        </div>

        <div className="timeline__generation__container">
          <div className="timeline__generation__banner">
            <div className="timeline__generation__banner__main-img">
              <img src={banner} alt="" />
            </div>
          </div>

          <div className="timeline__generation__content">
            <div className="timeline__generation__content__description">
              <p>{description}</p>
            </div>
            <div className="timeline__generation__content__awards">
              <div className="timeline__generation__content__awards__competition-logo">
                <img
                  src={competitionImage}
                  alt={competition === "HyperloopPodCompetition" ? "Hyperloop Pod Competition logo" : "European Hyperloop Week logo"}
                />
              </div>
              <ul className="timeline__generation__content__awards__awards-list">
                
                {awards.map((award) => {
                    return (
                        <li className="timeline__generation__content__awards__award-item">
                            <div className="timeline__generation__content__awards__award-icon">
                                <img src={awardTrophyOutline} alt="Award trophy icon" />
                            </div>
                            <p>{award}</p>
                        </li>
                    )
                }) }

              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
