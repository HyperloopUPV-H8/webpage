import * as DTO from './dto';

export type Tier = Omit<DTO.Tier, 'partners'> & {
    id: string;
    partners: Partner[];
};

export type Partner = Omit<DTO.Partner, 'logo'> & {
    id: string;
    logo: Logo;
};

export type Logo = Omit<DTO.Logo, 'url'> & {
    url?: string;
    image?: Image;
    method: LogoMethod;
    source: string;
};

export type LogoMethod = 'url' | 'image';

export type Image = {
    file: File;
    url: string;
};

export type TierUpdate = Partial<Omit<Tier, 'partners' | 'id' | 'style'>>;
export type PartnerUpdate = Partial<Omit<Partner, 'id' | 'logo'>>;
export type LogoUpdate = Partial<
    Omit<Logo, 'url' | 'image' | 'method' | 'source'>
>;
export type LogoUpdateSource = LogoUpdateURL | LogoUpdateImage;
export type StyleUpdate = Partial<DTO.Style>;

type LogoUpdateURL = {
    method: 'url';
    url: string;
};

type LogoUpdateImage = {
    method: 'image';
    image: Image;
};
