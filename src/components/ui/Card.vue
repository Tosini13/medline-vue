<script setup lang="ts">
defineProps<{
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}>()

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <div
    :class="[
      'card',
      paddingClasses[padding || 'md'],
    ]"
  >
    <slot />
  </div>
</template>

