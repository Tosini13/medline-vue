<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import { ref } from 'vue'

const form = ref({
  email: 'user@example.com',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const saving = ref(false)

const handleSave = async () => {
  if (form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  saving.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  saving.value = false
  alert('Account settings updated successfully!')
}

const handleDeleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
    alert('Account deletion requested (not implemented)')
  }
}
</script>

<template>
  <Card>
    <h2 class="text-2xl font-semibold mb-6">Account Settings</h2>

    <form @submit.prevent="handleSave" class="space-y-6">
      <div>
        <label class="label">
          <span class="label-text font-semibold">Email</span>
        </label>
        <input
          v-model="form.email"
          type="email"
          class="input input-bordered w-full "
        />
      </div>

      <div class="divider">Change Password</div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Current Password</span>
        </label>
        <input
          v-model="form.currentPassword"
          type="password"
          class="input input-bordered w-full "
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">New Password</span>
        </label>
        <input
          v-model="form.newPassword"
          type="password"
          class="input input-bordered w-full "
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Confirm New Password</span>
        </label>
        <input
          v-model="form.confirmPassword"
          type="password"
          class="input input-bordered w-full "
        />
      </div>

      <div class="flex justify-end">
        <AppButton type="submit" :loading="saving">
          Save Changes
        </AppButton>
      </div>
    </form>

    <div class="divider"></div>

    <div>
      <h3 class="text-lg font-semibold mb-4 text-error">Danger Zone</h3>
      <AppButton variant="error" @click="handleDeleteAccount">
        Delete Account
      </AppButton>
    </div>
  </Card>
</template>

