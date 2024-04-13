import { ChangeEvent, DragEvent, useRef } from 'react';
import style from './style.module.scss';
import { usePartner } from './hooks';
import ImageSelect from './ImageSelect';
import FormInput from '../../../../../components/ContactForm/FormInput';

type Props = {
    tierIndex: number;
    index: number;
};

export default function PartnerEdit({ tierIndex, index }: Props) {
    const partner = usePartner(tierIndex, index);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const updateName = (event: ChangeEvent<HTMLInputElement>) => {
        partner.update({
            name: event.target.value,
        });
    };

    const updateWebpageURL = (event: ChangeEvent<HTMLInputElement>) => {
        partner.update({
            webpageURL: event.target.value,
        });
    };

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('application/element', 'partner');
        event.dataTransfer.setData(
            'application/partner-index',
            index.toString()
        );
        event.dataTransfer.setData(
            'application/tier-index',
            tierIndex.toString()
        );
        event.dataTransfer.dropEffect = 'move';

        event.dataTransfer.setDragImage(
            containerRef.current ??
                (() => {
                    const img = new Image();
                    img.src = partner.metadata.logo.source;
                    if (partner.metadata.logo.width) {
                        img.width =
                            Number.parseInt(
                                partner.metadata.logo.width.replace('rem', '')
                            ) * 16;
                    }
                    if (partner.metadata.logo.height) {
                        img.height =
                            Number.parseInt(
                                partner.metadata.logo.height.replace('rem', '')
                            ) * 16;
                    }
                    return img;
                })(),
            10,
            10
        );
    };

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        switch (event.dataTransfer.getData('application/element')) {
            case 'partner':
                dropPartner(event);
                break;
            case 'tier':
                dropTier(event);
                break;
        }
    };

    const dropPartner = (event: DragEvent<HTMLDivElement>) => {
        const fromTier = Number.parseInt(
            event.dataTransfer.getData('application/tier-index')
        );
        const from = Number.parseInt(
            event.dataTransfer.getData('application/partner-index')
        );
        partner.move(fromTier, from);
    };

    const dropTier = (event: DragEvent<HTMLDivElement>) => {
        const fromTier = Number.parseInt(
            event.dataTransfer.getData('application/tier-index')
        );
        partner.moveTier(fromTier);
    };

    return (
        <div
            className={style.container}
            onDragOver={onDragOver}
            onDrop={onDrop}
            ref={containerRef}
        >
            <div
                className={style.drag_and_drop}
                onDragStart={onDragStart}
                draggable
            >
                |||
            </div>

            <div className={style.info}>
                <div className={style.partner_name}>
                    <input
                        type="text"
                        defaultValue={partner.metadata.name}
                        className={style.partner_name_input}
                        onChange={updateName}
                    />
                    <button
                        className={style.remove_button}
                        onClick={partner.remove}
                    >
                        Remove
                    </button>
                </div>
                <FormInput
                    label="Webpage URL"
                    id={`partner-webpage-url-${partner.metadata.name.replace(
                        ' ',
                        '_'
                    )}`}
                    type="url"
                    defaultValue={partner.metadata.webpageURL}
                    onChange={updateWebpageURL}
                />
                <ImageSelect tier={tierIndex} partner={index} />
            </div>
        </div>
    );
}
