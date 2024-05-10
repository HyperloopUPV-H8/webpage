import { usePartnersStore } from '../../store';
import { PartnerUpdate } from '../../store/model';

export function usePartner(tier: number, partner: number) {
    return usePartnersStore((state) => ({
        metadata: state.metadata[tier].partners[partner],
        lastPartner: state.metadata[tier].partners.length,
        lastTier: state.metadata.length,

        update: (update: PartnerUpdate) =>
            state.updatePartner(tier, partner, update),
        remove: () => state.removePartner(tier, partner),
        move: (fromTier: number, fromPartner: number) =>
            state.movePartner(fromTier, fromPartner, tier, partner),
        moveTo: (toTier: number, toPartner: number) =>
            state.movePartner(tier, partner, toTier, toPartner),
        moveTier: (fromTier: number) => state.moveTier(fromTier, tier),
    }));
}
