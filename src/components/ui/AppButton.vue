<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'glass' | 'error'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
    fullWidth?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  }
)

const buttonClasses = computed(() => {
  const base = 'btn transition-all duration-200'
  const variantClasses = {
    primary: 'btn-primary glass',
    secondary: 'btn-secondary glass',
    accent: 'btn-accent glass',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
    glass: 'glass border-white/20 hover:bg-white/20',
    error: 'btn-error glass',
  }
  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }
  return [
    base,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.fullWidth ? 'w-full' : '',
    (props.disabled || props.loading) ? 'opacity-50 cursor-not-allowed' : '',
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled || loading">
    <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
    <slot />
  </button>
</template>

