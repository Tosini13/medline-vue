<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <AppLayout>
    <div class="max-w-2xl mx-auto text-center space-y-6 py-12">
      <div class="text-9xl font-bold opacity-20">404</div>
      <GlassCard>
        <h1 class="text-4xl font-bold mb-4">Page Not Found</h1>
        <p class="text-base-content/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="flex gap-4 justify-center">
          <AppButton @click="router.push('/')">
            Go to Dashboard
          </AppButton>
          <AppButton variant="ghost" @click="router.back()">
            Go Back
          </AppButton>
        </div>
      </GlassCard>
    </div>
  </AppLayout>
</template>

