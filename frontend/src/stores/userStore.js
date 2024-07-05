// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userLevel: 1, // TODO Set userLevel to Null after Testing
    email: 'lm@lars-metzger.de', // TODO Set email to Null after Testing
    userId: 1 //TODO Set userId to Null after Testing
  }),
  getters: {
    getUserLevel: (state) => state.userLevel,
    getEmail: (state) => state.email,
    getUserId: (state) => state.userId,
  },
  actions: {
    setUserLevel(userLevel) {
      this.userLevel = userLevel;
    },
    setEmail(email) {
      this.email = email;
    },
    setUserId(id) {
      this.userId = id;
    }
  },
});
