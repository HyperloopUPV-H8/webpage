import { Tier } from '../../pages/DashboardPage/PartnersEdit/store/dto';
import PartnersTier from '../PartnersTier';
import style from './style.module.scss';

type Props = {
    id?: string;
    metadata: Tier[];
};

export default function PartnersDisplay(props: Props) {
    return (
        <div
            id={props.id}
            className={`${style['partners__section']} ${style['section-2']}`}
        >
            {props.metadata.map((meta) => (
                <PartnersTier key={meta.name} meta={meta} />
            ))}
        </div>
    );
}
