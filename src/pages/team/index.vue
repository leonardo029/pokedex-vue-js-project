<template>
  <div class="d-flex flex-column align-center mx-auto my-12" style="max-width: 1200px">
    <h1 class="text-center font-weight-bold display-1 text-primary" style="font-size: 3rem;">
      Your Pokémon Team
    </h1>

    <p class="text-center text-subtitle- mb-12 text-grey">
      Manage your team and check your Pokémon stats
    </p>

    <PokemonCard/>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TeamPage',
  };
</script>