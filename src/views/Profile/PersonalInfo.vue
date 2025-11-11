<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import { ref } from 'vue'

const form = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1980-01-01',
  address: '123 Main St, City, State 12345',
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  // Simulate save
  await new Promise(resolve => setTimeout(resolve, 500))
  saving.value = false
  alert('Profile updated successfully!')
}
</script>

<template>
  <Card>
    <h2 class="text-2xl font-semibold mb-6">Personal Information</h2>

    <form @submit.prevent="handleSave" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="label">
            <span class="label-text font-semibold">First Name</span>
          </label>
          <input
            v-model="form.firstName"
            type="text"
            class="input input-bordered w-full "
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text font-semibold">Last Name</span>
          </label>
          <input
            v-model="form.lastName"
            type="text"
            class="input input-bordered w-full "
          />
        </div>

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

        <div>
          <label class="label">
            <span class="label-text font-semibold">Phone</span>
          </label>
          <input
            v-model="form.phone"
            type="tel"
            class="input input-bordered w-full "
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text font-semibold">Date of Birth</span>
          </label>
          <input
            v-model="form.dateOfBirth"
            type="date"
            class="input input-bordered w-full "
          />
        </div>
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Address</span>
        </label>
        <textarea
          v-model="form.address"
          class="textarea textarea-bordered w-full "
          rows="2"
        ></textarea>
      </div>

      <div class="flex justify-end">
        <AppButton type="submit" :loading="saving">
          Save Changes
        </AppButton>
      </div>
    </form>
  </Card>
</template>

