import { ChangeEvent } from 'react';
import { useLogo } from './hooks';
import style from './style.module.scss';
import FormInput from '../../../../../../components/ContactForm/FormInput';

type Props = {
    tier: number;
    partner: number;
};

export default function ImageSelect(props: Props) {
    const logo = useLogo(props.tier, props.partner);

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
            <div className={style.controls}>
                <div className={style.method}>
                    <div className={style.method_select}>
                        <button
                            className={`${style.method_button} ${
                                logo.metadata.method != 'image'
                                    ? style.method_unselected
                                    : style.method_selected
                            }`}
                            onClick={logo.selectFile}
                        >
                            file
                        </button>
                        <button
                            className={`${style.method_button} ${
                                logo.metadata.method != 'url'
                                    ? style.method_unselected
                                    : style.method_selected
                            }`}
                            onClick={logo.selectURL}
                        >
                            URL
                        </button>
                    </div>
                    <div
                        className={`${style.upload} ${
                            logo.metadata.method != 'image'
                                ? style.method_hidden
                                : ''
                        } ${
                            logo.metadata.method != 'image'
                                ? style.method_unselected
                                : style.method_selected
                        }`}
                    >
                        <FormInput
                            label="File"
                            type="file"
                            id={`partner-logo-upload-${props.tier}-${props.partner}`}
                            accept="image/*"
                            onChange={onFileChange}
                        />
                    </div>
                    <div
                        className={`${style.url} ${
                            logo.metadata.method != 'url'
                                ? style.method_hidden
                                : ''
                        } ${
                            logo.metadata.method != 'url'
                                ? style.method_unselected
                                : style.method_selected
                        }`}
                    >
                        <FormInput
                            label="Logo URL"
                            type="text"
                            id={`partner-logo-url-${props.tier}-${props.partner}`}
                            defaultValue={logo.metadata.url}
                            placeholder="URL of the logotype"
                            onChange={onURLChange}
                        />
                    </div>
                </div>
                <div className={style.size}>
                    <FormInput
                        label="Logo Width"
                        type="number"
                        after="rem"
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
                    <FormInput
                        label="Logo Height"
                        type="number"
                        after="rem"
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
                </div>
            </div>
            <img
                className={style.preview}
                style={{
                    width: logo.metadata.width || 'auto',
                    height: logo.metadata.height || 'auto',
                }}
                width={logo.metadata.width}
                height={logo.metadata.height}
                src={logo.metadata.source}
                alt={logo.partnerName}
            />
        </div>
    );
}
