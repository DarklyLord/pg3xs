<template>
  <div id="app">
    <!-- Your component content here -->
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
</template>

<script>
import backgroundImage from '@/assets/loginSiteBackground.png';


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
  mounted() {
    // Set background image for the entire page
    document.documentElement.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Set up the blue stripe at 80% of the site's height
    const blueStripe = document.createElement('div');
    blueStripe.classList.add('blue-stripe');
    document.body.appendChild(blueStripe);
  }
};
</script>

<style scoped>
/* Scoped styles for the root component */
#app {
  position: relative;
}

.header-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin-bottom: 20px; /* Adjust margin as needed */
  position: absolute;
}

.header-image-logo-title {
  position: fixed;
  top: 20%;
  left: 35%;
  width: 30%;
  height: auto;
}

.header-image-logo-name {
  position: fixed;
  top: 2%;
  right: 0;
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
</style>