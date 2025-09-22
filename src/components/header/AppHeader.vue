<template>
  <v-app-bar color="red-accent-4" elevate :elevation="24" class="pa-2 d-flex justify-space-between align-center">
    <HeaderLogo/>
    <HeaderIcons/>
  </v-app-bar>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
};
</script>
