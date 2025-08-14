import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
export const getBlogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching blogs:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getBlogBySlug = async (slug) => {
    if (!slug) {
        throw new Error('Slug is required to fetch a blog post.');
    }
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${slug}`);
        return response.data.data; 
    } catch (error) {
        console.error(`Error fetching blog with slug ${slug}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const addComment = async (slug, commentData) => {
    if (!slug || !commentData) {
        throw new Error('Slug and comment data are required to add a comment.');
    }
    try {
        const response = await axios.post(`${API_BASE_URL}/blogs/${slug}/comments`, commentData);
        return response.data.data;
    } catch (error) {
        console.error(`Error adding comment to blog with slug ${slug}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * @param {string} blogSlug 
 * @param {string} commentId 
 * @param {object} replyData 
 * @returns {Promise<Object>}  
 * @throws {Error}
 */
export const addReplyToComment = async (blogSlug, commentId, replyData) => {
    if (!blogSlug || !commentId || !replyData) {
        throw new Error('Blog slug, comment ID, and reply data are required to add a reply.');
    }
    try {
        const response = await axios.post(`${API_BASE_URL}/blogs/${blogSlug}/comments/${commentId}/replies`, replyData);
        return response.data.data; 
    } catch (error) {
        console.error(`Error adding reply to comment ${commentId} on blog ${blogSlug}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};


export const addSubscription = async (email) => {
    if (!email) {
        throw new Error('Email is required for subscription.');
    }
    try {
        const response = await axios.post(`${API_BASE_URL}/subscriptions`, { email });
        return response.data;
    } catch (error) {
        console.error('Error adding subscription:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const submitContactForm = async (formData) => {
    if (!formData || !formData.name || !formData.email || !formData.message) {
        throw new Error('Name, email, and message are required.');
    }
    try {
        const response = await axios.post(`${API_BASE_URL}/contacts`, formData);
        return response.data;
    } catch (error) {
        console.error('Error submitting contact form:', error.response ? error.response.data : error.message);
        throw error;
    }
};