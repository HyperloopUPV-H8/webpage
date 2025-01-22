import timelineVideo from '../../assets/backgrounds/timeline-video.mp4';
import h1_banner from '../../assets/renders/timeline-h1-banner.jpeg';
import h2_banner from '../../assets/renders/timeline-h2-banner.jpeg';
import h3_banner from '../../assets/renders/timeline-h3-banner.jpeg';
import h4and5_banner from '../../assets/renders/timeline-h4and5-banner.jpeg';
import h6_banner from '../../assets/renders/timeline-h6-banner.jpeg';
import h7_banner from '../../assets/renders/timeline-h7-banner.jpeg';
import h8_banner from '../../assets/renders/timeline-h8-banner.jpeg';
import h9_banner from '../../assets/renders/timeline-h9-banner.jpeg';
import h1_extra_1 from '../../assets/media/timeline-h1-extra-1.jpeg';
import h1_extra_2 from '../../assets/media/timeline-h1-extra-2.jpeg';
import h2_extra_1 from '../../assets/media/timeline-h2-extra-1.jpeg';
import h2_extra_2 from '../../assets/media/timeline-h2-extra-2.jpeg';
import h3_extra_1 from '../../assets/media/timeline-h3-extra-1.jpeg';
import h3_extra_2 from '../../assets/media/timeline-h3-extra-2.jpeg';
import h4and5_extra_1 from '../../assets/media/timeline-h4and5-extra-1.jpeg';
import h4and5_extra_2 from '../../assets/media/timeline-h4and5-extra-2.jpeg';
import h4and5_extra_3 from '../../assets/media/timeline-h4and5-extra-3.jpeg';
import h6_extra_1 from '../../assets/media/timeline-h6-extra-1.jpeg';
import h6_extra_2 from '../../assets/media/timeline-h6-extra-2.jpeg';
import h7_extra_1 from '../../assets/media/timeline-h7-extra-1.jpeg';
import h7_extra_2 from '../../assets/media/timeline-h7-extra-2.jpeg';
import h8_extra_1 from '../../assets/media/timeline-h8-extra-1.jpeg';
import h8_extra_2 from '../../assets/media/timeline-h8-extra-2.jpeg';
import h9_extra_1 from '../../assets/media/timeline-h9-extra-1.jpeg';
import h9_extra_2 from '../../assets/media/timeline-h9-extra-2.jpeg';
import medal from '../../assets/icons/medal.svg';
import arrowCircleDownOutline from '../../assets/icons/arrowcircledownoutline.svg';
import { useRef } from 'react';
import TimelineGeneration from '../../components/TimelineGeneration';
import style from './style.module.scss';
import { useTranslation } from 'react-i18next';

export default function TimelinePage() {
    const divScrollDestination = useRef<HTMLDivElement>(null);

    const onScrollDown = () => {
        divScrollDestination.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const { t } = useTranslation('timeline');

    return (
        <div className={style['timeline__page']}>
            <div
                className={`${style['timeline__section']} ${style['section-1']}`}
            >
                <video autoPlay loop muted playsInline>
                    <source src={timelineVideo} type="video/mp4" />
                </video>
                <h1 className={style['timeline__page__title']}>{t('timeline')}</h1>
                <div className={style['timeline__page__scroll-down-button']}>
                    <img
                        src={arrowCircleDownOutline}
                        alt="Scroll down button"
                        onClick={onScrollDown}
                    />
                </div>
            </div>

            <div
                className={style['timeline__container']}
                ref={divScrollDestination}
            >
                <div id={style['timeline-line']}></div>
                <div className={style['timeline__content']}>
                    <h2 className={style['timeline__title']}>Timeline</h2>
                    <TimelineGeneration
                        generation="H1"
                        inityear="2015"
                        endyear="2016"
                        title="THE FUTURE CONCEPT"
                        banner={h1_banner}
                        color={'#C1531B'}
                        extraImages={[h1_extra_1, h1_extra_2]}
                        description={t('the-future-concept-text')}
                        competition="HyperloopPodCompetition"
                        awards={[
                            t('the-future-concept-award-1'),
                            t('the-future-concept-award-2'),
                        ]}
                    />

                    <TimelineGeneration
                        generation="H2"
                        inityear="2016"
                        endyear="2017"
                        title="ATLANTIC II"
                        banner={h2_banner}
                        color={'#2486A4'}
                        extraImages={[h2_extra_1, h2_extra_2]}
                        description={t('atlantic-text')}
                        competition="HyperloopPodCompetition"
                        awards={[
                            t('atlantic-award-1'),
                            t('atlantic-award-2'),
                        ]}
                    />

                    <TimelineGeneration
                        generation="H3"
                        inityear="2017"
                        endyear="2018"
                        title="VALENTIA"
                        banner={h3_banner}
                        color={'#C1531B'}
                        extraImages={[h3_extra_1, h3_extra_2]}
                        description={t('valentia-text')}
                        competition="HyperloopPodCompetition"
                        awards={[t('valentia-award-1')]}
                    />

                    <TimelineGeneration
                        generation="H4 & 5"
                        inityear="2018"
                        endyear="2020"
                        title="TURIAN"
                        banner={h4and5_banner}
                        color={'#2486A4'}
                        extraImages={[
                            h4and5_extra_1,
                            h4and5_extra_2,
                            h4and5_extra_3,
                        ]}
                        description={t('turian-text')}
                        competition="HyperloopPodCompetition"
                        awards={[
                            t('turian-award-1'),
                            t('turian-award-2')
                        ]}
                    />

                    <TimelineGeneration
                        generation="H6"
                        inityear="2020"
                        endyear="2021"
                        title="IGNIS"
                        banner={h6_banner}
                        color={'#C1531B'}
                        extraImages={[h6_extra_1, h6_extra_2]}
                        description={(t('ignis-text'))}
                        competition="EuropeanHyperloopWeek"
                        awards={[t('ignis-award-1')]}
                    />

                    <TimelineGeneration
                        generation="H7"
                        inityear="2021"
                        endyear="2022"
                        title="AURAN"
                        banner={h7_banner}
                        color={'#2486A4'}
                        extraImages={[h7_extra_1, h7_extra_2]}
                        description={t('auran-text')}
                        competition="EuropeanHyperloopWeek"
                        awards={[
                            t('auran-award-1'),
                            t('auran-award-2'),
                            t('auran-award-3'),
                            t('auran-award-4'),
                        ]}
                    />

                    <TimelineGeneration
                        generation="H8"
                        inityear="2022"
                        endyear="2023"
                        title="KÉNOS & ATLAS"
                        banner={h8_banner}
                        color={'#C1531B'}
                        extraImages={[h8_extra_1, h8_extra_2]}
                        description={t('kenos-text')}
                        competition="EuropeanHyperloopWeek"
                        awards={[
                            t('kenos-award-1'),
                            t('kenos-award-2'),
                        ]}
                    />

                    <TimelineGeneration
                        generation="H9"
                        inityear="2023"
                        endyear="2024"
                        icon={medal}
                        title="VÉSPER"
                        banner={h9_banner}
                        color={'#2486A4'}
                        extraImages={[h9_extra_1, h9_extra_2]}
                        description={t('vesper-text')}
                        competition="EuropeanHyperloopWeek"
                        awards={[
                            t('vesper-award-1'),
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
