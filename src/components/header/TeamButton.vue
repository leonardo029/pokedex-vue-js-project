<template>
  <v-btn
    icon="mdi-account-group"
    size="large"
    @click="goHome"
  />
</template>

<script lang="ts">
export default {
  name: "TeamButton",
  methods: {
    goHome() {
      this.$router.push('/team');
    }
  }
}
</script>
