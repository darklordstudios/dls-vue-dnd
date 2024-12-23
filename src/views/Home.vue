<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<script>
import { defineComponent } from "vue";
import { useAuthStore } from '../stores/auth-store.js'

const authStore = useAuthStore();

export default defineComponent({
  name: "Home",
  data() {
    return {
      user: null,
      isAuthenticated: false
    };
  },
  mounted() {
    console.log("Home USER: " + authStore.user)
    if (authStore.isAuthenticated) {
      this.isAuthenticated = true
      this.user = authStore.user
    }
  }
});
</script>

<template>
  <div v-if="isAuthenticated">Welcome {{ user.email }}</div>
  <div v-else>Welcome Boo</div>
</template>
