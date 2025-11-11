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
      'glass-card rounded-2xl transition-all duration-300',
      hover !== false ? 'hover:shadow-xl hover:-translate-y-1' : '',
      paddingClasses[padding || 'md'],
    ]"
  >
    <slot />
  </div>
</template>

