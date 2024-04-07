import { ChangeEvent, DragEvent } from 'react';
import style from './style.module.scss';
import { usePartner } from './hooks';
import ImageSelect from './ImageSelect';

type Props = {
    tierIndex: number;
    index: number;
};

export default function PartnerEdit({ tierIndex, index }: Props) {
    const partner = usePartner(tierIndex, index);

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
            onDragStart={onDragStart}
            draggable
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <div className={style.info}>
                <div className={style.partner_name}>
                    <button
                        className={style.remove_button}
                        onClick={partner.remove}
                    >
                        -
                    </button>
                    <input
                        type="text"
                        defaultValue={partner.metadata.name}
                        className={style.partner_name_input}
                        onChange={updateName}
                    />
                </div>
                <div className={style.partner_webpage}>
                    <label
                        htmlFor={`partner-webpage-url-${partner.metadata.name.replace(
                            ' ',
                            '_'
                        )}`}
                    >
                        Webpage:
                    </label>
                    <input
                        type="text"
                        defaultValue={partner.metadata.webpageURL}
                        id={`partner-webpage-url-${partner.metadata.name.replace(
                            ' ',
                            '_'
                        )}`}
                        className={style.input_element}
                        onChange={updateWebpageURL}
                    />
                </div>
                <ImageSelect tier={tierIndex} partner={index} />
            </div>
        </div>
    );
}
