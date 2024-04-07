import { usePartnersStore } from '../../../store';

export const logoSizeUnits = 'rem';

export function useLogo(tier: number, partner: number) {
    return usePartnersStore((state) => ({
        metadata: state.metadata[tier].partners[partner].logo,

        updateWidth: (width: number) =>
            state.updateLogo(tier, partner, {
                width: width != 0 ? width + logoSizeUnits : undefined,
            }),

        updateHeigth: (height: number) =>
            state.updateLogo(tier, partner, {
                height: height != 0 ? height + logoSizeUnits : undefined,
            }),

        updateFile: (file: File) => {
            state.updateLogoSource(tier, partner, {
                method: 'image',
                image: {
                    file: file,
                    url: URL.createObjectURL(file),
                },
            });
        },

        selectFile: () => {
            state.setLogoMethod(tier, partner, 'image');
        },

        updateURL: (url: string) => {
            state.updateLogoSource(tier, partner, {
                method: 'url',
                url: url,
            });
        },

        selectURL: () => {
            state.setLogoMethod(tier, partner, 'url');
        },
    }));
}
