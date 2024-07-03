// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    token: null
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
