<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
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
  description: '',
  color: '#3B82F6',
})

const colors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
  '#8B5CF6', '#EC4899', '#06B6D4', '#F97316',
]

onMounted(async () => {
  try {
    line.value = await api.lines.getById(props.issueId)
    if (!line.value) {
      router.push('/issues')
      return
    }
    form.value = {
      title: line.value.title,
      description: line.value.description || '',
      color: line.value.color,
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
    await api.lines.update(props.issueId, {
      title: form.value.title,
      description: form.value.description || undefined,
      color: form.value.color,
      ownerId: line.value!.ownerId,
    })
    router.push(`/issues/${props.issueId}`)
  } catch (error) {
    console.error('Failed to update issue:', error)
    alert('Failed to update issue')
  } finally {
    saving.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this issue? This cannot be undone.')) {
    return
  }

  try {
    await api.lines.delete(props.issueId)
    router.push('/issues')
  } catch (error) {
    console.error('Failed to delete issue:', error)
    alert('Failed to delete issue')
  }
}
</script>

<template>
  <AppLayout>
    <div v-if="loading" class="py-8">
      <LoadingSpinner text="Loading issue..." />
    </div>

    <div v-else class="max-w-2xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <AppButton variant="ghost" @click="router.push(`/issues/${issueId}`)">
          ← Back
        </AppButton>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Edit Issue
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
              required
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text font-semibold">Description</span>
            </label>
            <textarea
              v-model="form.description"
              class="textarea textarea-bordered w-full glass"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label class="label">
              <span class="label-text font-semibold">Color</span>
            </label>
            <div class="flex gap-3 flex-wrap">
              <button
                v-for="color in colors"
                :key="color"
                type="button"
                class="w-12 h-12 rounded-full border-4 transition-all"
                :class="form.color === color ? 'border-base-content scale-110' : 'border-transparent'"
                :style="{ backgroundColor: color }"
                @click="form.color = color"
              ></button>
            </div>
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
                @click="router.push(`/issues/${issueId}`)"
              >
                Cancel
              </AppButton>
              <AppButton type="submit" :loading="saving">
                Save Changes
              </AppButton>
            </div>
          </div>
        </form>
      </GlassCard>
    </div>
  </AppLayout>
</template>

