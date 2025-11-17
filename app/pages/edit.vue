<template>
  <BasePageBlock title="Товары">
    <ProductsTable
      :products="products"
      :loading="loading"
      @update:product="updateProductField"
      @save="save"
    />
  </BasePageBlock>
</template>

<script setup lang="ts">
import { useProducts } from '../composables/useProducts';
const router = useRouter();

definePageMeta({
  layout: 'without-nav',
});

const {
  products,
  loading,
  loadProducts,
  updateProductField,
  saveProductsComplite,
} = useProducts();

onMounted(() => {
  loadProducts();
});
const save = () => {
  saveProductsComplite();
  router.push('/');
};
</script>

<style lang="scss"></style>
