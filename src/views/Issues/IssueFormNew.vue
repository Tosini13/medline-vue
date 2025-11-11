<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import { getAPI } from '@/services/mockData'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const api = getAPI()

const form = ref({
  title: '',
  description: '',
  color: '#3B82F6',
})

const loading = ref(false)

const colors = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
]

const handleSubmit = async () => {
  if (!form.value.title.trim()) {
    alert('Please enter a title')
    return
  }

  try {
    loading.value = true
    const newLine = await api.lines.add({
      title: form.value.title,
      description: form.value.description || undefined,
      color: form.value.color,
    })
    router.push(`/issues/${newLine.id}`)
  } catch (error) {
    console.error('Failed to create issue:', error)
    alert('Failed to create issue')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLayout>
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <AppButton variant="ghost" @click="router.push('/issues')">
          ← Back
        </AppButton>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          New Health Issue
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
              placeholder="e.g., Diabetes Management"
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
              placeholder="Optional description"
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

          <div class="flex gap-4 justify-end">
            <AppButton
              type="button"
              variant="ghost"
              @click="router.push('/issues')"
            >
              Cancel
            </AppButton>
            <AppButton type="submit" :loading="loading">
              Create Issue
            </AppButton>
          </div>
        </form>
      </GlassCard>
    </div>
  </AppLayout>
</template>

