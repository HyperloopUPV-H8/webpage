import { ChangeEvent, useState } from 'react';
import { TierMetadata } from '..';
import style from './style.module.scss';
import PartnerEdit from './PartnerEdit';

type Props = {
    metadata: TierMetadata;
};

export default function TierEdit({ metadata }: Props) {
    const [color, setColor] = useState(metadata.style.color);
    const [width, setWidth] = useState(metadata.style.width);

    const updateColor = (event: ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const updateWidth = (event: ChangeEvent<HTMLInputElement>) => {
        setWidth(event.target.value + '%');
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
                            defaultValue={metadata.name}
                            style={{ color: color }}
                            className={style.tier_name_input}
                        />
                    </div>

                    <div className={style.tier_input}>
                        <label
                            htmlFor={`tier-color-${metadata.name.replace(
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
                            defaultValue={metadata.style.color}
                            id={`tier-color-${metadata.name.replace(' ', '_')}`}
                            className={style.input_element}
                        />
                    </div>

                    <div className={style.tier_input}>
                        <label
                            htmlFor={`tier-width-${metadata.name.replace(
                                ' ',
                                '_'
                            )}`}
                            className={style.input_label}
                        >
                            Width:
                        </label>
                        <input
                            type="range"
                            id={`tier-width-${metadata.name.replace(' ', '_')}`}
                            min={0}
                            max={100}
                            step={1}
                            onChange={updateWidth}
                            className={style.input_element}
                        />
                        <p className={style.width_preview}>{width}</p>
                    </div>
                </div>

                <div className={style.tier_partners}>
                    {metadata.partners.map((partner) => {
                        return <PartnerEdit metadata={partner} />;
                    })}
                </div>
            </div>
        </div>
    );
}
