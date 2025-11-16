<template>
  <div class="products-control">
    <BaseButton text="Сохранить" type="primary" :width="140" @click="save()" />
  </div>
  <BaseTable :columns="columns" :data="products">
    <template #cell-quantity="{ value, index, key }">
      <BaseInput
        :modelValue="value"
        :view="errors[index]?.quantity ? 'error' : 'normal'"
        type="number"
        @update:modelValue="onInputChange(index, key, $event)"
        @clear="onInputChange(index, key, 0)"
      />
    </template>
    <template #cell-price="{ value, index, key }">
      <BaseInput
        :modelValue="value"
        :view="errors[index]?.price ? 'error' : 'normal'"
        type="number"
        @update:modelValue="onInputChange(index, key, $event)"
        @clear="onInputChange(index, key, 0)"
      />
    </template>
    <template #cell-color="{ value, index, key }">
      <BaseSelect
        :options="optionsColor"
        :modelValue="value"
        placeholder="Цвет"
        type="number"
        :view="errors[index]?.color ? 'error' : 'normal'"
        @update:modelValue="onInputChange(index, key, $event)"
        @clear="onInputChange(index, key, 0)"
      />
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import type { Product } from '../types/application';

interface Props {
  products: Product[];
}

interface Emits {
  (
    e: 'update:product',
    index: number,
    field: string,
    value: string | number,
  ): void;
  (e: 'save'): void;
}

const columns = [
  {
    title: 'Название',
    key: 'name',
  },
  {
    title: 'Количество',
    key: 'quantity',
  },
  {
    title: 'Цена',
    key: 'price',
  },
  {
    title: 'Цвет',
    key: 'color',
  },
];

const optionsColor = [
  {
    label: 'Белый',
    value: 'white',
  },
  {
    label: 'Черный',
    value: 'black',
  },
  {
    label: 'Синий',
    value: 'blue',
  },
  {
    label: 'Красный',
    value: 'red',
  },
  {
    label: 'Зеленый',
    value: 'green',
  },
  {
    label: 'Желтый',
    value: 'yellow',
  },
];
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const errors = ref<Record<number, any>>({});
const { validateProduct } = useValidation();

const onInputChange = (index: number, field: string, value: number) => {
  emit('update:product', index, field, value);
  const validation = validateProduct(props.products[index]);
  errors.value[index] = validation.errors;
};

const save = () => {
  const allErrors: Record<number, any> = {};
  let hasErrors = false;

  props.products.forEach((product: Product, index: number) => {
    const validation = validateProduct(product);
    if (!validation.isValid) {
      allErrors[index] = validation.errors;
      hasErrors = true;
    }
  });
  errors.value = allErrors;
  console.log(errors.value);

  if (!hasErrors) {
    emit('save');
  }
};
</script>

<style scoped lang="scss">
.products-control {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--space-xl);
}
</style>
