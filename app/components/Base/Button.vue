<template>
  <button
    :style="{ width: props.width + 'px' }"
    class="custom-button"
    :class="classes"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>
<script setup lang="ts">
type Props = {
  text: string;
  type: 'tertiary' | 'primary';
  width?: number;
};
const props = defineProps<Props>();
const classes = computed(() => {
  const arr = ['custom-button--' + (props.type || 'primary')];
  !props.width && arr.push('custom-button--full');
  return arr;
});
</script>
<style lang="scss">
.custom-button {
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-m);
  font-size: 14px;
  line-height: 130%;
  border: 0px;
  cursor: pointer;
  font-family: PT_sans;
  &--full {
    width: 100%;
  }
  &--tertiary {
    padding: var(--space-sm) var(--space-m);
    border: 1px solid var(--stroke-border);
    background: var(--background-secondary);
    color: var(--text-primary);
  }
  &--primary {
    padding: 9px var(--space-m);
    background: var(--gradient-primary);
    color: var(--text-contrast);
    font-weight: 700;
  }
}
</style>
