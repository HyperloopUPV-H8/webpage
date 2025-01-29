import aboutVideo from '../../assets/backgrounds/about-video.mp4';
import compromiso from '../../assets/icons/compromiso.svg';
import innovacion from '../../assets/icons/innovacion.svg';
import aprendizaje from '../../assets/icons/aprendizaje.svg';
import sostenibilidad from '../../assets/icons/sostenibilidad.svg';
import mission from '../../assets/media/mission.png';
import vision from '../../assets/media/vision.png';
import values from '../../assets/media/values.png';
import ehw from '../../assets/media/ehw.png';
import ehwBanner from '../../assets/media/banner.png';
import podCompetitionLeft from '../../assets/media/pod-competition-1.png';
import podCompetitionRight from '../../assets/media/pod-competition-2.png';
import arrowCircleDownOutline from '../../assets/icons/arrowcircledownoutline.svg';
import { useRef } from 'react';
import TitledImageBox from '../../components/TitledImageBox';
import TitleUnderlined from '../../components/TitleUnderlined';
import style from './style.module.scss';
import { Trans, useTranslation } from 'react-i18next';

export default function AboutPage() {
    const divScrollDestination = useRef<HTMLDivElement>(null);

    const onScrollDown = () => {
        divScrollDestination.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const { t, i18n } = useTranslation('about');

    return (
        <>
            <div className={`${style['about__section']} ${style['section-1']}`}>
                <video autoPlay loop muted playsInline>
                    <source src={aboutVideo} type="video/mp4" />
                </video>
                <h1 className={style['about__page__title']}>{t('about')}</h1>
                <div className={style['about__page__scroll-down-button']}>
                    <img
                        src={arrowCircleDownOutline}
                        alt="Scroll down button"
                        onClick={onScrollDown}
                    />
                </div>
            </div>

            <div
                className={style['about__section__shadow']}
                ref={divScrollDestination}
            >
                <section
                    className={`${style['about__section']} ${style['section-2']}`}
                >
                    <div className={style['about__mission-vision']}>
                        <div className={style['about__mission']}>
                            <TitledImageBox
                                title={t('mission')}
                                imageClassName={
                                    style['about__image__box__mission']
                                }
                                imageURL={mission}
                                borderColor="orange"
                            >
                                <p className={style['about__mission__text']}>
                                    {t('mission-text')}
                                </p>
                            </TitledImageBox>
                        </div>
                        <div id="about__vision">
                            <TitledImageBox
                                title={t('vision')}
                                imageClassName={
                                    style['about__image__box__vision']
                                }
                                imageURL={vision}
                                borderColor="blue"
                            >
                                <p className={style['about__vision__text']}>
                                    {t('vision-text')}
                                </p>
                            </TitledImageBox>{' '}
                            {/* Vision */}
                        </div>
                    </div>

                    <div id="about__values">
                        <TitledImageBox
                            title={t('values')}
                            imageClassName={style['about__image__box__values']}
                            imageURL={values}
                            borderColor="multicolor"
                        >
                            <div className={style['about__values__content']}>
                                <div className={style['about__values__item']}>
                                    <h3>
                                        <img src={compromiso} /> {t('values-commitment')}
                                    </h3>
                                    <p className={style['about__values__text']}>
                                        {t('values-commitment-text')}
                                    </p>
                                </div>

                                <div className={style['about__values__item']}>
                                    <h3>
                                        <img src={innovacion} /> {t('values-innovation')}
                                    </h3>
                                    <p className={style['about__values__text']}>
                                        {t('values-innovation-text')}
                                    </p>
                                </div>

                                <div className={style['about__values__item']}>
                                    <h3>
                                        <img src={aprendizaje} /> {t('values-learning')}
                                    </h3>
                                    <p className={style['about__values__text']}>
                                        {t('values-learning-text')}
                                    </p>
                                </div>

                                <div className={style['about__values__item']}>
                                    <h3>
                                        <img src={sostenibilidad} />{' '}
                                        {t('values-sustainability')}
                                    </h3>
                                    <p className={style['about__values__text']}>
                                        {t('values-sustainability-text')}
                                    </p>
                                </div>
                            </div>
                        </TitledImageBox>{' '}
                        {/* Valores */}
                    </div>
                </section>
            </div>
            {/* about__section__shadow */}

            <section
                className={`${style['about__section']} ${style['section-3']}`}
            >
                <TitleUnderlined text="European Hyperloop Week" color="white" />
                <div className={style['about__ehw']}>
                    <div>
                        <div className={style['about__ehw__description']}>
                            <p>
                                <Trans
                                    i18nKey="ehw-text" 
                                    i18n={i18n}
                                    ns='about'
                                />
                            </p>
                        </div>

                        <div className={style['about__ehw__image-1']}>
                            <img src={ehw} />
                        </div>
                    </div>

                    <div>
                        <div className={style['about__ehw__image-2']}>
                            <img src={ehwBanner} />
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={`${style['about__section']} ${style['section-4']}`}
            >
                <TitleUnderlined text="Hyperloop Competition" color="white" />
                <div className={style['about__hyperloop__competition']}>
                    <p className={style['about__hyperloop__competition__text']}>
                        {t('hyperloop-pod-competition-1')}
                    </p>
                    <p className={style['about__hyperloop__competition__text']}>
                        {t('hyperloop-pod-competition-2')}
                    </p>
                    <div
                        className={
                            style['about__hyperloop__competition__image-1']
                        }
                    >
                        <img src={podCompetitionLeft} />
                    </div>
                    <div
                        className={
                            style['about__hyperloop__competition__image-2']
                        }
                    >
                        <img src={podCompetitionRight} />
                    </div>
                </div>
            </section>
        </>
    );
}
