type PartnerMeta = {
    name: string;
    logo: {
        width: string;
        height: string;
        url: string;
    };
    url: string;
};

type TierMeta = {
    color: string;
    width: string;
    partners: Array<PartnerMeta>;
};

type PartnersTierProps = {
    tier: string;
    meta: TierMeta;
};

export const PartnersTier = ({ tier, meta }: PartnersTierProps) => {
    return (
        <div className="partners__tier">
            <div
                className="blur__top"
                style={{
                    backgroundColor: meta.color,
                }}
            ></div>
            <div
                className="partners__tier__title"
                style={{
                    color: meta.color,
                }}
            >
                <p>Sponsors</p>
                <h2>{tier}</h2>
            </div>
            <div
                className="partners__tier__partners"
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
                className="blur__bottom"
                style={{
                    backgroundColor: meta.color,
                }}
            ></div>
        </div>
    );
};
