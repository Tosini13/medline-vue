<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps<{
  contactId: string
}>()

const contact = ref({
  id: props.contactId,
  name: 'Dr. Sarah Smith',
  role: 'Primary Care Physician',
  phone: '+1 (555) 111-2222',
  email: 'sarah.smith@hospital.com',
  specialization: 'Internal Medicine',
  address: '123 Medical Center Dr, Suite 100',
  notes: 'Very helpful and thorough. Always available for questions.',
})
</script>

<template>
  <AppLayout>
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <AppButton variant="ghost" @click="router.push('/contacts')">
          ← Back
        </AppButton>
        <h1 class="text-4xl font-bold">{{ contact.name }}</h1>
      </div>

      <GlassCard>
        <div class="text-center mb-6">
          <div class="w-24 h-24 rounded-full glass mx-auto mb-4 flex items-center justify-center text-4xl">
            👨‍⚕️
          </div>
          <h2 class="text-2xl font-semibold">{{ contact.role }}</h2>
          <p class="text-base-content/70">{{ contact.specialization }}</p>
        </div>

        <div class="space-y-4">
          <div>
            <h3 class="font-semibold mb-2">Contact Information</h3>
            <div class="space-y-2 text-base-content/80">
              <p><strong>Phone:</strong> {{ contact.phone }}</p>
              <p><strong>Email:</strong> {{ contact.email }}</p>
              <p><strong>Address:</strong> {{ contact.address }}</p>
            </div>
          </div>

          <div>
            <h3 class="font-semibold mb-2">Notes</h3>
            <p class="text-base-content/80">{{ contact.notes }}</p>
          </div>

          <div class="flex gap-4 pt-4">
            <AppButton variant="outline" class="flex-1">
              📞 Call
            </AppButton>
            <AppButton variant="outline" class="flex-1">
              ✉️ Email
            </AppButton>
            <AppButton variant="outline" class="flex-1">
              ✏️ Edit
            </AppButton>
          </div>
        </div>
      </GlassCard>
    </div>
  </AppLayout>
</template>

