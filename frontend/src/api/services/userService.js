import apiClient from "../apiClient";

export const userService = {
  // Get user profile (own)
  getProfile: async (accountId) => {
    const response = await apiClient.get(`/users/${accountId}`);
    return response.data;
  },

  // Get user by account ID (if allowed)
  getUser: async (accountId) => {
    const response = await apiClient.get(`/users/${accountId}`);
    return response.data;
  },

  // Update user by account ID
  updateUser: async (accountId, data) => {
    const response = await apiClient.put(`/users/${accountId}`, data);
    return response.data;
  },

  getSocialMedia: async (accountId) => {
    const response = await apiClient.get(`/users/${accountId}/social-media`);
    return response.data;
  },

  createSocialMedia: async (accountId, payload) => {
    const response = await apiClient.post(`/users/${accountId}/social-media`, payload);
    return response.data;
  },

  deleteSocialMedia: async (accountId, socialId) => {
    const response = await apiClient.delete(
      `/users/${accountId}/social-media/${socialId}`,
    );
    return response.data;
  },

  uploadProfileImage: async (accountId, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post(
      `/users/${accountId}/profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
};
