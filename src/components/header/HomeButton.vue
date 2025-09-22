<template>
  <v-btn
    icon="mdi-home"
    size="large"
    @click="goHome"
  />
</template>

<script lang="ts">
export default {
  name: "HomeButton",
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>
