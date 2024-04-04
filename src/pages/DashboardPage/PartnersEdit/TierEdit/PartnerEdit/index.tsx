import { ChangeEvent, FormEvent, useState } from 'react';
import style from './style.module.scss';
import { PartnerUpdate, usePartnersStore } from '../../store';

type Props = {
    tierIndex: number;
    index: number;
};

export default function PartnerEdit({ tierIndex, index }: Props) {
    const defaultMetadata = usePartnersStore(
        (state) => state.originalMetadata[tierIndex].partners[index]
    );
    const updatePartner = usePartnersStore(
        (state) => (update: PartnerUpdate) =>
            state.updatePartner(tierIndex, index, update)
    );

    const [logoSrc, setLogoSrc] = useState(defaultMetadata.logo.url);
    const [imageInputMethod, setImageInputMethod] = useState<'file' | 'url'>(
        'url'
    );
    const [file, setFile] = useState<File | null>(null);
    const [logoURL, setLogoURL] = useState(defaultMetadata.logo.url);
    const [logoWidth, setLogoWidth] = useState<number | undefined>(undefined);
    const [logoHeight, setLogoHeight] = useState<number | undefined>(undefined);

    const onSelectUpload = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        selectFileSrc(file);
        setImageInputMethod('file');
    };

    const selectFileSrc = (file: File | null) => {
        if (!file) {
            updateLogoSrc('');
            return;
        }
        updateLogoSrc(URL.createObjectURL(file));
    };

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!event.target.files) {
            setFile(null);
            return;
        }

        setFile(event.target.files[0]);
        if (imageInputMethod == 'file') {
            selectFileSrc(event.target.files[0]);
        }
    };

    const onSelectURL = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        updateLogoSrc(logoURL);
    };

    const onURLChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setLogoURL(event.target.value);
        if (imageInputMethod == 'url') {
            updateLogoSrc(logoURL);
        }
    };

    const updateLogoSrc = (newURL: string) => {
        setLogoSrc((previousURL) => {
            if (previousURL.startsWith('blob')) {
                URL.revokeObjectURL(previousURL);
            }

            return newURL;
        });
        updatePartner({
            logo: {
                url: newURL,
                width: logoWidth + 'rem',
                height: logoHeight + 'rem',
            },
        });
    };

    const updateName = (event: ChangeEvent<HTMLInputElement>) => {
        updatePartner({
            name: event.target.value,
        });
    };

    const updateWebpageURL = (event: ChangeEvent<HTMLInputElement>) => {
        updatePartner({
            webgapeURL: event.target.value,
        });
    };

    const updateWidth = (event: ChangeEvent<HTMLInputElement>) => {
        setLogoWidth(Number.parseInt(event.target.value));
        updatePartner({
            logo: {
                url: logoSrc,
                width: event.target.value + 'rem',
                height: logoHeight + 'rem',
            },
        });
    };

    const updateHeight = (event: ChangeEvent<HTMLInputElement>) => {
        setLogoHeight(Number.parseInt(event.target.value));
        updatePartner({
            logo: {
                url: logoSrc,
                width: logoWidth + 'rem',
                height: event.target.value + 'rem',
            },
        });
    };

    return (
        <div className={style.container}>
            <div className={style.drag_and_drop} />
            <div className={style.info}>
                <div className={style.partner_name}>
                    <button className={style.remove_button}>-</button>
                    <input
                        type="text"
                        defaultValue={defaultMetadata.name}
                        className={style.partner_name_input}
                        onChange={updateName}
                    />
                </div>
                <div className={style.partner_webpage}>
                    <label
                        htmlFor={`partner-webpage-url-${defaultMetadata.name.replace(
                            ' ',
                            '_'
                        )}`}
                    >
                        Webpage:
                    </label>
                    <input
                        type="text"
                        defaultValue={defaultMetadata.webgapeURL}
                        id={`partner-webpage-url-${defaultMetadata.name.replace(
                            ' ',
                            '_'
                        )}`}
                        className={style.input_element}
                        onChange={updateWebpageURL}
                    />
                </div>

                <div className={style.partner_logo}>
                    <img src={logoSrc} alt="Logo not found"></img>
                    <div className={style.partner_logo_select}>
                        <div className={style.partner_logo_upload}>
                            <input
                                type="radio"
                                name={`partner-logo-select-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                onInput={onSelectUpload}
                            />
                            <label
                                htmlFor={`partner-logo-upload-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                className={style.parnter_logo_label_select}
                            >
                                Upload:
                            </label>
                            <input
                                type="file"
                                name={`partner-logo-select-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                id={`partner-logo-upload-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                onChange={onFileChange}
                            />
                        </div>
                        <div className={style.partner_logo_url}>
                            <input
                                type="radio"
                                name={`partner-logo-select-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                onInput={onSelectURL}
                                defaultChecked
                            />
                            <label
                                htmlFor={`partner-logo-url-${defaultMetadata.name.replace(
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
                                name={`partner-logo-select-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                id={`partner-logo-url-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                onChange={onURLChange}
                            />
                        </div>
                    </div>
                    <div className={style.partner_logo_size}>
                        <div className={style.partner_logo_size_input}>
                            <label
                                htmlFor={`partner-logo-width-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                className={style.partner_logo_label_size}
                            >
                                Width:
                            </label>
                            <input
                                type="number"
                                id={`partner-logo-width-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                min={0}
                                step={0.1}
                                defaultValue={
                                    defaultMetadata.logo.width
                                        ? Number.parseFloat(
                                              defaultMetadata.logo.width.replace(
                                                  'rem',
                                                  ''
                                              )
                                          )
                                        : undefined
                                }
                                className={style.input_element}
                                onChange={updateWidth}
                            />
                            <p>rem</p>
                        </div>
                        <div className={style.partner_logo_size_input}>
                            <label
                                htmlFor={`partner-logo-height-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                className={style.partner_logo_label_size}
                            >
                                Height:
                            </label>
                            <input
                                type="number"
                                id={`partner-logo-height-${defaultMetadata.name.replace(
                                    ' ',
                                    '_'
                                )}`}
                                min={0}
                                step={0.1}
                                defaultValue={
                                    defaultMetadata.logo.width
                                        ? Number.parseFloat(
                                              defaultMetadata.logo.width.replace(
                                                  'rem',
                                                  ''
                                              )
                                          )
                                        : undefined
                                }
                                className={style.input_element}
                                onChange={updateHeight}
                            />
                            <p>rem</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
