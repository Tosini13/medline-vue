<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const contacts = ref([
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    role: 'Primary Care Physician',
    phone: '+1 (555) 111-2222',
    email: 'sarah.smith@hospital.com',
    specialization: 'Internal Medicine',
  },
  {
    id: '2',
    name: 'Dr. Michael Johnson',
    role: 'Cardiologist',
    phone: '+1 (555) 222-3333',
    email: 'm.johnson@clinic.com',
    specialization: 'Cardiology',
  },
  {
    id: '3',
    name: 'Dr. Emily Brown',
    role: 'Endocrinologist',
    phone: '+1 (555) 333-4444',
    email: 'e.brown@medical.com',
    specialization: 'Endocrinology',
  },
])
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Contacts
        </h1>
        <AppButton>
          ➕ Add Contact
        </AppButton>
      </div>

      <div v-if="contacts.length === 0" class="card text-center py-12">
        <p class="text-xl mb-4">No contacts yet</p>
        <AppButton>Add Your First Contact</AppButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="contact in contacts"
          :key="contact.id"
          hover
          class="cursor-pointer"
          @click="router.push(`/contacts/${contact.id}`)"
        >
          <div class="text-center mb-4">
            <div class="w-20 h-20 rounded-full  mx-auto mb-3 flex items-center justify-center text-3xl">
              👨‍⚕️
            </div>
            <h3 class="text-xl font-semibold">{{ contact.name }}</h3>
            <p class="text-base-content/70">{{ contact.role }}</p>
          </div>
          <div class="space-y-2 text-sm">
            <p><strong>Specialization:</strong> {{ contact.specialization }}</p>
            <p><strong>Phone:</strong> {{ contact.phone }}</p>
            <p><strong>Email:</strong> {{ contact.email }}</p>
          </div>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

