<script setup lang="ts">
defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg'
  text?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-8">
    <span :class="`loading loading-spinner loading-${size || 'md'}`"></span>
    <p v-if="text" class="text-base-content/70">{{ text }}</p>
  </div>
</template>

