import { route } from "../routes";
import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;


const API_URL = import.meta.env.MODE === "development"
    ? import.meta.env.VITE_OFFLINE_SERVER
    : import.meta.env.VITE_ONLINE_SERVER


export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    isCheckingAuth: true,
    isLoading: false,
    message: null,
    error: null,
    user: null,

    resetError: () => set({ error: null }),

    registration: async (email, password, name) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}${route.register}`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });
            throw error;
        }
    },


    login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}${route.login}`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },


    logout: async () => {
        set({ isLoading: true, error: null });

        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },


    emailVerification: async (code) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}${route.emailVerification}`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },


    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });

        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isAuthenticated: false, isCheckingAuth: false });
            throw error;
        }
    },


    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}${route.forgotPassword}`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },


    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    },
}));
