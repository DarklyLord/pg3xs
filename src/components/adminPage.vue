<template>
  <div class="headerDiv">
    <img src="../assets/logo.png" class="logoImg" alt="header3">
    <div class="angled-bar">
      <button class="fa-home">Test</button>
    </div>
  </div>
  <header class="under-c">Under Construction</header>
  <router-link class="routerl" to="/">Back</router-link>
<div>

</div>
</template>
<script>

export default {
  name: 'YourComponentName',
}
</script>
<style scoped>
.backgroundContainer {
}

.under-c {
  color: #ff00f6;
  font-size: 20px;
}

.routerl {
  color: red;
  font-size: 20px;
}

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.logoImg {
  position: fixed;
  top: 0%;
  left: 95%;
  height: 10%;
  width: auto;
}

.headerDiv {
  position: absolute;
  width: 101%; /* Adjust width as needed, slightly larger than the bar */
  height: 2%; /* Double the height of the blue bar */
  left: 0;
  box-shadow: -5px 6px 5px 0 rgba(0, 0, 0, 0.50),
  0 -2px 0 0 rgba(0, 0, 0, 0.10) inset;
}

.angled-bar {
  position: fixed; /* Make the bar fill the top left of the viewport */
  top: 2.5%; /* Center vertically */
  left: 0; /* Align to the left */
  margin-top: 0;
  padding-top: 0;
  box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.24) inset;
  transform: translateY(-50%); /* Adjust for perfect vertical center */
  width: 94%; /* Adjust the width as needed */
  height: 40px; /* Adjust the height as needed */
  background-color: #197c97;
  clip-path: polygon(0 0, 100% 0, calc(100% - 50px) 100%, 0 100%);
}
</style>