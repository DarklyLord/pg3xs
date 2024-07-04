// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userLevel: null,
    email: null,
  }),
  getters: {
    getUserLevel: (state) => state.userLevel,
    getEmail: (state) => state.email,
  },
  actions: {
    setUserLevel(userLevel) {
      this.userLevel = userLevel;
    },
    setEmail(email) {
      this.email = email;
    },
  },
});
