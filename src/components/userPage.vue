<template>
    <div class="angled-bar"></div>
    <header class="under-c">Under Construction</header>
    <router-link class="routerl" to="/">Back</router-link>
</template>
<script>

export default {
  name: 'YourComponentName',
}
</script>
<style scoped>
.under-c{
  color: #ff00f6;
  font-size: 20px;
}
.routerl{
  color: red;
  font-size: 20px;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.angled-bar {
  position: absolute; /* Make the bar fill the top left of the viewport */
  top: 1%; /* Center vertically */
  left: 0; /* Align to the left */
  transform: translateY(-50%); /* Adjust for perfect vertical center */
  width: 90%; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
  background-color: #197c97;
  clip-path: polygon(0 0, 100% 0, calc(100% - 50px) 100%, 0 100%);
}
</style>