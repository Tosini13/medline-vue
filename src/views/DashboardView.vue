<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { getAPI } from '@/services/mockData'
import type { LineType } from '@/types'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const api = getAPI()
const lines = ref<LineType[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    lines.value = await api.lines.get()
  } catch (error) {
    console.error('Failed to load lines:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dashboard
        </h1>
        <AppButton @click="router.push('/issues/new')">
          ➕ New Issue
        </AppButton>
      </div>

      <LoadingSpinner v-if="loading" text="Loading your health issues..." />

      <div v-else-if="lines.length === 0" class="card text-center py-12">
        <p class="text-xl mb-4">No health issues yet</p>
        <AppButton @click="router.push('/issues/new')">
          Create Your First Issue
        </AppButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="line in lines"
          :key="line.id"
          hover
          class="cursor-pointer"
          @click="router.push(`/issues/${line.id}`)"
        >
          <div class="flex items-start justify-between mb-4">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
              :style="{ backgroundColor: line.color }"
            >
              {{ line.title.charAt(0) }}
            </div>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ line.title }}</h3>
          <p v-if="line.description" class="text-base-content/70 mb-4">
            {{ line.description }}
          </p>
          <div class="flex justify-end">
            <AppButton variant="ghost" size="sm">View Details →</AppButton>
          </div>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

