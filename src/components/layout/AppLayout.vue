<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppButton from '../ui/AppButton.vue'

const route = useRoute()
const router = useRouter()

const navigation = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Issues', path: '/issues', icon: '🏥' },
  { name: 'Contacts', path: '/contacts', icon: '👥' },
  { name: 'Profile', path: '/profile', icon: '👤' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
  { name: 'About', path: '/about', icon: 'ℹ️' },
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="glass border-b border-white/20 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Medline
            </h1>
          </div>
          <nav class="hidden md:flex gap-2">
            <AppButton
              v-for="item in navigation"
              :key="item.path"
              :variant="isActive(item.path) ? 'primary' : 'ghost'"
              @click="router.push(item.path)"
            >
              <span class="mr-2">{{ item.icon }}</span>
              {{ item.name }}
            </AppButton>
          </nav>
          <div class="md:hidden">
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <ul tabindex="0" class="dropdown-content menu glass-card mt-3 w-52 p-2 shadow-xl z-[1]">
                <li v-for="item in navigation" :key="item.path">
                  <a
                    :class="{ active: isActive(item.path) }"
                    @click="router.push(item.path)"
                  >
                    <span>{{ item.icon }}</span>
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="glass border-t border-white/20 mt-auto">
      <div class="container mx-auto px-4 py-4 text-center text-sm opacity-70">
        <p>© 2024 Medline. Your health companion.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.active {
  @apply bg-primary text-primary-content;
}
</style>

