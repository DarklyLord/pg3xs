<template>
  <v-card class="v-card-user1 mx-auto my-8" variant="flat" color="primary">
    <v-card-item>
<!--      <label class="input">Email</label>-->
<!--      <input class="input-fields" type="email" v-model="editableEmail">-->
      <label>Firstname</label>
      <input class="input-fields" type="text" v-model="editableFirstName">
      <label>Last Name</label>
      <input class="input-fields" type="text" v-model="editableLastName">
      <label>Password</label>
      <input class="input-fields" type="text" v-model="editablePassword">
    </v-card-item>
    <v-card-actions>
      <button class="button-test" @click="updateUser">Save changes</button>
    </v-card-actions>
  </v-card>
 </template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "@/stores/userStore";
import axios from "@/services/axios";

export default {
  data() {
    return {
      responseData: null,
      editableEmail: '',
      editableFirstName: '',
      editableLastName: '',
      editablePassword: '',
    }
  },
  computed: {
    ...mapState(useUserStore, {
      userId: 'getUserId',
      userLevel: 'getUserLevel',
    })
  },
  methods: {
    async updateUser() {
      this.consolelogmodel()
      try {
        const updatedUserData = {
          ID: this.userId,
          FirstName: this.editableFirstName,
          LastName: this.editableLastName,
          Password: this.editablePassword,
          EmailAddress: this.editableEmail,
          AccessLevelID: this.userLevel,
        };

        await axios.put('/employees/' + this.userId, updatedUserData);

        console.log('User updated:', this.editableEmail);
      } catch (error) {
        console.error('Failed to update user:', error);
      }
      this.fetchData()
    },
    consolelogmodel(){
      console.log(this.userId)
      console.log(this.userLevel)
      console.log(this.editableEmail)
      console.log(this.editableFirstName)
      console.log(this.editableLastName)
      console.log(this.editablePassword)
    },
    async fetchData() {
      try {
        const response = await axios.get('/employees/' + this.userId, {},
        );
        this.responseData = response.data;
        console.log(this.responseData);
        this.editableEmail = response.data.EmailAddress;
        this.editableFirstName = response.data.FirstName;
        this.editableLastName = response.data.LastName;
        this.editablePassword = response.data.Password;
        console.log("Test "+this.editableEmail );
        // Handle the response data as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.label{
  margin-top: 10px;
}
.v-card-user1{

  justify-content: center;
  max-width: 800px;
}
.button-test{
  margin-left: 48%;
  margin-right: 3%;
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: #5a5a5a;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px;
}
.input-fields {
  padding-left: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  display: flex;
  border-radius: 5px;
  border: none;
  outline: none;
  color: black;
  background-color: rgba(255, 255, 255, 0.7)
}
</style>
