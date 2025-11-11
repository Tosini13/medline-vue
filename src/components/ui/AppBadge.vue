<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    outline?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    outline: false,
  }
)

const badgeClasses = computed(() => {
  const base = 'badge transition-all'
  const variantClasses = {
    primary: outline ? 'badge-outline badge-primary' : 'badge-primary glass',
    secondary: outline ? 'badge-outline badge-secondary' : 'badge-secondary glass',
    accent: outline ? 'badge-outline badge-accent' : 'badge-accent glass',
    info: outline ? 'badge-outline badge-info' : 'badge-info glass',
    success: outline ? 'badge-outline badge-success' : 'badge-success glass',
    warning: outline ? 'badge-outline badge-warning' : 'badge-warning glass',
    error: outline ? 'badge-outline badge-error' : 'badge-error glass',
  }
  const sizeClasses = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: '',
    lg: 'badge-lg',
  }
  return [base, variantClasses[props.variant], sizeClasses[props.size]].filter(Boolean).join(' ')
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

