<template>
  <div class="custom-select font-s" :class="clasess">
    <!-- Триггер выбора -->
    <div
      class="select-trigger"
      @click="toggleDropdown"
      @blur="closeDropdown"
      tabindex="0"
    >
      <span v-show="selectedOption">{{ selectedOption?.label }}</span>
      <span class="custom-select__placeholder" v-show="!selectedOption">{{
        placeholder
      }}</span>
      <span class="arrow">
        <BaseIcon color="icon-primary" :size="1" :rotate="isOpen ? 90 : -90">
          <IconArrow />
        </BaseIcon>
      </span>
    </div>

    <!-- Список опций -->
    <div v-show="isOpen" class="dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        :class="{
          selected: option.value === modelValue,
        }"
        @click="selectOption(option)"
      >
        {{ option.label }}
        <BaseIcon
          v-show="option.value === modelValue"
          :size="2"
          color="icon-brand-dark"
        >
          <IconCheck />
        </BaseIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Option = {
  label: string;
  value: string;
};

type Props = {
  modelValue: string | number;
  options: Option[];
  view?: 'normal' | 'error';
  placeholder?: string;
};

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'change']);

const clasess = computed(() => {
  return ['custom-select--' + (props.view || 'normal')];
});

const isOpen = ref(false);

const selectedOption = computed(() => {
  return props.options?.find((opt) => opt.value === props.modelValue);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 150);
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
};
</script>

<style lang="scss">
@import '@/assets/scss/_fonts.scss';
.custom-select {
  position: relative;
  @include font-s();
  &--error .select-trigger {
    border: 1px solid var(--stroke-border-error);
  }
  &--normal .select-trigger {
    border: 1px solid var(--stroke-border);
  }
  &__placeholder {
    color: var(--text-tertiary);
  }
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px var(--space-m);
  border-radius: var(--radius-sm);
  background: white;
  cursor: pointer;
}

.select-trigger:focus {
  outline: none;
  border-color: var(--stroke-border-dark);
}

.arrow {
  transition: transform 0.2s;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--radius-md);
  margin-top: var(--space-sm);
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0px 3px 12px 0px #00000026;
  padding: var(--space-sm);
  width: 220px;
}

.option {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.option:hover {
  color: var(--text-brand);
}

.option.selected {
  color: var(--text-brand);
}
</style>
