<template>
  <v-list>
    <v-list-item @click="gotoTimeManagement"><v-icon>mdi-text-box-search-outline</v-icon>Timetable Management</v-list-item>
    <v-list-item @click="gotoUserSettings"><v-icon>mdi-account</v-icon>User Settings</v-list-item>
    <v-list-item @click="gotoUserManagement"><v-icon>mdi-tools</v-icon>User Management</v-list-item>
  </v-list>
</template>

<script>
export default{
  methods:{
    gotoTimeManagement(){
      this.$router.push('/hub/timeManagement')
    },
    gotoUserSettings(){
      this.$router.push('/hub/userSettings')
    },
    gotoUserManagement(){
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
.v-icon{
  margin-right: 15px;
}
</style>
