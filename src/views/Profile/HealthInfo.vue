<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import { ref } from 'vue'

const form = ref({
  bloodType: 'O+',
  allergies: 'Peanuts, Shellfish',
  medications: 'Metformin, Lisinopril',
  emergencyContact: 'Jane Doe - +1 (555) 987-6543',
  insurance: 'Health Insurance Co. - Policy #123456789',
})

const saving = ref(false)

const handleSave = async () => {
  saving.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  saving.value = false
  alert('Health information updated successfully!')
}
</script>

<template>
  <Card>
    <h2 class="text-2xl font-semibold mb-6">Health Information</h2>

    <form @submit.prevent="handleSave" class="space-y-6">
      <div>
        <label class="label">
          <span class="label-text font-semibold">Blood Type</span>
        </label>
        <select v-model="form.bloodType" class="select select-bordered w-full ">
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Allergies</span>
        </label>
        <textarea
          v-model="form.allergies"
          class="textarea textarea-bordered w-full "
          placeholder="List any allergies"
          rows="3"
        ></textarea>
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Current Medications</span>
        </label>
        <textarea
          v-model="form.medications"
          class="textarea textarea-bordered w-full "
          placeholder="List current medications"
          rows="3"
        ></textarea>
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Emergency Contact</span>
        </label>
        <input
          v-model="form.emergencyContact"
          type="text"
          class="input input-bordered w-full "
          placeholder="Name - Phone Number"
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text font-semibold">Insurance Information</span>
        </label>
        <input
          v-model="form.insurance"
          type="text"
          class="input input-bordered w-full "
          placeholder="Insurance Company - Policy Number"
        />
      </div>

      <div class="flex justify-end">
        <AppButton type="submit" :loading="saving">
          Save Changes
        </AppButton>
      </div>
    </form>
  </Card>
</template>

