import { ChangeEvent, useState } from 'react';
import style from './style.module.scss';
import PartnerEdit from './PartnerEdit';
import { TierUpdate, usePartnersStore } from '../store';

type Props = {
    index: number;
};

export default function TierEdit({ index }: Props) {
    const defaultMetadata = usePartnersStore(
        (state) => state.originalMetadata[index]
    );
    const updateTier = usePartnersStore(
        (state) => (update: TierUpdate) => state.updateTier(index, update)
    );

    const [color, setColor] = useState(defaultMetadata.style.color);
    const [width, setWidth] = useState(defaultMetadata.style.width);

    const updateColor = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setColor(event.target.value);
        updateTier({
            style: {
                color: event.target.value,
                width: width,
            },
        });
    };

    const updateWidth = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setWidth(event.target.value + '%');
        updateTier({
            style: {
                color: color,
                width: event.target.value + '%',
            },
        });
    };

    const updateName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        updateTier({
            name: event.target.value,
        });
    };

    return (
        <div className={style.container}>
            <div className={style.drag_and_drop} />
            <div className={style.info}>
                <div className={style.tier_info}>
                    <div className={style.tier_name}>
                        <button className={style.remove_button}>-</button>
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
                            type="range"
                            id={`tier-width-${defaultMetadata.name.replace(
                                ' ',
                                '_'
                            )}`}
                            min={0}
                            max={100}
                            step={1}
                            onChange={updateWidth}
                            defaultValue={Number.parseFloat(
                                defaultMetadata.style.width.replace('rem', '')
                            )}
                            className={style.input_element}
                        />
                        <p className={style.width_preview}>{width}</p>
                    </div>
                </div>

                <div className={style.tier_partners}>
                    {defaultMetadata.partners.map((_, idx) => {
                        return (
                            <PartnerEdit
                                key={idx}
                                tierIndex={index}
                                index={idx}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
