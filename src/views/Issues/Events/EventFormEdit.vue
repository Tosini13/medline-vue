<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { eventType } from '@/constants'
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
const saving = ref(false)

const form = ref({
  title: '',
  date: '',
  description: '',
  type: eventType.appointment,
})

const eventTypes = [
  { value: eventType.appointment, label: 'Appointment', icon: '📅' },
  { value: eventType.test, label: 'Test', icon: '🧪' },
  { value: eventType.surgery, label: 'Surgery', icon: '🏥' },
  { value: eventType.occurrence, label: 'Occurrence', icon: '⚠️' },
  { value: eventType.other, label: 'Other', icon: '📝' },
]

onMounted(async () => {
  try {
    line.value = await api.lines.getById(props.issueId)
    event.value = await api.events.getById(props.issueId, props.eventId)
    if (!event.value || !line.value) {
      router.push(`/issues/${props.issueId}/events`)
      return
    }
    form.value = {
      title: event.value.title,
      date: new Date(event.value.date).toISOString().slice(0, 16),
      description: event.value.description,
      type: event.value.type,
    }
  } catch (error) {
    console.error('Failed to load event:', error)
    router.push(`/issues/${props.issueId}/events`)
  } finally {
    loading.value = false
  }
})

const handleSubmit = async () => {
  if (!form.value.title.trim()) {
    alert('Please enter a title')
    return
  }

  try {
    saving.value = true
    await api.events.update(props.issueId, props.eventId, {
      title: form.value.title,
      date: new Date(form.value.date).toISOString(),
      description: form.value.description,
      type: form.value.type,
    }, [], [])
    router.push(`/issues/${props.issueId}/events/${props.eventId}`)
  } catch (error) {
    console.error('Failed to update event:', error)
    alert('Failed to update event')
  } finally {
    saving.value = false
  }
}

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
  <AppLayout>
    <div v-if="loading" class="py-8">
      <LoadingSpinner text="Loading event..." />
    </div>

    <div v-else class="max-w-2xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <AppButton variant="ghost" @click="router.push(`/issues/${issueId}/events/${eventId}`)">
          ← Back
        </AppButton>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Edit Event
        </h1>
      </div>

      <Card>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="label">
              <span class="label-text font-semibold">Title *</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              class="input input-bordered w-full "
              required
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text font-semibold">Date & Time *</span>
            </label>
            <input
              v-model="form.date"
              type="datetime-local"
              class="input input-bordered w-full "
              required
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text font-semibold">Type *</span>
            </label>
            <select v-model="form.type" class="select select-bordered w-full " required>
              <option
                v-for="type in eventTypes"
                :key="type.value"
                :value="type.value"
              >
                {{ type.icon }} {{ type.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="label">
              <span class="label-text font-semibold">Description</span>
            </label>
            <textarea
              v-model="form.description"
              class="textarea textarea-bordered w-full "
              rows="4"
            ></textarea>
          </div>

          <div class="flex gap-4 justify-between">
            <AppButton
              type="button"
              variant="error"
              @click="handleDelete"
            >
              🗑️ Delete
            </AppButton>
            <div class="flex gap-4">
              <AppButton
                type="button"
                variant="ghost"
                @click="router.push(`/issues/${issueId}/events/${eventId}`)"
              >
                Cancel
              </AppButton>
              <AppButton type="submit" :loading="saving">
                Save Changes
              </AppButton>
            </div>
          </div>
        </form>
      </Card>
    </div>
  </AppLayout>
</template>

