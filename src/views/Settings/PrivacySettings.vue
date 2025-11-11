<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import { ref } from 'vue'

const privacy = ref({
  dataSharing: false,
  analytics: false,
  marketing: false,
  publicProfile: false,
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  saving.value = false
  alert('Privacy settings updated successfully!')
}
</script>

<template>
  <GlassCard>
    <h2 class="text-2xl font-semibold mb-6">Privacy Settings</h2>

    <form @submit.prevent="handleSave" class="space-y-6">
      <div class="space-y-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <div>
              <span class="label-text font-semibold">Allow Data Sharing</span>
              <p class="text-sm text-base-content/70">Allow sharing anonymized data for research</p>
            </div>
            <input
              v-model="privacy.dataSharing"
              type="checkbox"
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <div>
              <span class="label-text font-semibold">Analytics Tracking</span>
              <p class="text-sm text-base-content/70">Help improve the app by sharing usage data</p>
            </div>
            <input
              v-model="privacy.analytics"
              type="checkbox"
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <div>
              <span class="label-text font-semibold">Marketing Communications</span>
              <p class="text-sm text-base-content/70">Receive updates and promotional emails</p>
            </div>
            <input
              v-model="privacy.marketing"
              type="checkbox"
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <div>
              <span class="label-text font-semibold">Public Profile</span>
              <p class="text-sm text-base-content/70">Make your profile visible to others</p>
            </div>
            <input
              v-model="privacy.publicProfile"
              type="checkbox"
              class="toggle toggle-primary"
            />
          </label>
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

