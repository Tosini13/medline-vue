<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { getAPI } from '@/services/mockData'
import type { LineType } from '@/types'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const api = getAPI()

const props = defineProps<{
  issueId: string
}>()

const line = ref<LineType | null>(null)
const loading = ref(true)

const loadLine = async () => {
  try {
    loading.value = true
    line.value = await api.lines.getById(props.issueId)
    if (!line.value) {
      router.push('/issues')
    }
  } catch (error) {
    console.error('Failed to load issue:', error)
    router.push('/issues')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadLine()
  // Redirect to overview if no child route is active
  if (route.path === `/issues/${props.issueId}`) {
    router.replace(`/issues/${props.issueId}/overview`)
  }
})

watch(() => props.issueId, () => {
  loadLine()
  router.replace(`/issues/${props.issueId}/overview`)
})

const tabs = [
  { name: 'IssueOverview', path: 'overview', icon: '📊', label: 'Overview' },
  { name: 'IssueTimeline', path: 'timeline', icon: '📅', label: 'Timeline' },
  { name: 'IssueDocuments', path: 'documents', icon: '📁', label: 'Documents' },
  { name: 'IssueNotes', path: 'notes', icon: '📝', label: 'Notes' },
  { name: 'EventsList', path: 'events', icon: '🏥', label: 'Events' },
]
</script>

<template>
  <AppLayout>
    <div v-if="loading" class="py-8">
      <LoadingSpinner text="Loading issue details..." />
    </div>

    <div v-else-if="line" class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <AppButton variant="ghost" @click="router.push('/issues')">
            ← Back
          </AppButton>
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            :style="{ backgroundColor: line.color }"
          >
            {{ line.title.charAt(0) }}
          </div>
          <div>
            <h1 class="text-4xl font-bold">{{ line.title }}</h1>
            <p v-if="line.description" class="text-base-content/70 mt-1">
              {{ line.description }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <AppButton @click="router.push(`/issues/${line.id}/events/new`)">
            ➕ New Event
          </AppButton>
          <AppButton variant="outline" @click="router.push(`/issues/${line.id}/edit`)">
            Edit
          </AppButton>
        </div>
      </div>

      <!-- Tabs -->
      <div class="glass-card p-2">
        <div class="flex gap-2 overflow-x-auto">
          <AppButton
            v-for="tab in tabs"
            :key="tab.path"
            :variant="route.name === tab.name ? 'primary' : 'ghost'"
            size="sm"
            @click="router.push(`/issues/${line.id}/${tab.path}`)"
          >
            <span class="mr-2">{{ tab.icon }}</span>
            {{ tab.label }}
          </AppButton>
        </div>
      </div>

      <!-- Child Route Content -->
      <RouterView :line="line" />
    </div>
  </AppLayout>
</template>

