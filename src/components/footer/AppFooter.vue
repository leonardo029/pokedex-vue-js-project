<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="red-accent-4">
    <div class="d-flex ga-3">
      <v-btn
        v-for="item in icons"
        :key="item.name"
        :icon="item.icon"
        :href="item.link"
        target="_blank"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <div class="text-caption font-weight-regular opacity-90 text-center">
      <p>
        This project is a Pokédex simulation created solely for educational and illustrative purposes.
      </p>
      <p>
        It is a fan-made work and has no official affiliation with, or endorsement from, Nintendo, Game Freak, or The Pokémon Company.
      </p>
      <p>
        All Pokémon names, images, and related content are trademarks of their respective owners.
      </p>
    </div>

    <v-divider></v-divider>

    <div>
      &copy; {{ new Date().getFullYear() }} - <strong>PokéLabs</strong>
    </div>
  </v-footer>
</template>

<script lang="ts">

  import type { IIconItem } from '@/interfaces';

  export default {
    name: "AppFooter",
    data(): { icons: IIconItem[] } {
      return {
        icons: [
          { name: 'GitHub', icon: 'mdi-github', link: 'https://github.com/leonardo029/pokedex-vue-js-project' },
          { name: 'LinkedIn', icon: 'mdi-linkedin', link: 'https://br.linkedin.com/in/leonardo029' },
        ]
      }
    }
  }
</script>