<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { getAPI } from '@/services/mockData'
import type { DocumentType, EventType, LineType } from '@/types'
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
    console.error('Failed to load documents:', error)
  } finally {
    loading.value = false
  }
})

const allDocuments = computed(() => {
  const docs: Array<DocumentType & { eventId: string; eventTitle: string }> = []
  events.value.forEach(event => {
    if (event.documents) {
      event.documents.forEach(doc => {
        docs.push({
          ...doc,
          eventId: event.id,
          eventTitle: event.title,
        })
      })
    }
  })
  return docs
})
</script>

<template>
  <Card>
    <h2 class="text-2xl font-semibold mb-6">Documents</h2>

    <LoadingSpinner v-if="loading" text="Loading documents..." />

    <div v-else-if="allDocuments.length === 0" class="text-center py-12 text-base-content/70">
      <p class="text-xl mb-2">No documents yet</p>
      <p class="text-sm">Documents will appear here when added to events</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="doc in allDocuments"
        :key="doc.path"
        class="-dark p-4 rounded-lg flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg  flex items-center justify-center text-2xl">
            📄
          </div>
          <div>
            <h3 class="font-semibold">{{ doc.name }}</h3>
            <p class="text-sm text-base-content/70">From: {{ doc.eventTitle }}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm btn-ghost">📥 Download</button>
        </div>
      </div>
    </div>
  </Card>
</template>

