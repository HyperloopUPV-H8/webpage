import { Tier } from '../../pages/DashboardPage/PartnersEdit/store/dto';
import style from './style.module.scss';

type PartnersTierProps = {
    meta: Tier;
};

export default function PartnersTier({ meta }: PartnersTierProps) {
    return (
        <div className={style.tier}>
            <div
                className={`${style.blur} ${style.top}`}
                style={{
                    backgroundColor: meta.style.color,
                }}
            />
            <div
                className={style.title}
                style={{
                    color: meta.style.color,
                }}
            >
                <p>Sponsors</p>
                <h2>{meta.name}</h2>
            </div>
            <div
                className={style.partners}
                style={{
                    width: meta.style.width,
                }}
            >
                {meta.partners.map((partner) => (
                    <a
                        key={partner.name}
                        href={partner.webpageURL}
                        target="_blank"
                    >
                        <img
                            alt={partner.name}
                            src={partner.logo.url}
                            style={{
                                width: partner.logo.width,
                                height: partner.logo.height,
                            }}
                        />
                    </a>
                ))}
            </div>
            <div
                className={`${style.blur} ${style.bottom}`}
                style={{
                    backgroundColor: meta.style.color,
                }}
            ></div>
        </div>
    );
}
