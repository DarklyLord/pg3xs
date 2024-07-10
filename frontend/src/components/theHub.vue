<template>
    <v-app v-if="checkAccess()">
      <v-app-bar class="headerBar">
        <div class="nav-bar" @click="goToHub()">
          <v-icon>mdi-home-circle</v-icon>
          Hub
        </div>
        <div class="logout-bar" @click="goToLogin">
          <v-icon>mdi-logout</v-icon>
          {{this.prefixEmail}}
        </div>
      </v-app-bar>
      <v-main>
        <router-view>

        </router-view>
      </v-main>
      <v-footer>
        <div class="version-number">
          <!-- <v-img src="../assets/logoName.png"  ></v-img>-->
          Version 0.5

        </div>
      </v-footer>
    </v-app>
  <div v-else>
    <h1 > Forbidden No Access</h1>
    <h1 > How did you get Here?</h1>
    <router-link to="/"> Go back to Login</router-link>
  </div>

</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "@/stores/userStore";
import router from "@/router";

export default {
  data(){
    return{
      prefixEmail:''
    }
  },
  computed: {
    ...mapState(useUserStore, {
      userLevel: 'getUserLevel',
      isLoggedIn: 'getIsLoggedIn',
      email: 'getEmail',

    })
  },
  mounted() {
    this.getEmailPart(this.email)
  },
  methods: {
    router() {
      return router
    },
    goToHub(){
      router.push('/hub')
    },
    goToLogin(){
      router.push('/')
    },
    checkAccess() {
      if (this.userLevel === 1 || this.userLevel === 2 || this.userLevel === 3) {
        return true

      }
    },
    getEmailPart(email) {
      // Split the email into two parts using the "@" as the delimiter
      const parts = email.split('@');

      // Destructure the parts array into localPart and domainPart
      const [localPart, domainPart] = parts;

      this.prefixEmail = localPart
    }
  }
}
</script>

<style scoped>
.version-number {
  margin-left: 95%;
  color: black;
}

.nav-bar {
  display: flex;
  margin-left: 20px;
  font-size: 20px;
}

.nav-bar:hover {
  cursor: pointer;
}

.logout-bar {
  display: flex;
  width: auto;
  margin-left: auto;
  font-size: 20px;
}

.logout-bar:hover {
  cursor: pointer;
}

.v-icon {
  margin-right: 5px;
}

.v-application--wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden; /* Ensures no scrollbar on the main wrap */
}

.v-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden; /* Ensures no scrollbar on the main content */
  background-color: rgba(255, 255, 255, 0.87);
}

/* Override any problematic global styles */
* {
  box-sizing: border-box; /* Ensure padding and borders are included in the element's total width and height */
  margin: 0; /* Remove default margins */
  padding: 0; /* Remove default paddings */
}

body {
  overflow: hidden; /* Ensure no scrollbar on the body */
}
</style>
