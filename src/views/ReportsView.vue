<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import AppButton from '@/components/ui/AppButton.vue';
import Card from '@/components/ui/Card.vue';
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Reports
        </h1>
        <AppButton>
          📄 Generate Report
        </AppButton>
      </div>

      <Card>
        <h2 class="text-2xl font-semibold mb-4">Available Reports</h2>
        <div class="space-y-4">
          <div class="-dark p-4 rounded-lg">
            <h3 class="font-semibold mb-2">Health Summary Report</h3>
            <p class="text-sm text-base-content/70 mb-4">
              Comprehensive overview of all your health issues, events, and medical history.
            </p>
            <AppButton size="sm">Generate</AppButton>
          </div>

          <div class="-dark p-4 rounded-lg">
            <h3 class="font-semibold mb-2">Event Timeline Report</h3>
            <p class="text-sm text-base-content/70 mb-4">
              Chronological timeline of all medical events and appointments.
            </p>
            <AppButton size="sm">Generate</AppButton>
          </div>

          <div class="-dark p-4 rounded-lg">
            <h3 class="font-semibold mb-2">Documents Inventory</h3>
            <p class="text-sm text-base-content/70 mb-4">
              List of all stored medical documents and files.
            </p>
            <AppButton size="sm">Generate</AppButton>
          </div>
        </div>
      </Card>

      <Card>
        <h2 class="text-2xl font-semibold mb-4">Recent Reports</h2>
        <p class="text-base-content/70">No reports generated yet.</p>
      </Card>
    </div>
  </AppLayout>
</template>

