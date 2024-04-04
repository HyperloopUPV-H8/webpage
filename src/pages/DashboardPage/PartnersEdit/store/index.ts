import { create } from 'zustand';

export type TierMetadata = {
    name: string;
    partners: PartnerMetadata[];
    style: StyleMetadata;
};

export type TierUpdate = Partial<Omit<TierMetadata, 'partners'>>;

export type PartnerMetadata = {
    name: string;
    logo: LogoMetadata;
    webgapeURL: string;
};

export type PartnerUpdate = Partial<PartnerMetadata>;

export type LogoMetadata = {
    url: string;
    width?: string;
    height?: string;
};

export type StyleMetadata = {
    color: string;
    width: string;
};

type PartnersState = {
    originalMetadata: TierMetadata[];
    modifiedMetadata: TierMetadata[];

    loadOriginalMetadata: (metadata: TierMetadata[]) => void;
    updateTier: (tier: number, update: TierUpdate) => void;
    updatePartner: (
        tier: number,
        partner: number,
        update: PartnerUpdate
    ) => void;
};

export const usePartnersStore = create<PartnersState>()((set) => ({
    originalMetadata: [],
    modifiedMetadata: [],

    loadOriginalMetadata: (metadata: TierMetadata[]) => {
        set((_) => ({
            originalMetadata: JSON.parse(JSON.stringify(metadata)),
            modifiedMetadata: JSON.parse(JSON.stringify(metadata)),
        }));
    },

    updateTier: (tier: number, update: TierUpdate) => {
        set((state) => {
            return {
                modifiedMetadata: [
                    ...state.modifiedMetadata.map((meta, idx) =>
                        idx == tier ? { ...meta, ...update } : meta
                    ),
                ],
            };
        });
    },

    updatePartner: (tier: number, partner: number, update: PartnerUpdate) => {
        set((state) => {
            return {
                modifiedMetadata: [
                    ...state.modifiedMetadata.map((meta, idx) =>
                        idx == tier
                            ? {
                                  ...meta,
                                  partners: meta.partners.map((meta, idx) =>
                                      idx == partner
                                          ? {
                                                ...meta,
                                                ...update,
                                            }
                                          : meta
                                  ),
                              }
                            : meta
                    ),
                ],
            };
        });
    },
}));
