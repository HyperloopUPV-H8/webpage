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

        if (containerRef.current) {
            event.dataTransfer.setDragImage(containerRef.current, 10, 10);
        }
    };

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
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
            <div className={style.movement}>
                {tierIndex > 0 && (
                    <button
                        className={`${style.button} ${style.tier_up}`}
                        onClick={() =>
                            partner.moveTo(
                                tierIndex - 1,
                                Number.MAX_SAFE_INTEGER
                            )
                        }
                        title="Move up one tier"
                    >
                        {'<<'}
                    </button>
                )}
                {index > 0 && (
                    <button
                        className={`${style.button} ${style.up}`}
                        onClick={() => partner.moveTo(tierIndex, index - 1)}
                        title="Move up"
                    >
                        {'<'}
                    </button>
                )}
                <div
                    className={style.drag_and_drop}
                    onDragStart={onDragStart}
                    draggable
                >
                    |||
                </div>
                {index < partner.lastPartner - 1 && (
                    <button
                        className={`${style.button} ${style.down}`}
                        onClick={() => partner.moveTo(tierIndex, index + 1)}
                        title="Move down"
                    >
                        {'>'}
                    </button>
                )}
                {tierIndex < partner.lastTier - 1 && (
                    <button
                        className={`${style.button} ${style.tier_down}`}
                        onClick={() => partner.moveTo(tierIndex + 1, 0)}
                        title="Move down one tier"
                    >
                        {'>>'}
                    </button>
                )}
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
