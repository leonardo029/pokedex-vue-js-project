<template>
  <v-img 
    :src=logo_src
    :alt=logo_alt
    height="70"
    class="cursor-pointer"
    @click="goHome"
  />
</template>

<script lang="ts">
  export default {
    name: "HeaderLogo",
    data(){
      return {
        logo_src:"/img/PokeLabsLogo.png" as string,
        logo_alt:"Logo PokéLabs" as string
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  }
</script>