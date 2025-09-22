/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import pinia from '@/stores'
import { useTeamPokemonStore } from '@/stores/useTeamPokemonStore'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)
app.use(pinia)

const teamStore = useTeamPokemonStore()
teamStore.setupPersistence()

registerPlugins(app)

app.mount('#app')
