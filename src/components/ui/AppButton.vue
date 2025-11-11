<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'error'
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
    primary: 'btn-primary',
    secondary: 'btn-secondary ',
    accent: 'btn-accent ',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
    error: 'btn-error ',
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
  <Button :class="buttonClasses" :disabled="disabled || loading">
    <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
    <slot />
  </Button>
</template>

