<template>
  <div
    class="d-flex flex-row align-center"
    style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); align-items: center;"
  >
    <SearchButton/>
    <TeamButton />
    <HomeButton />
  </div>
</template>

<script lang="ts">
export default {
  name: "HeaderIcons",
};
</script>

<style>
  .v-input__details {
    grid-area: auto;
  }
</style>