export type Tier = {
    name: string;
    partners: Partner[];
    style: Style;
};

export type Partner = {
    name: string;
    logo: Logo;
    webpageURL: string;
};

export type Logo = {
    url: string;
    width?: string;
    height?: string;
};

export type Style = {
    color: string;
    width: string;
};
