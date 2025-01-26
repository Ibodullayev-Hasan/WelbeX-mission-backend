import { IBlog } from "../interfaces";

export function validateBlogData(blogData: IBlog): string | null {
    if (!blogData.content || !blogData.content.type || !blogData.content.content) {
        return "Content and content type are required.";
    }

    const validTypes = ['text', 'image', 'video'];
    if (!validTypes.includes(blogData.content.type)) {
        return "Invalid content type. Allowed types are 'text', 'image', or 'video'.";
    }

    if (!blogData.content.content.trim()) {
        return "Content cannot be empty.";
    }

    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    if (blogData.content.type === 'image' || blogData.content.type === 'video') {
        if (!urlRegex.test(blogData.content.content)) {
            return "Image or video content must be a valid URL.";
        }
    }

    return null;
};
