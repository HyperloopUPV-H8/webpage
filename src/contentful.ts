import { createClient } from 'contentful'

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
})

export const getJobOpenings = async () => {
    try {
        const response = await client.getEntries({
            content_type: 'jobOpening',
            include: 2
        });
        return response.items;
    } catch (error) {
        console.error('Error fetching job openings:', error);
        throw error;
    }
}

export const getJobOpeningBySlug = async (slug: string) => {
    try {
        // First try to find by slug field
        let response = await client.getEntries({
            content_type: 'jobOpening',
            'fields.slug': slug,
            include: 2
        });
        
        if (response.items.length > 0) {
            return response.items[0];
        }
        
        const allJobOpenings = await client.getEntries({
            content_type: 'jobOpening',
            include: 2
        });
        
        const matchingJob = allJobOpenings.items.find((job: any) => {
            const generatedSlug = job.fields.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return generatedSlug === slug;
        });
        
        return matchingJob;
    } catch (error) {
        console.error('Error fetching job opening by slug:', error);
        throw error;
    }
}

export const getSingleJobOpening = async (entryId: string) => {
    try {
        const response = await client.getEntry(entryId);
        return response;
    } catch (error) {
        console.error('Error fetching job opening:', error);
        throw error;
    }
}