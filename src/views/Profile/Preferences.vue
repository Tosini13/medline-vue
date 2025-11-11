<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import { ref } from 'vue'

const preferences = ref({
  notifications: true,
  emailUpdates: true,
  language: 'en',
  timezone: 'America/New_York',
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  saving.value = false
  alert('Preferences updated successfully!')
}
</script>

<template>
  <Card>
    <h2 class="text-2xl font-semibold mb-6">Preferences</h2>

    <form @submit.prevent="handleSave" class="space-y-6">
      <div class="space-y-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text font-semibold">Push Notifications</span>
            <input
              v-model="preferences.notifications"
              type="checkbox"
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text font-semibold">Email Updates</span>
            <input
              v-model="preferences.emailUpdates"
              type="checkbox"
              class="toggle toggle-primary"
            />
          </label>
        </div>
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Language</span>
        </label>
        <select v-model="preferences.language" class="select select-bordered w-full ">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Timezone</span>
        </label>
        <select v-model="preferences.timezone" class="select select-bordered w-full ">
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Chicago">Central Time</option>
          <option value="America/Denver">Mountain Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
        </select>
      </div>

      <div class="flex justify-end">
        <AppButton type="submit" :loading="saving">
          Save Changes
        </AppButton>
      </div>
    </form>
  </Card>
</template>

