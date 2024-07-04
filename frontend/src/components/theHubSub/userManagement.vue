<template>
  <div v-if="checkAccess()">
    <h1>Test</h1>2
  </div>

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
        console.log("SelectorHub")
        return true

      }
    }
  }
}
</script>

<style scoped>
.h1 {

}
</style>
