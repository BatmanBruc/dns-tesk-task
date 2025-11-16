<template>
  <div class="custom-input" :class="clasess">
    <input
      :value="modelValue"
      :type="type"
      @input.stop="handlerInput"
      :placeholder="placeholder"
    />
    <div class="custom-input__remove" @click="$emit('clear')">
      <BaseIcon color="icon-primary" :size="1">
        <IconClose />
      </BaseIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
type Props = {
  modelValue: string | number;
  type: string;
  view: 'normal' | 'error';
  placeholder?: string;
};
const emit = defineEmits();
const props = defineProps<Props>();

const clasess = computed(() => {
  return ['custom-input--' + (props.view || 'normal')];
});
const handlerInput = (event: Event) => {
  let value = (event.target as HTMLInputElement | HTMLSelectElement).value;
  emit('update:modelValue', value);
};
</script>
<style lang="scss">
@import '@/assets/scss/_fonts.scss';
.custom-input {
  position: relative;
  &--error input {
    border: 1px solid var(--stroke-border-error);
  }
  &--normal input {
    border: 1px solid var(--stroke-border);
  }
  input {
    border-radius: var(--radius-sm);
    color: var(--text-tertiary);
    padding-left: var(--space-m);
    padding-right: var(--space-sm);
    padding-top: var(--space-sm);
    padding-bottom: var(--space-sm);
    width: 100%;
    background: var(--white-color);
    height: 36px;
    font-family: PT_sans;
    @include font-s();
    &:focus {
      border-color: var(--stroke-border-dark);
    }
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  &__remove {
    position: absolute;
    right: 8px;
    top: 9px;
  }
}
</style>
