import plusCircleOutline from "../assets/icons/pluscircleoutline.svg"
import awardTrophyOutline from "../assets/icons/awardtrophyoutline.svg"
import hyperloopPodCompetition from "../assets/corporative/hyperloop-pod-competition.svg"
import europeanHyperloopWeek from "../assets/corporative/european-hyperloop-week.svg"
import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"

interface Props {
    generation: string,
    inityear: string,
    endyear: string,
    title: string,
    banner: string,
    color: string,
    extraImages: string[],
    description: string,
    competition: "HyperloopPodCompetition" | "EuropeanHyperloopWeek",
    awards: string[]
}

const ANIMATION_DURATION = 400;
const SAFE_DELAY = ANIMATION_DURATION * 2;

export const TimelineGeneration = ({generation, inityear, endyear, title, banner, color, extraImages, description, competition, awards}: Props) => {

    const competitionImage = competition === "HyperloopPodCompetition" ? hyperloopPodCompetition : europeanHyperloopWeek;
    const [open, setOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const [extraImagesSprings, extraImagesSpringsApi] = useSpring(() => ({
        from: {
            display: "none",
            height: "0",
            opacity: 0,
            transform: "translateY(2rem)",
        },
        config: { duration: ANIMATION_DURATION }
    }));

    const [contentSprings, contentSpringsApi] = useSpring(() => ({
        from: {
            display: "none",
            width: "0",
            height: "0",
            opacity: 0,
            transform: "translateX(5rem)",
        },
        config: { duration: ANIMATION_DURATION }
    }));

    const onToggleContent = () => {
        if(isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), SAFE_DELAY);
        setOpen(!open);
    };

    // This effect will be triggered when the user clicks on the title of the generation,
    // and will animate the opening and closing of the content.
    useEffect(() => {
      if(open) {
          extraImagesSpringsApi.start({
              display: "flex",
              height: "100%",
              onRest: () => extraImagesSpringsApi.start({
                  opacity: 1,
                  transform: "translateY(0rem)",
              })
          })
          contentSpringsApi.start({
              display: "flex",
              width: "100%",
              onRest: () => contentSpringsApi.start({
                      height: "100%",
                      opacity: 1,
                      transform: "translateX(0rem)",
              }),
          });
      } else {
          extraImagesSpringsApi.start({
              opacity: 0,
              transform: "translateY(2rem)",
              onRest: () => extraImagesSpringsApi.start({
                  display: "none",
              })
          })
          contentSpringsApi.start({
              opacity: 0,
              height: "0",
              transform: "translateX(5rem)",
              onRest: () => contentSpringsApi.start({
                      width: "0",
                      onRest: () => contentSpringsApi.start({
                          display: "none",
                          immediate: true,
                      }),
              })
          });
      }
    }, [open]);

    return (
      <section className="timeline__section">
        <div className="timeline__generation">
          <div className="timeline__generation__header">
              <div className="timeline__generation__header__gaussian-blur" style={{backgroundColor: `${color}`}}></div>
            <div className="timeline__generation__header__content">
              <div className="timeline__generation__header__date">
                  {generation}<span> {`${inityear} - ${endyear}`}</span>
              </div>
              <div className="timeline__generation__header__title" onClick={onToggleContent}>
                {title}
                <img src={plusCircleOutline} alt="Show more icon"/>
              </div>
            </div>
          </div>

          <div className="timeline__generation__container">
            <div className="timeline__generation__banner" onClick={onToggleContent}>
              <div className="timeline__generation__banner__main-img__container">
                <div className="timeline__generation__banner__main-img__gaussian-blur" style={{backgroundColor: `${color}`}}></div>
                <div className="timeline__generation__banner__main-img__content">
                  <img src={banner} alt={`Banner ${generation}`} />
                </div>
              </div>
              <animated.div className="timeline__generation__banner__extra-images" style={{...extraImagesSprings}}>
                {extraImages.map((image, index) => {
                    return (
                        <div className="timeline__generation__banner__extra-images__img" key={index}>
                            <img src={image} alt={`Extra ${generation} ${index}`} />
                        </div>
                    )
                })}
              </animated.div>
            </div>

            <animated.div className="timeline__generation__content" style={{...contentSprings}}>
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

                  {awards.map((award, index) => {
                      return (
                          <li className="timeline__generation__content__awards__award-item" key={index}>
                              <div className="timeline__generation__content__awards__award-icon">
                                  <img src={awardTrophyOutline} alt="Award trophy icon" />
                              </div>
                              <p>{award}</p>
                          </li>
                      )
                  }) }

                </ul>
              </div>
            </animated.div>
          </div>
        </div>
      </section>
    );
};
