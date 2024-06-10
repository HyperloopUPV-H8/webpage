import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { GetViewportParameters } from 'pdfjs-dist/types/src/display/api';
import { useCallback, useState } from 'react';
import filePreviewIcon from '../../../assets/icons/file-preview.svg';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.mjs?worker&url';
import style from './style.module.scss';

type Props = {
    fileTitle: string;
    fileDesc: string;
    fileName: string;
    fileURL: string;
    viewportParameters?: GetViewportParameters;
    previewWidth: number;
    previewHeight: number;
};

export default function FileButton({
    fileTitle,
    fileDesc,
    fileName,
    fileURL,
    viewportParameters,
    previewHeight,
    previewWidth,
}: Props) {
    const [previewSrc, setPreviewSrc] = useState(filePreviewIcon);

    const filePreview = useCallback(
        (previewCanvas: HTMLCanvasElement) => {
            GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
            getDocument(fileURL)
                .promise.then((document) => document.getPage(1))
                .then((page) => {
                    console.log(page);
                    const viewport = page.getViewport(viewportParameters);
                    previewCanvas.width = viewport.width;
                    previewCanvas.height = viewport.height;

                    return page.render({
                        canvasContext: previewCanvas.getContext('2d')!,
                        viewport: viewport,
                    }).promise;
                })
                .then(() => setPreviewSrc(previewCanvas.toDataURL()))
                .catch((reason) => console.error(reason));
        },
        [fileURL]
    );

    const downloadFile = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    return (
        <div className={style.container}>
            <h3 className={style.title} style={{ color: 'white' }}>
                {fileTitle}
            </h3>
            <p className={style.description} style={{ color: 'white' }}>
                {fileDesc}
            </p>
            <div className={style.preview} onClick={downloadFile}>
                <img
                    src={previewSrc}
                    width={previewWidth / 5}
                    height={previewHeight / 5}
                    style={{
                        width: previewWidth,
                        height: previewHeight,
                    }}
                />
                <canvas
                    ref={filePreview}
                    style={{ visibility: 'hidden', display: 'none' }}
                />
            </div>
        </div>
    );
}
