import landingVideo from '../../assets/backgrounds/landing-video.mp4';
import kenosRender from '../../assets/renders/kenos.png';
import kenosHover from '../../assets/renders/kenos-hover.png';
import atlasRender from '../../assets/renders/atlas.png';
import atlasHover from '../../assets/renders/atlas-hover.png';
import atlasTitle from '../../assets/corporative/atlas.svg';
import kenosTitle from '../../assets/corporative/kenos.svg';
import premiumNewImage from '../../assets/media/premium-new.jpeg';
import goldNewImage from '../../assets/media/gold-new.jpeg';
import silverNewImage from '../../assets/media/silver-new.jpeg';
import TitledTextBox from '../../components/TitledTextBox';
import TitleUnderlined from '../../components/TitleUnderlined';
import MediaNew from '../../components/MediaNew';
import style from './style.module.scss';
import { Trans, useTranslation } from 'react-i18next';

export default function LandingPage() {

    const { t } = useTranslation('landing');

    return (
        <div className={style['landing__page']}>
            <div
                className={`${style['landing__section']} ${style['section-1']}`}
            ></div>

            <section
                className={`${style['landing__section']} ${style['section-2']}`}
            >
                <div className={style['landing__titled-text-box-1']}>
                    <TitledTextBox
                        title={t('what-we-do')}
                        text={
                            <Trans
                                ns='landing'
                                i18nKey="what-we-do-text" 
                                components={{ br: <br /> }}
                            />
                        }
                        titleSize="5rem"
                        boxColor="white-transparent"
                        titleAlign="start"
                    />
                </div>
            </section>
            {/* .section_2 */}

            <section
                className={`${style['landing__section']} ${style['section-3']}`}
            >
                <div className={style['landing__titled-text-box-2']}>
                    <TitledTextBox
                        title={t('who-we-are')}
                        text={<>{t('who-we-are-text')}</>}
                        titleSize="5rem"
                        boxColor="white-transparent"
                        titleAlign="start"
                    />
                </div>
            </section>

            <section
                className={`${style['landing__section']} ${style['section-4']}`}
            >
                <video autoPlay loop muted playsInline>
                    <source src={landingVideo} type="video/mp4" />
                </video>
                <h3 className={style['what-is-hyperloop__title']}>
                    {t('what-is-hyperloop')}
                </h3>
                <div className={style['what-is-hyperloop__text']}>
                    <p>
                        {t('what-is-hyperloop-text')}
                    </p>
                </div>
            </section>

            <section
                className={`${style['landing__section']} ${style['section-5']}`}
            >
                <TitleUnderlined text={t("last-prototype")} color="white" />
            </section>

            <section
                className={`${style['landing__section']} ${style['section-6']}`}
            >
                <div id={style['gaussian-blur__1']}></div>
                <div className={style['kenos__container']}>
                    <div className={style['prototype__text__container']}>
                        <div className={style['prototype__text__content']}>
                            <div className={style['prototype__text__title']}>
                                <img src={kenosTitle} alt="Kenos Title" />
                            </div>
                            <div className={style['prototype__text__text']}>
                                <p>
                                    {t('kenos-text')}
                                </p>
                                {/* kenos__text */}
                            </div>
                        </div>
                    </div>
                    <div className={style['kenos__render__container']}>
                        <div
                            className={`${style['kenos__render__content']} ${style['img-normal']}`}
                        >
                            <img src={kenosRender} alt="Kénos Vehicle" />
                        </div>
                        {/* kenos__render */}
                        <div
                            className={`${style['kenos__render__content']} ${style['img-hover']}`}
                        >
                            <img src={kenosHover} alt="Kénos Vehicle" />
                        </div>
                    </div>
                </div>
                <div
                    className={`${style['prototype__footnote']} ${style['footer__kenos']}`}
                >
                    <p>
                        {t('kenos-footnote')}
                    </p>
                </div>
            </section>
            {/* kenos */}

            <section
                className={`${style['landing__section']} ${style['section-7']}`}
            >
                <div id={style['gaussian-blur__2']}></div>
                <div className={style['atlas__container']}>
                    <div className={style['prototype__text__container']}>
                        <div className={style['prototype__text__content']}>
                            <div className={style['prototype__text__title']}>
                                <img src={atlasTitle} alt="Atlas Title" />
                            </div>
                            <div className={style['prototype__text__text']}>
                                <p>
                                    {t('atlas-text')}
                                </p>
                            </div>
                            {/* atlas__text */}
                        </div>
                    </div>
                    <div className={style['atlas__render__container']}>
                        <div
                            className={`${style['atlas__render__content']} ${style['img-normal']}`}
                        >
                            <img src={atlasRender} alt="Atlas Tube" />
                        </div>
                        {/* atlas__render */}
                        <div
                            className={`${style['atlas__render__content']} ${style['img-hover']}`}
                        >
                            <img src={atlasHover} alt="Atlas Tube" />
                        </div>
                    </div>
                </div>
                <div className={style['prototype__footnote']}>
                    <p>
                        {t('atlas-footnote')}
                    </p>
                </div>
            </section>
            {/* atlas */}

            <section
                className={`${style['landing__section']} ${style['section-8']}`}
            >
                <TitleUnderlined text={t('last-news')} color="black" />

                <div className={style['news__container']}>
                    <MediaNew
                        image={premiumNewImage}
                        category="premium"
                        url={
                            'https://www.upv.es/noticias-upv/noticia-14191-hyperloop-2023-es.html'
                        }
                    />

                    <MediaNew
                        image={goldNewImage}
                        category="gold"
                        url="https://www.mudinmar.com/es/noticias/mudinmar-participa-european-hyperloop-week/"
                    />

                    <MediaNew
                        image={silverNewImage}
                        category="silver"
                        url="https://www.linkedin.com/posts/power-electronics_movilidad-sostenible-inversi%C3%B3n-activity-7072859290838941696-gPnn/?originalSubdomain=pe"
                    />
                </div>
                {/* news section */}
            </section>
        </div>
    );
}
