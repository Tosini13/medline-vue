<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { getAPI } from '@/services/mockData'
import type { EventType, LineType } from '@/types'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  line: LineType
}>()

const api = getAPI()
const events = ref<EventType[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    events.value = await api.events.get(props.line.id)
  } catch (error) {
    console.error('Failed to load events:', error)
  } finally {
    loading.value = false
  }
})

const recentEvents = computed(() => {
  return events.value
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
})

const upcomingEvents = computed(() => {
  const now = new Date()
  return events.value
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
})
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div class="text-center">
          <div class="text-4xl font-bold text-primary">{{ events.length }}</div>
          <div class="text-base-content/70 mt-2">Total Events</div>
        </div>
      </Card>
      <Card>
        <div class="text-center">
          <div class="text-4xl font-bold text-info">{{ upcomingEvents.length }}</div>
          <div class="text-base-content/70 mt-2">Upcoming Events</div>
        </div>
      </Card>
      <Card>
        <div class="text-center">
          <div class="text-4xl font-bold text-accent">
            {{ events.filter(e => e.documents && e.documents.length > 0).length }}
          </div>
          <div class="text-base-content/70 mt-2">Documents</div>
        </div>
      </Card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Events -->
      <Card>
        <h2 class="text-2xl font-semibold mb-4">Recent Events</h2>
        <LoadingSpinner v-if="loading" size="sm" />
        <div v-else-if="recentEvents.length === 0" class="text-center py-8 text-base-content/70">
          No events yet
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="event in recentEvents"
            :key="event.id"
            class="p-4 -dark rounded-lg"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold">{{ event.title }}</h3>
              <span class="text-sm text-base-content/70">
                {{ new Date(event.date).toLocaleDateString() }}
              </span>
            </div>
            <p class="text-sm text-base-content/70">{{ event.description }}</p>
          </div>
        </div>
      </Card>

      <!-- Upcoming Events -->
      <Card>
        <h2 class="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <LoadingSpinner v-if="loading" size="sm" />
        <div v-else-if="upcomingEvents.length === 0" class="text-center py-8 text-base-content/70">
          No upcoming events
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
            class="p-4 -dark rounded-lg"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold">{{ event.title }}</h3>
              <span class="text-sm text-base-content/70">
                {{ new Date(event.date).toLocaleDateString() }}
              </span>
            </div>
            <p class="text-sm text-base-content/70">{{ event.description }}</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

