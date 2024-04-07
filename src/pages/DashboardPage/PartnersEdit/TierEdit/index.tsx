import { ChangeEvent, DragEvent, useState } from 'react';
import style from './style.module.scss';
import PartnerEdit from './PartnerEdit';
import { usePartnersStore } from '../store';
import { StyleUpdate, TierUpdate } from '../store/model';

type Props = {
    index: number;
};

export default function TierEdit({ index }: Props) {
    const defaultMetadata = usePartnersStore((state) => state.metadata[index]);
    const updateTier = usePartnersStore(
        (state) => (update: TierUpdate) => state.updateTier(index, update)
    );
    const updateStyle = usePartnersStore(
        (state) => (update: StyleUpdate) => state.updateStyle(index, update)
    );
    const removeTier = usePartnersStore(
        (state) => () => state.removeTier(index)
    );
    const addPartner = usePartnersStore(
        (state) => () => state.addPartner(index)
    );
    const movePartner = usePartnersStore(
        (state) => (fromTier: number, from: number, to: number) =>
            state.movePartner(fromTier, from, index, to)
    );
    const moveTier = usePartnersStore(
        (state) => (fromTier: number) => state.moveTier(fromTier, index)
    );

    const [color, setColor] = useState(defaultMetadata.style.color);

    const updateColor = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setColor(event.target.value);
        updateStyle({
            color: event.target.value,
        });
    };

    const updateWidth = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        updateStyle({
            width: event.target.value + '%',
        });
    };

    const updateName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        updateTier({
            name: event.target.value,
        });
    };

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('application/element', 'tier');
        event.dataTransfer.setData('application/tier-index', index.toString());
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
        movePartner(fromTier, from, 0);
    };

    const dropTier = (event: DragEvent<HTMLDivElement>) => {
        const fromTier = Number.parseInt(
            event.dataTransfer.getData('application/tier-index')
        );
        moveTier(fromTier);
    };

    return (
        <div className={style.container}>
            <div className={style.info}>
                <div
                    className={style.tier_info}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                >
                    <div className={style.tier_name}>
                        <button
                            className={style.remove_button}
                            onClick={removeTier}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            defaultValue={defaultMetadata.name}
                            style={{ color: color }}
                            className={style.tier_name_input}
                            onChange={updateName}
                        />
                    </div>

                    <div className={style.tier_input}>
                        <label
                            htmlFor={`tier-color-${defaultMetadata.name.replace(
                                ' ',
                                '_'
                            )}`}
                            className={style.input_label}
                        >
                            Color:
                        </label>
                        <div
                            className={style.color_preview}
                            style={{ backgroundColor: color }}
                        ></div>
                        <input
                            type="text"
                            onChange={updateColor}
                            defaultValue={defaultMetadata.style.color}
                            id={`tier-color-${defaultMetadata.name.replace(
                                ' ',
                                '_'
                            )}`}
                            className={style.input_element}
                        />
                    </div>

                    <div className={style.tier_input}>
                        <label
                            htmlFor={`tier-width-${defaultMetadata.name.replace(
                                ' ',
                                '_'
                            )}`}
                            className={style.input_label}
                        >
                            Width:
                        </label>
                        <input
                            type="number"
                            id={`tier-width-${defaultMetadata.name.replace(
                                ' ',
                                '_'
                            )}`}
                            min={0}
                            max={100}
                            step={1}
                            onChange={updateWidth}
                            defaultValue={Number.parseInt(
                                defaultMetadata.style.width.replace('%', '')
                            )}
                            className={style.input_element}
                        />
                        <p className={style.width_preview}>%</p>
                    </div>
                </div>

                <div className={style.tier_partners}>
                    {defaultMetadata.partners.map((meta, idx) => {
                        return (
                            <PartnerEdit
                                key={meta.id}
                                tierIndex={index}
                                index={idx}
                            />
                        );
                    })}
                    <button
                        className={style.tier_add_partners}
                        onClick={addPartner}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
