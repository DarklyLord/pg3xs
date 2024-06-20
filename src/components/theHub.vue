<template>
  <v-app>
    <v-app-bar class="headerBar">
      <div class="nav-bar" @click="console.log('Nav Clicked')">
        <v-icon>mdi-home-circle</v-icon>
        Hub
      </div>
      <div class="logout-bar">
        <v-icon>mdi-logout</v-icon>
        Admin1
      </div>
    </v-app-bar>
    <v-main>
      <selector-hub>
      </selector-hub>
    </v-main>
    <v-footer>
      <div class="version-number">
        <!-- <v-img src="../assets/logoName.png"  ></v-img>-->
        Version 0.24

      </div>
    </v-footer>
  </v-app>
</template>

<script>
import SelectorHub from "@/components/selectorHub.vue";

export default {
  name: 'YourComponentName',
  components: {SelectorHub},
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
  margin-left: 89%;
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
