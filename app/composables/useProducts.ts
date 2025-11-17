import type { Product } from '../types/application';

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const error = ref<string | null>(null);
  const route = useRoute();
  const applicationId = route.query.id as string;
  const loading = ref<boolean>(false);

  const loadProducts = async () => {
    if (process.client) {
      const stored = localStorage.getItem(`application_${applicationId}`);

      if (stored) {
        products.value = JSON.parse(stored);
        return;
      }
    }

    error.value = null;

    try {
      loading.value = true;
      const data = await $fetch('/api/products');
      //@ts-ignore
      products.value = data;
      process.client && saveProducts();
      loading.value = false;
    } catch (err) {
      error.value = 'Ошибка загрузки товаров';
      loading.value = false;
      console.error(err);
    }
  };

  const saveProducts = () => {
    localStorage.setItem(
      `application_${applicationId}`,
      JSON.stringify(products.value),
    );
  };

  const saveProductsComplite = () => {
    localStorage.setItem(
      `application_complite_${applicationId}`,
      JSON.stringify(products.value),
    );
  };

  const updateProductField = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    if (products.value[index]) {
      // @ts-ignore
      products.value[index][field] = value;
      saveProducts();
    }
  };

  return {
    products,
    error,
    loading,
    loadProducts,
    updateProductField,
    saveProductsComplite,
  };
};
