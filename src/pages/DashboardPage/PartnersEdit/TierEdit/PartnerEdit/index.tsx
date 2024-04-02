import { useState } from 'react';
import { PartnerMetadata } from '../..';
import style from './style.module.scss';

type Props = {
    metadata: PartnerMetadata;
};

export default function PartnerEdit({ metadata }: Props) {
    const [logoSrc, setLogoSrc] = useState(metadata.logo.url);
    return (
        <div className={style.container}>
            <div className={style.drag_and_drop} />
            <div className={style.info}>
                <div className={style.partner_name}>
                    <button className={style.remove_button}>-</button>
                    <input
                        type="text"
                        defaultValue={metadata.name}
                        className={style.partner_name_input}
                    />
                </div>
                <div className={style.partner_webpage}>
                    <label
                        htmlFor={`partner-webpage-url-${metadata.name.replace(
                            ' ',
                            '_'
                        )}`}
                    >
                        Webpage:
                    </label>
                    <input
                        type="text"
                        defaultValue={metadata.webgapeURL}
                        id={`partner-webpage-url-${metadata.name.replace(
                            ' ',
                            '_'
                        )}`}
                        className={style.input_element}
                    />
                </div>

                <div className={style.partner_logo}>
                    <img src={logoSrc} alt="Logo not found"></img>
                    <div className={style.partner_logo_select}>
                        <div className={style.partner_logo_upload}>
                            <input
                                type="radio"
                                name={`partner-logo-select-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                            />
                            <label
                                htmlFor={`partner-logo-upload-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                className={style.parnter_logo_label_select}
                            >
                                Upload:
                            </label>
                            <input
                                type="file"
                                name={`partner-logo-select-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                id={`partner-logo-upload-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                            />
                        </div>
                        <div className={style.partner_logo_url}>
                            <input
                                type="radio"
                                name={`partner-logo-select-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                            />
                            <label
                                htmlFor={`partner-logo-url-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                className={style.parnter_logo_label_select}
                            >
                                URL:
                            </label>
                            <input
                                type="text"
                                defaultValue={logoSrc}
                                name={`partner-logo-select-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                id={`partner-logo-url-${metadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                            />
                        </div>
                    </div>
                    <div className={style.partner_logo_size}>
                        <div className={style.partner_logo_size_input}>
                            <label>Width:</label>
                        </div>
                        <div className={style.partner_logo_size_input}>
                            <label>Height:</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
