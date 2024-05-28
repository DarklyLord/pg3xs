<template>
  <div id="app">
    <div class="background-container">
    <router-view/>
    <img src="../assets/logoTransparent.png" class="header-image header-image-logo-title" alt="Header1"/>
    <img src="../assets/logoName.png" class="header-image header-image-logo-name" alt="Header2"/>
    <div class="blue-stripe">
      <div>
        <label class="input-label1" for="email">Username</label>
        <input class="input-field1" type="text" id="email" v-model="userNameInput"/>
      </div>
      <div>
        <label class="input-label2" for="password">Password</label>
        <input class="input-field2" type="password" id="password" v-model="passWordInput"/>
      </div>
      <div class="button-group">
        <button class="sign-in-button" @click="authenticateInput">Sign In!</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'loginSite',
  data() {
    return {
      userNameInput: '',
      passWordInput: '',
      users: [
        {
          id:'user',
          userName: 'username',
          passWord: 'user1'
        },
        {
          id:'admin',
          userName: 'adminname',
          passWord: 'admin1'
        }
      ]

    }
  },
  methods: {
    authenticateInput() {
      this.users.forEach(user => {
        console.log(user);
        console.log(this.passWordInput)
        console.log(user.userName)
        console.log(this.passWordInput)
        console.log(user.passWord)
        if (this.userNameInput === user.userName && this.passWordInput=== user.passWord) {

          console.log('Success Admin');
          this.$router.replace('/test')
        }
      });
  }
  },
};
</script>

<style scoped>
/* Scoped styles for the root component */

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/loginSiteBackground.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.header-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin-bottom: 20px; /* Adjust margin as needed */
  position: absolute;
  top: 20%;
  left: 35%;
  width: 30%;
}

.header-image-logo-name {
  position: absolute;
  top: 2%;
  left: 80%;
  width: 20%;
  height: auto;
}

.blue-stripe {
  position: fixed;
  bottom: 30%; /* Adjust to position it 80% from the bottom */
  left: -1%; /* Center the stripe */
  width: 66%; /* Set width to 66% */
  height: 150px; /* Set height to auto to accommodate the content */
  background-color: #197c97;
  border-radius: 10px; /* Add rounded corners */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input-label1 {
  position: absolute;
  font-size: 25px;
  left: 58%;
  top: 12%;
  align-items: center;
  margin-bottom: 10px; /* Adjust margin between input groups */
  color: #fff;
}

.input-field1 {
  width: 30%; /* Set width to 20% */
  font-size: 15px;
  margin-left: 700px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.input-label2 {
  position: absolute;
  font-size: 25px;
  left: 58%;
  top: 40%;
  align-items: center;
  margin-bottom: 10px; /* Adjust margin between input groups */
  color: #fff;
}

.input-field2 {
  width: 30%; /* Set width to 20% */
  font-size: 15px;
  margin-left: 700px;
  margin-top: 5px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  outline: none;

}

.sign-in-button {
  margin-top: 5px; /* Adjust margin */
  width: 15%;
  margin-left: 875px;
  padding: 10px 20px; /* Adjust padding */
  border: none;
  border-radius: 5px;
  background-color: #5a5a5a;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
}

.sign-in-label {
  margin-left: 10px;
  color: #fff;
}
</style>

<style>
/* Global styles */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
