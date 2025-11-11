<script setup lang="ts">
import { eventType, eventTypesTranslationKeys } from '@/constants';
import { computed } from 'vue';
import AppBadge from './AppBadge.vue';

const props = defineProps<{
  type: (typeof eventType)[keyof typeof eventType]
}>()

const badgeConfig = computed(() => {
  const configs = {
    [eventType.appointment]: { variant: 'primary' as const, icon: '📅' },
    [eventType.test]: { variant: 'info' as const, icon: '🧪' },
    [eventType.surgery]: { variant: 'error' as const, icon: '🏥' },
    [eventType.occurrence]: { variant: 'warning' as const, icon: '⚠️' },
    [eventType.other]: { variant: 'secondary' as const, icon: '📝' },
  }
  return configs[props.type] || configs[eventType.other]
})
</script>

<template>
  <AppBadge :variant="badgeConfig.variant" size="sm">
    <span class="mr-1">{{ badgeConfig.icon }}</span>
    {{ eventTypesTranslationKeys[type] }}
  </AppBadge>
</template>

