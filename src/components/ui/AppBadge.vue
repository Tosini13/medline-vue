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
const { outline, variant, size } = props

const badgeClasses = computed(() => {
  const base = 'badge transition-all'
  const variantClasses = {
    primary: outline ? 'badge-outline badge-primary' : 'badge-primary',
    secondary: outline ? 'badge-outline badge-secondary' : 'badge-secondary',
    accent: outline ? 'badge-outline badge-accent' : 'badge-accent',
    info: outline ? 'badge-outline badge-info' : 'badge-info',
    success: outline ? 'badge-outline badge-success' : 'badge-success',
    warning: outline ? 'badge-outline badge-warning' : 'badge-warning',
    error: outline ? 'badge-outline badge-error' : 'badge-error',
  }
  const sizeClasses = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: '',
    lg: 'badge-lg',
  }
  return [base, variantClasses[variant], sizeClasses[size]].filter(Boolean).join(' ')
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

