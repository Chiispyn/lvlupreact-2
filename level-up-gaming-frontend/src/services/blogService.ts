import axios from 'axios';
import { BlogPost, BlogFormData } from '../types/Blog';

const API_URL = 'http://localhost:3000/api/blogs'; // Assuming your backend runs on port 3000

const blogService = {
    getAllBlogPosts: async (): Promise<BlogPost[]> => {
        const response = await axios.get<BlogPost[]>(API_URL);
        return response.data;
    },

    getBlogPostById: async (id: string): Promise<BlogPost> => {
        const response = await axios.get<BlogPost>(`${API_URL}/${id}`);
        return response.data;
    },

    createBlogPost: async (blogData: BlogFormData): Promise<BlogPost> => {
        const response = await axios.post<BlogPost>(API_URL, blogData);
        return response.data;
    },

    updateBlogPost: async (id: string, blogData: BlogFormData): Promise<BlogPost> => {
        const response = await axios.put<BlogPost>(`${API_URL}/${id}`, blogData);
        return response.data;
    },

    deleteBlogPost: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },
};

export default blogService;
