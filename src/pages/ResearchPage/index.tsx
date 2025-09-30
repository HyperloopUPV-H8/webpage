import techH8 from '../../assets/documents/frs-tech-h8.pdf';
import techH9 from '../../assets/documents/frs-tech-h9.pdf';
import socioH9 from '../../assets/documents/frs-socio-h9.pdf';
import techH10 from '../../assets/documents/frs-tech-h10.pdf'
import FileButton from './FileButton';
import innovationVideo from '../../assets/backgrounds/innovation-video.mp4';
import style from './style.module.scss';
import { useTranslation } from 'react-i18next';

export default function ResearchPage() {
    const { t } = useTranslation('research');

    return (
        <>
            <div className={style.section_1}>
                <video autoPlay loop muted playsInline>
                    <source src={innovationVideo} type="video/mp4" />
                </video>
                <h1 className={style.title}>{t("research")}</h1>
            </div>
            <div className={style.section_2}>
                <FileButton
                    fileTitle="Technical FRS H10"
                    fileDesc="Study and Comparison of Powering Methods for a Real Hyperloop"
                    fileName="Technical FRS H10.pdf"
                    fileURL={techH10}
                    viewportParameters={{ scale: 1.0 }}
                    previewWidth={210 * 2}
                    previewHeight={297 * 2}
                />
                <FileButton
                    fileTitle="Technical FRS H9"
                    fileDesc="Vehicle-infrastructure synergy optimization to minimize electromagnetic drag forces"
                    fileName="Technical FRS H9.pdf"
                    fileURL={techH9}
                    viewportParameters={{ scale: 1.0 }}
                    previewWidth={210 * 2}
                    previewHeight={297 * 2}
                />
                <FileButton
                    fileTitle="SocioEconomical FRS H9"
                    fileDesc="AI based analysis of the public discourse of hyperloop and guidelines for optimal divulgation"
                    fileName="SocioEconomical FRS H9.pdf"
                    fileURL={socioH9}
                    viewportParameters={{ scale: 1.0 }}
                    previewWidth={210 * 2}
                    previewHeight={297 * 2}
                />
                <FileButton
                    fileTitle="Technical FRS H8"
                    fileDesc="Building a Sense & Control testing environment for the development of a hyperloop vehicle"
                    fileName="Technical FRS H8.pdf"
                    fileURL={techH8}
                    viewportParameters={{ scale: 1.0 }}
                    previewWidth={210 * 2}
                    previewHeight={297 * 2}
                />
            </div>
        </>
    );
}
