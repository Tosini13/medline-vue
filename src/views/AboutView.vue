<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import Card from '@/components/ui/Card.vue';
</script>

<template>
  <AppLayout>
    <div class="max-w-3xl mx-auto space-y-6">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center">
        About Medline
      </h1>

      <Card>
        <div class="space-y-6">
          <div>
            <h2 class="text-2xl font-semibold mb-4">Welcome to Medline</h2>
            <p class="text-base-content/80 leading-relaxed">
              Medline is your comprehensive health companion designed to help you manage your medical
              information, track health issues, and organize your healthcare journey in one place.
            </p>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Features</h3>
            <ul class="list-disc list-inside space-y-2 text-base-content/80">
              <li>Track and manage multiple health issues</li>
              <li>Record medical events and appointments</li>
              <li>Store important documents</li>
              <li>Manage healthcare contacts</li>
              <li>Keep personal health notes</li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Version</h3>
            <p class="text-base-content/80">1.0.0</p>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Privacy</h3>
            <p class="text-base-content/80">
              Your health information is private and secure. We use industry-standard encryption
              to protect your data.
            </p>
          </div>
        </div>
      </Card>
    </div>
  </AppLayout>
</template>

