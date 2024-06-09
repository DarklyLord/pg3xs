<template>
  <div class="container">
    <div class="angled-bar"></div>

  <header class="under-c">Under Construction</header>
  <router-link class="routerl" to="/">Back</router-link>
  </div>
</template>
<script>

export default {
  name: 'YourComponentName',
}
</script>
<style scoped>
.under-c{
  color: #ff00f6;
  font-size: 30px;
}
.routerl{
  color: red;
  font-size: 30px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.angled-bar {
  position: relative;
  width: 300px; /* Adjust the width as needed */
  height: 50px;  /* Adjust the height as needed */
  background-color: blue;
  clip-path: polygon(0 0, 100% 0, calc(100% - 50px) 100%, 0 100%);
}
</style>