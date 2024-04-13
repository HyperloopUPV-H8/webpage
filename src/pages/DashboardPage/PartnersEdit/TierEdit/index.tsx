import { ChangeEvent, DragEvent, useRef } from 'react';
import style from './style.module.scss';
import PartnerEdit from './PartnerEdit';
import { usePartnersStore } from '../store';
import { StyleUpdate, TierUpdate } from '../store/model';
import FormInput from '../../../../components/ContactForm/FormInput';

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

    const containerRef = useRef<HTMLDivElement | null>(null);

    const updateColor = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
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
        if (containerRef.current) {
            event.dataTransfer.setDragImage(containerRef.current, 10, 10);
        }
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
        <div
            className={style.container}
            onDragOver={onDragOver}
            onDrop={onDrop}
            ref={containerRef}
        >
            <div
                className={style.drag_and_drop}
                draggable
                onDragStart={onDragStart}
            >
                |||
            </div>
            <div className={style.info}>
                <div className={style.tier_info}>
                    <div className={style.tier_name}>
                        <input
                            type="text"
                            defaultValue={defaultMetadata.name}
                            className={style.tier_name_input}
                            onChange={updateName}
                        />
                        <button
                            className={style.remove_button}
                            onClick={removeTier}
                        >
                            Remove
                        </button>
                    </div>

                    <div className={style.tier_input}>
                        <FormInput
                            label="Color"
                            type="color"
                            onChange={updateColor}
                            defaultValue={defaultMetadata.style.color}
                        />
                    </div>
                    <div className={style.tier_input}>
                        <FormInput
                            label="Page Width"
                            after={defaultMetadata.style.width}
                            type="range"
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
                        Add Partner
                    </button>
                </div>
            </div>
        </div>
    );
}
