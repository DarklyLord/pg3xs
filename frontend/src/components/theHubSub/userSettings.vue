<template>
  <v-card class="v-card-user1 mx-auto my-8" variant="flat" color="primary">
    <v-card-item>
      <label>Email</label>
      <input class="input-fields" type="email" v-model="editableEmail">
      <label>Firstname</label>
      <input class="input-fields" type="text" v-model="editableFirstName">
      <label>Last Name</label>
      <input class="input-fields" type="text" v-model="editableLastName">
      <label>Password</label>
      <input class="input-fields" type="text" v-model="editablePassword">

    </v-card-item>
    <v-card-actions>
      <button class="button-test" @click="consolelogmodel">Testing</button>
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
    })
  },
  methods: {
    consolelogmodel(){
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
.v-card-user1{

  justify-content: center;
  max-width: 800px;
}
.button-test{
  margin-left: 70%;
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: #5a5a5a;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
}
.input-fields {

  font-size: 20px;
  display: flex;
  border-radius: 5px;
  border: none;
  outline: none;
  color: black;
  background-color: white;
}
</style>
