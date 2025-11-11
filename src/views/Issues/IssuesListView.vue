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
    console.error('Failed to load issues:', error)
  } finally {
    loading.value = false
  }
})

const handleDelete = async (lineId: string, event: Event) => {
  event.stopPropagation()
  if (confirm('Are you sure you want to delete this issue?')) {
    try {
      await api.lines.delete(lineId)
      lines.value = lines.value.filter(l => l.id !== lineId)
    } catch (error) {
      console.error('Failed to delete issue:', error)
      alert('Failed to delete issue')
    }
  }
}
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Health Issues
        </h1>
        <AppButton @click="router.push('/issues/new')">
          ➕ New Issue
        </AppButton>
      </div>

      <LoadingSpinner v-if="loading" text="Loading issues..." />

      <div v-else-if="lines.length === 0" class="card text-center py-12">
        <p class="text-xl mb-4">No health issues yet</p>
        <AppButton @click="router.push('/issues/new')">
          Create Your First Issue
        </AppButton>
      </div>

      <div v-else class="space-y-4">
        <Card
          v-for="line in lines"
          :key="line.id"
          hover
          class="cursor-pointer"
          @click="router.push(`/issues/${line.id}`)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1">
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                :style="{ backgroundColor: line.color }"
              >
                {{ line.title.charAt(0) }}
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-semibold mb-1">{{ line.title }}</h3>
                <p v-if="line.description" class="text-base-content/70">
                  {{ line.description }}
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <AppButton
                variant="ghost"
                size="sm"
                @click.stop="router.push(`/issues/${line.id}/edit`)"
              >
                Edit
              </AppButton>
              <AppButton
                variant="ghost"
                size="sm"
                @click.stop="handleDelete(line.id, $event)"
              >
                🗑️
              </AppButton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

