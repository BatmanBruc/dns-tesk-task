<template>
  <BasePageBlock title="Товары">
    <ProductsTable
      v-if="products.length"
      :products="products"
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

const { products, loadProducts, updateProductField, saveProductsComplite } =
  useProducts();

await loadProducts();

const save = () => {
  saveProductsComplite();
  router.push('/');
};
</script>

<style lang="scss"></style>
