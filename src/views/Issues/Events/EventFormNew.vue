<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { eventType } from '@/constants'
import { getAPI } from '@/services/mockData'
import type { LineType } from '@/types'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const api = getAPI()

const props = defineProps<{
  issueId: string
}>()

const line = ref<LineType | null>(null)
const loading = ref(true)
const saving = ref(false)

const form = ref({
  title: '',
  date: new Date().toISOString().slice(0, 16),
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
    if (!line.value) {
      router.push('/issues')
    }
  } catch (error) {
    console.error('Failed to load issue:', error)
    router.push('/issues')
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
    const newEvent = await api.events.add(props.issueId, {
      title: form.value.title,
      date: new Date(form.value.date).toISOString(),
      description: form.value.description,
      type: form.value.type,
    }, [])
    router.push(`/issues/${props.issueId}/events/${newEvent.id}`)
  } catch (error) {
    console.error('Failed to create event:', error)
    alert('Failed to create event')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <AppLayout>
    <div v-if="loading" class="py-8">
      <LoadingSpinner text="Loading..." />
    </div>

    <div v-else class="max-w-2xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <AppButton variant="ghost" @click="router.push(`/issues/${issueId}/events`)">
          ← Back
        </AppButton>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          New Event
        </h1>
      </div>

      <GlassCard>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="label">
              <span class="label-text font-semibold">Title *</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              class="input input-bordered w-full glass"
              placeholder="e.g., Blood Test"
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
              class="input input-bordered w-full glass"
              required
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text font-semibold">Type *</span>
            </label>
            <select v-model="form.type" class="select select-bordered w-full glass" required>
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
              class="textarea textarea-bordered w-full glass"
              placeholder="Optional description"
              rows="4"
            ></textarea>
          </div>

          <div class="flex gap-4 justify-end">
            <AppButton
              type="button"
              variant="ghost"
              @click="router.push(`/issues/${issueId}/events`)"
            >
              Cancel
            </AppButton>
            <AppButton type="submit" :loading="saving">
              Create Event
            </AppButton>
          </div>
        </form>
      </GlassCard>
    </div>
  </AppLayout>
</template>

