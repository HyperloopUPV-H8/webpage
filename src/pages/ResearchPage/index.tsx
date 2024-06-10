import techH8 from '../../assets/documents/frs-tech-h8.pdf';
import FileButton from './FileButton';
import innovationVideo from '../../assets/backgrounds/innovation-video.mov';
import style from './style.module.scss';

export default function ResearchPage() {
    return (
        <>
            <div className={style.section_1}>
                <video autoPlay loop muted playsInline>
                    <source src={innovationVideo} type="video/mp4" />
                </video>
                <h1 className={style.title}>Investigación</h1>
            </div>
            <div className={style.section_2}>
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
