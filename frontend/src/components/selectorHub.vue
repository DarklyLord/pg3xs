<template>
  <v-list>
    <v-list-item @click="gotoTimeSelect">
      <v-icon>mdi-text-box-search-outline</v-icon>
      Timetable Select
    </v-list-item>
    <v-list-item v-if="checkAccess()" @click="gotoTimeAssign">
      <v-icon>mdi-text-box-search-outline</v-icon>
      Timetable Assign
    </v-list-item>
    <v-list-item @click="gotoTimeView">
      <v-icon>mdi-text-box-search</v-icon>
      Timetable View
    </v-list-item>
    <v-list-item @click="gotoUserSettings">
      <v-icon>mdi-account</v-icon>
      User Settings
    </v-list-item>
    <v-list-item v-if="checkAccess()" @click="gotoUserManagement">
      <v-icon>mdi-tools</v-icon>
      User Management
    </v-list-item>
  </v-list>
</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "@/stores/userStore";

export default {
  computed: {
    ...mapState(useUserStore, {
      userLevel: 'getUserLevel',
      isLoggedIn: 'getIsLoggedIn',
      email: 'getEmail',
    })
  },
  methods: {
    checkAccess() {
      console.log("UserLevel: " + this.userLevel)
      if (this.userLevel === 1 || this.userLevel === 2) {
        return true

      }
    },
    gotoTimeSelect() {
      this.$router.push('/hub/timeManagement/select')
    },
    gotoTimeView() {
      this.$router.push('/hub/timeManagement/view')
    }
    ,
    gotoTimeAssign() {
      console.log(this.userLevel)
      if (this.userLevel === 1 || this.userLevel === 2) {
        this.$router.push('/hub/timeManagement/assign')
      }
    }
    ,
    gotoUserSettings() {
      this.$router.push('/hub/userSettings')
    }
    ,
    gotoUserManagement() {
      this.$router.push('/hub/userManagement')
    }
  }
}

</script>

<style scoped>
.v-list {
  top: 25%;
  left: 40%;
  background-color: rgba(255, 255, 255, 0);

}

.v-list-item {
  background-color: rgba(255, 255, 255, 0);
  color: #5a5a5a;
  max-width: 20%;
  text-decoration: underline;
}

.v-list-item:hover {
  max-width: 15%;
  background-color: rgba(96, 92, 92, 0.04);
  cursor: pointer;
}

.v-icon {
  margin-right: 15px;
}
</style>
