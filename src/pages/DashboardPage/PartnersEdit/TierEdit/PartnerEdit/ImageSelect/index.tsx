import { ChangeEvent, useRef } from 'react';
import { useLogo } from './hooks';
import style from './style.module.scss';

type Props = {
    tier: number;
    partner: number;
};

export default function ImageSelect(props: Props) {
    const logo = useLogo(props.tier, props.partner);
    const uploadRef = useRef<HTMLInputElement>(null);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!event.target.files) {
            return;
        }

        logo.updateFile(event.target.files[0]);
    };

    const onURLChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        logo.updateURL(event.target.value);
    };

    const onChangeWidth = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.value == '') {
            logo.updateWidth(0);
            return;
        }
        logo.updateWidth(Number.parseFloat(event.target.value));
    };

    const onChangeHeight = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.value == '') {
            logo.updateHeigth(0);
            return;
        }
        logo.updateHeigth(Number.parseFloat(event.target.value));
    };

    return (
        <div className={style.container}>
            <img
                className={style.preview}
                style={{
                    width: logo.metadata.width || 'auto',
                    height: logo.metadata.height || 'auto',
                }}
                src={logo.metadata.source}
                alt="Logo not found"
            />
            <div className={style.method}>
                <div className={style.upload}>
                    <input
                        type="radio"
                        name={`partner-logo-select-${props.tier}-${props.partner}`}
                        onInput={logo.selectFile}
                    />
                    <label
                        className={style.label}
                        htmlFor={`partner-logo-upload-${props.tier}-${props.partner}`}
                    >
                        Upload:
                    </label>
                    <input
                        type="file"
                        id={`partner-logo-upload-${props.tier}-${props.partner}`}
                        ref={uploadRef}
                        accept="image/*"
                        onChange={onFileChange}
                    />
                </div>
                <p>or</p>
                <div className={style.url}>
                    <input
                        type="radio"
                        name={`partner-logo-select-${props.tier}-${props.partner}`}
                        defaultChecked
                        onInput={logo.selectURL}
                    />
                    <label
                        className={style.label}
                        htmlFor={`partner-logo-url-${props.tier}-${props.partner}`}
                    >
                        URL:
                    </label>
                    <input
                        type="text"
                        id={`partner-logo-url-${props.tier}-${props.partner}`}
                        defaultValue={logo.metadata.url}
                        placeholder="URL of the logotype"
                        onChange={onURLChange}
                    />
                </div>
            </div>
            <div className={style.size}>
                <div className={style.width}>
                    <label
                        className={style.label}
                        htmlFor={`partner-logo-width-${props.tier}-${props.partner}`}
                    >
                        Width:
                    </label>
                    <input
                        type="number"
                        id={`partner-logo-width-${props.tier}-${props.partner}`}
                        min={0}
                        step={0.1}
                        defaultValue={
                            logo.metadata.width
                                ? Number.parseFloat(
                                      logo.metadata.width.replace('rem', '')
                                  )
                                : undefined
                        }
                        onChange={onChangeWidth}
                    />
                    <p>rem</p>
                </div>
                <div className={style.height}>
                    <label
                        className={style.label}
                        htmlFor={`partner-logo-height-${props.tier}-${props.partner}`}
                    >
                        Height:
                    </label>
                    <input
                        type="number"
                        id={`partner-logo-height-${props.tier}-${props.partner}`}
                        min={0}
                        step={0.1}
                        defaultValue={
                            logo.metadata.height
                                ? Number.parseFloat(
                                      logo.metadata.height.replace('rem', '')
                                  )
                                : undefined
                        }
                        onChange={onChangeHeight}
                    />
                    <p>rem</p>
                </div>
            </div>
        </div>
    );
}
