import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import * as model from './model';
import * as DTO from './dto';

export type TierIndex = number;
export type PartnerIndex = number;

type PartnersState = {
    metadata: model.Tier[];

    setMetadata: (metadata: DTO.Tier[]) => void;

    updateTier: (tier: TierIndex, update: model.TierUpdate) => void;
    updateStyle: (tier: TierIndex, update: model.StyleUpdate) => void;
    updatePartner: (
        tier: TierIndex,
        partner: PartnerIndex,
        update: model.PartnerUpdate
    ) => void;
    updateLogo: (
        tier: TierIndex,
        partner: PartnerIndex,
        update: model.LogoUpdate
    ) => void;
    updateLogoSource: (
        tier: TierIndex,
        partner: PartnerIndex,
        update: model.LogoUpdateSource
    ) => void;
    setLogoMethod: (
        tier: TierIndex,
        partner: PartnerIndex,
        method: model.LogoMethod
    ) => void;

    addTier: () => void;
    addPartner: (tier: number) => void;
    removeTier: (tier: number) => void;
    removePartner: (tier: number, partner: number) => void;

    moveTier: (fromTier: number, toTier: number) => void;
    movePartner: (
        fromTier: number,
        fromPartner: number,
        toTier: number,
        toPartner: number
    ) => void;
};

export const usePartnersStore = create<PartnersState>()((set) => ({
    metadata: [],

    setMetadata: (metadata: DTO.Tier[]) => {
        set((_) => ({
            defaults: metadata,
            metadata: metadata.map((meta) => ({
                id: uuid(),
                ...meta,
                partners: meta.partners.map((meta) => ({
                    id: uuid(),
                    ...meta,
                    logo: {
                        ...meta.logo,
                        source: meta.logo.url,
                        method: 'url',
                    },
                })),
            })),
        }));
    },

    updateTier: (tier: TierIndex, update: model.TierUpdate) => {
        set((state) => ({
            metadata: mapNth(state.metadata, tier, (meta) => ({
                ...meta,
                ...update,
            })),
        }));
    },

    updateStyle: (tier: TierIndex, update: model.StyleUpdate) => {
        set((state) => ({
            metadata: mapNth(state.metadata, tier, (meta) => ({
                ...meta,
                style: {
                    ...meta.style,
                    ...update,
                },
            })),
        }));
    },

    updatePartner: (
        tier: TierIndex,
        partner: PartnerIndex,
        update: model.PartnerUpdate
    ) => {
        set((state) => ({
            metadata: mapNth(state.metadata, tier, (meta) => ({
                ...meta,
                partners: mapNth(meta.partners, partner, (meta) => ({
                    ...meta,
                    ...update,
                })),
            })),
        }));
    },

    updateLogo: (
        tier: TierIndex,
        partner: TierIndex,
        update: model.LogoUpdate
    ) => {
        set((state) => ({
            metadata: mapNth(state.metadata, tier, (meta) => ({
                ...meta,
                partners: mapNth(meta.partners, partner, (meta) => ({
                    ...meta,
                    logo: {
                        ...meta.logo,
                        ...update,
                    },
                })),
            })),
        }));
    },

    updateLogoSource: (
        tier: TierIndex,
        partner: TierIndex,
        update: model.LogoUpdateSource
    ) => {
        set((state) => ({
            metadata: mapNth(state.metadata, tier, (meta) => ({
                ...meta,
                partners: mapNth(meta.partners, partner, (meta) => {
                    let source = '';
                    switch (update.method) {
                        case 'image':
                            if (meta.logo.image) {
                                URL.revokeObjectURL(meta.logo.image.url);
                            }
                            source = update.image.url;
                            break;
                        case 'url':
                            source = update.url;
                            break;
                    }
                    return {
                        ...meta,
                        logo: {
                            ...meta.logo,
                            ...update,
                            source: source,
                        },
                    };
                }),
            })),
        }));
    },

    setLogoMethod: (
        tier: TierIndex,
        partner: TierIndex,
        method: model.LogoMethod
    ) => {
        set((state) => ({
            metadata: mapNth(state.metadata, tier, (meta) => ({
                ...meta,
                partners: mapNth(meta.partners, partner, (meta) => {
                    let source = '';
                    switch (method) {
                        case 'image':
                            source = meta.logo.image ? meta.logo.image.url : '';
                            break;
                        case 'url':
                            source = meta.logo.url ? meta.logo.url : '';
                            break;
                    }
                    return {
                        ...meta,
                        logo: {
                            ...meta.logo,
                            source: source,
                        },
                    };
                }),
            })),
        }));
    },

    addTier: () => {
        set((state) => ({
            metadata: [
                ...state.metadata,
                {
                    name: 'New Tier',
                    id: uuid(),
                    style: {
                        color: '#fff',
                        width: '100%',
                    },
                    partners: [],
                },
            ],
        }));
    },

    addPartner: (tier: TierIndex) => {
        set((state) => ({
            metadata: state.metadata.map((meta, idx) =>
                idx == tier
                    ? {
                          ...meta,
                          partners: [
                              ...meta.partners,
                              {
                                  name: 'New Partner',
                                  id: uuid(),
                                  webpageURL: '',
                                  logo: {
                                      source: '',
                                      method: 'url',
                                  },
                              },
                          ],
                      }
                    : meta
            ),
        }));
    },

    removeTier: (tier: TierIndex) => {
        set((state) => ({
            metadata: state.metadata.filter((_, idx) => idx != tier),
        }));
    },

    removePartner: (tier: TierIndex, partner: PartnerIndex) => {
        set((state) => ({
            metadata: mapNth(state.metadata, tier, (meta) => ({
                ...meta,
                partners: meta.partners.filter((_, idx) => idx != partner),
            })),
        }));
    },

    movePartner: (
        fromTier: TierIndex,
        from: PartnerIndex,
        toTier: TierIndex,
        to: PartnerIndex
    ) => {
        set((state) => ({
            metadata: [
                ...state.metadata.map((meta, idx) => {
                    let after = { ...meta, partners: [...meta.partners] };
                    if (idx == fromTier) {
                        after.partners = after.partners.filter(
                            (_, idx) => idx != from
                        );
                    }
                    if (idx == toTier) {
                        after.partners.splice(
                            to,
                            0,
                            state.metadata[fromTier].partners[from]
                        );
                    }
                    return after;
                }),
            ],
        }));
    },

    moveTier: (fromTier: TierIndex, toTier: TierIndex) => {
        set((state) => {
            let after = state.metadata.filter((_, idx) => idx != fromTier);
            after.splice(toTier, 0, state.metadata[fromTier]);
            return {
                metadata: after,
            };
        });
    },
}));

[].map;

function mapNth<T>(
    input: T[],
    index: number,
    callbackfn: (value: T, index: number, array: T[]) => T
): T[] {
    const updated = [...input];
    updated[index] = callbackfn(updated[index], index, updated);
    return updated;
}
