<template>
    <v-img 
      :src=logo_src
      :alt=logo_alt
    ></v-img>
</template>

<script lang="ts">
  export default {
    name: "AppLogo",
    data(){
      return {
        logo_src:"/img/PokeLabsLogo.png" as string,
        logo_alt:"Logo PokéLabs" as string
      }
    }
  }
</script>