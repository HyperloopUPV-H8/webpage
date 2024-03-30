import style from './style.module.scss';

type TierMeta = {
    color: string;
    width: string;
    partners: Array<PartnerMeta>;
};

type PartnerMeta = {
    name: string;
    logo: PartnerLogo;
    url: string;
};

type PartnerLogo = {
    width: string;
    height: string;
    url: string;
};

type PartnersTierProps = {
    tier: string;
    meta: TierMeta;
};

export default function PartnersTier({ tier, meta }: PartnersTierProps) {
    return (
        <div className={style.tier}>
            <div
                className={`${style.blur} ${style.top}`}
                style={{
                    backgroundColor: meta.color,
                }}
            />
            <div
                className={style.title}
                style={{
                    color: meta.color,
                }}
            >
                <p>Sponsors</p>
                <h2>{tier}</h2>
            </div>
            <div
                className={style.partners}
                style={{
                    width: meta.width,
                }}
            >
                {meta.partners.map((partner) => (
                    <a key={partner.name} href={partner.url} target="_blank">
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
                    backgroundColor: meta.color,
                }}
            ></div>
        </div>
    );
}
