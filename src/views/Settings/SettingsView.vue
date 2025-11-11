<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { name: 'Account', path: 'account', icon: '👤' },
  { name: 'Privacy', path: 'privacy', icon: '🔒' },
  { name: 'Theme', path: 'theme', icon: '🎨' },
]
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Settings
        </h1>
      </div>

      <!-- Tabs -->
      <GlassCard padding="none">
        <div class="flex gap-2 p-2">
          <AppButton
            v-for="tab in tabs"
            :key="tab.path"
            :variant="route.name === `Settings${tab.name}` ? 'primary' : 'ghost'"
            size="sm"
            @click="router.push(`/settings/${tab.path}`)"
          >
            <span class="mr-2">{{ tab.icon }}</span>
            {{ tab.name }}
          </AppButton>
        </div>
      </GlassCard>

      <!-- Child Route Content -->
      <RouterView />
    </div>
  </AppLayout>
</template>

