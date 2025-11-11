<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import { ref } from 'vue'

const theme = ref({
  mode: 'light',
  accent: 'blue',
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  saving.value = false
  alert('Theme settings updated successfully!')
}
</script>

<template>
  <GlassCard>
    <h2 class="text-2xl font-semibold mb-6">Theme Settings</h2>

    <form @submit.prevent="handleSave" class="space-y-6">
      <div>
        <label class="label">
          <span class="label-text font-semibold">Theme Mode</span>
        </label>
        <select v-model="theme.mode" class="select select-bordered w-full glass">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto (System)</option>
        </select>
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Accent Color</span>
        </label>
        <div class="flex gap-3 mt-2">
          <button
            v-for="color in ['blue', 'green', 'purple', 'pink', 'orange']"
            :key="color"
            type="button"
            class="w-12 h-12 rounded-full border-4 transition-all"
            :class="theme.accent === color ? 'border-base-content scale-110' : 'border-transparent'"
            :style="{ backgroundColor: `var(--color-${color})` }"
            @click="theme.accent = color"
          ></button>
        </div>
      </div>

      <div class="flex justify-end">
        <AppButton type="submit" :loading="saving">
          Save Changes
        </AppButton>
      </div>
    </form>
  </GlassCard>
</template>

