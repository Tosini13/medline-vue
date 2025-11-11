<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import EventTypeBadge from '@/components/ui/EventTypeBadge.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { getAPI } from '@/services/mockData'
import type { EventType, LineType } from '@/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const api = getAPI()

const props = defineProps<{
  issueId: string
  eventId: string
}>()

const event = ref<EventType | null>(null)
const line = ref<LineType | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    line.value = await api.lines.getById(props.issueId)
    event.value = await api.events.getById(props.issueId, props.eventId)
    if (!event.value || !line.value) {
      router.push(`/issues/${props.issueId}`)
    }
  } catch (error) {
    console.error('Failed to load event:', error)
    router.push(`/issues/${props.issueId}`)
  } finally {
    loading.value = false
  }
})

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this event?')) {
    return
  }

  try {
    await api.events.delete(props.issueId, props.eventId)
    router.push(`/issues/${props.issueId}/events`)
  } catch (error) {
    console.error('Failed to delete event:', error)
    alert('Failed to delete event')
  }
}
</script>

<template>
    <div v-if="loading" class="py-8">
      <LoadingSpinner text="Loading event..." />
    </div>

    <div v-else-if="event && line" class="max-w-3xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <AppButton variant="ghost" @click="router.push(`/issues/${issueId}/events`)">
          ← Back
        </AppButton>
        <h1 class="text-4xl font-bold">{{ event.title }}</h1>
      </div>

      <Card>
        <div class="space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <EventTypeBadge :type="event.type" />
              <p class="text-lg text-base-content/70 mt-2">
                {{ new Date(event.date).toLocaleString() }}
              </p>
            </div>
            <div class="flex gap-2">
              <AppButton
                variant="outline"
                @click="router.push(`/issues/${issueId}/events/${eventId}/edit`)"
              >
                Edit
              </AppButton>
              <AppButton variant="error" @click="handleDelete">
                🗑️ Delete
              </AppButton>
            </div>
          </div>

          <div>
            <h3 class="font-semibold mb-2">Description</h3>
            <p class="text-base-content/80 whitespace-pre-wrap">{{ event.description }}</p>
          </div>

          <div v-if="event.documents && event.documents.length > 0">
            <h3 class="font-semibold mb-4">Documents</h3>
            <div class="space-y-2">
              <div
                v-for="doc in event.documents"
                :key="doc.path"
                class="-dark p-4 rounded-lg flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">📄</span>
                  <div>
                    <p class="font-semibold">{{ doc.name }}</p>
                    <p class="text-sm text-base-content/70">{{ doc.type || 'Unknown type' }}</p>
                  </div>
                </div>
                <AppButton variant="ghost" size="sm">📥 Download</AppButton>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
</template>

