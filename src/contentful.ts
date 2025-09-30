import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const getJobOpenings = async () => {
  try {
    const response = await client.getEntries({
      content_type: "jobOpening",
      include: 2,
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching job openings:", error);
    throw error;
  }
};

export const getJobOpeningBySlug = async (slug: string) => {
  try {
    // First try to find by slug field
    let response = await client.getEntries({
      content_type: "jobOpening",
      "fields.slug": slug,
      include: 2,
    });

    if (response.items.length > 0) {
      return response.items[0];
    }

    const allJobOpenings = await client.getEntries({
      content_type: "jobOpening",
      include: 2,
    });

    const matchingJob = allJobOpenings.items.find((job: any) => {
      const generatedSlug = job.fields.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return generatedSlug === slug;
    });

    return matchingJob;
  } catch (error) {
    console.error("Error fetching job opening by slug:", error);
    throw error;
  }
};

export const getSingleJobOpening = async (entryId: string) => {
  try {
    const response = await client.getEntry(entryId);
    return response;
  } catch (error) {
    console.error("Error fetching job opening:", error);
    throw error;
  }
};

export const getTiers = async () => {
  try {
    const response = await client.getEntries({
      content_type: "tier",
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching tiers:", error);
    throw error;
  }
};

export const getPartners = async () => {
  try {
    const response = await client.getEntries({
      content_type: "partners",
      include: 2,
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
};

export const getPartnersData = async () => {
  try {
    const [tiersData, partnersData] = await Promise.all([
      getTiers(),
      getPartners(),
    ]);

    const tiersMap = new Map();
    tiersData.forEach((tier: any) => {
      tiersMap.set(tier.sys.id, {
        name: tier.fields.name,
        colorHex: tier.fields.colorHex,
        priority: tier.fields.priority || 999, // Use tier field as priority, default to 999 if missing
      });
    });

    const groupedByTier = new Map();

    partnersData.forEach((partner: any) => {
      const tierRef = partner.fields.status;
      const tierId = tierRef?.sys?.id;

      console.log(
        "Processing partner:",
        partner.fields.name,
        "with tierId:",
        tierId
      );
      console.log(partner);

      if (tierId && tiersMap.has(tierId)) {
        const tierData = tiersMap.get(tierId);
        const isPremium = tierData.name.toLowerCase() === "premium";

        if (!groupedByTier.has(tierId)) {
          groupedByTier.set(tierId, {
            name: tierData.name,
            priority: tierData.priority,
            partners: [],
            style: {
              color: tierData.colorHex,
              width: "100%",
            },
          });
        }

        const partnerData = {
          name: partner.fields.name,
          logo: {
            url: partner.fields.image?.fields?.file?.url
              ? `https:${partner.fields.image.fields.file.url}`
              : "",
            height: isPremium ? "240px" : "100px",
            maxWidth: isPremium ? "3000px" : "200px",
          },
          webpageURL: partner.fields.url || "#",
        };

        groupedByTier.get(tierId).partners.push(partnerData);
      }
    });

    // Convert map to array and sort by tier priority from Contentful
    const result = Array.from(groupedByTier.values());

    // Sort tiers by the priority field from Contentful (lower number = higher priority)
    result.sort((a, b) => {
      return a.priority - b.priority;
    });

    return result;
  } catch (error) {
    console.error("Error fetching partners data:", error);
    throw error;
  }
};
