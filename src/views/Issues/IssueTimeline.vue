<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import EventTypeBadge from '@/components/ui/EventTypeBadge.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { getAPI } from '@/services/mockData'
import type { EventType, LineType } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  line: LineType
}>()

const router = useRouter()
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

const sortedEvents = computed(() => {
  return [...events.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <Card>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Timeline</h2>
      <AppButton @click="router.push(`/issues/${line.id}/events/new`)">
        ➕ Add Event
      </AppButton>
    </div>

    <LoadingSpinner v-if="loading" text="Loading timeline..." />

    <div v-else-if="sortedEvents.length === 0" class="text-center py-12 text-base-content/70">
      <p class="text-xl mb-4">No events in timeline</p>
      <AppButton @click="router.push(`/issues/${line.id}/events/new`)">
        Add Your First Event
      </AppButton>
    </div>

    <div v-else class="relative">
      <!-- Timeline line -->
      <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent opacity-30"></div>

      <!-- Timeline items -->
      <div class="space-y-6">
        <div
          v-for="(event, index) in sortedEvents"
          :key="event.id"
          class="relative flex gap-4"
        >
          <!-- Timeline dot -->
          <div
            class="relative z-10 w-16 h-16 rounded-full  flex items-center justify-center flex-shrink-0"
            :style="{ backgroundColor: line.color + '40' }"
          >
            <div
              class="w-10 h-10 rounded-full"
              :style="{ backgroundColor: line.color }"
            ></div>
          </div>

          <!-- Event content -->
          <div class="flex-1 card p-4 cursor-pointer" @click="router.push(`/issues/${line.id}/events/${event.id}`)">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-semibold">{{ event.title }}</h3>
              <EventTypeBadge :type="event.type" />
            </div>
            <p class="text-sm text-base-content/70 mb-2">
              {{ new Date(event.date).toLocaleString() }}
            </p>
            <p class="text-base-content/80">{{ event.description }}</p>
            <div v-if="event.documents && event.documents.length > 0" class="mt-2 flex gap-2">
              <span class="badge badge-sm ">📁 {{ event.documents.length }} document(s)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

