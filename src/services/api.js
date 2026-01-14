const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    // Properties
    getAllProperties: async () => {
        const response = await fetch(`${API_BASE_URL}/properties`);
        return response.json();
    },

    getPropertyById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`);
        return response.json();
    },

    searchStays: async (params) => {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/stays?${queryString}`);
        return response.json();
    },

    // Reviews
    getReviewsByProperty: async (propertyId) => {
        const response = await fetch(`${API_BASE_URL}/reviews/${propertyId}`);
        return response.json();
    },

    // Community
    getCommunityStories: async () => {
        const response = await fetch(`${API_BASE_URL}/community/stories`);
        return response.json();
    },

    // Auth
    login: async (phone, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, password })
        });
        return response.json();
    },

    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    // Bookings
    createBooking: async (bookingData, token) => {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(bookingData)
        });
        return response.json();
    },

    getMyBookings: async (token) => {
        const response = await fetch(`${API_BASE_URL}/bookings/my`, {
            headers: { 'x-auth-token': token }
        });
        return response.json();
    }
};
