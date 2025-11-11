<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import Card from '@/components/ui/Card.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { getAPI } from '@/services/mockData'
import { onMounted, ref } from 'vue'

const api = getAPI()
const loading = ref(true)
const stats = ref({
  totalIssues: 0,
  totalEvents: 0,
  upcomingAppointments: 0,
  recentTests: 0,
})

onMounted(async () => {
  try {
    const lines = await api.lines.get()
    stats.value.totalIssues = lines.length
    
    let totalEvents = 0
    let upcoming = 0
    let tests = 0
    const now = new Date()
    
    for (const line of lines) {
      const events = await api.events.get(line.id)
      totalEvents += events.length
      events.forEach(event => {
        if (new Date(event.date) >= now) upcoming++
        if (event.type === 'MT') tests++
      })
    }
    
    stats.value.totalEvents = totalEvents
    stats.value.upcomingAppointments = upcoming
    stats.value.recentTests = tests
  } catch (error) {
    console.error('Failed to load analytics:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Analytics
      </h1>

      <LoadingSpinner v-if="loading" text="Loading analytics..." />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary">{{ stats.totalIssues }}</div>
            <div class="text-base-content/70 mt-2">Total Issues</div>
          </div>
        </Card>

        <Card>
          <div class="text-center">
            <div class="text-4xl font-bold text-info">{{ stats.totalEvents }}</div>
            <div class="text-base-content/70 mt-2">Total Events</div>
          </div>
        </Card>

        <Card>
          <div class="text-center">
            <div class="text-4xl font-bold text-warning">{{ stats.upcomingAppointments }}</div>
            <div class="text-base-content/70 mt-2">Upcoming</div>
          </div>
        </Card>

        <Card>
          <div class="text-center">
            <div class="text-4xl font-bold text-success">{{ stats.recentTests }}</div>
            <div class="text-base-content/70 mt-2">Tests</div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 class="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p class="text-base-content/70">
          More detailed analytics and charts will be available in future updates.
        </p>
      </Card>
    </div>
  </AppLayout>
</template>

