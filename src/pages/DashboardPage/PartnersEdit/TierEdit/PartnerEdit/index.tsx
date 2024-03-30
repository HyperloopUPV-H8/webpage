import { PartnerMetadata } from '../..';
import style from './style.module.scss';

type Props = {
    metadata: PartnerMetadata;
};

export default function PartnerEdit({ metadata }: Props) {
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
            </div>
        </div>
    );
}
