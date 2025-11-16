import type { Product } from '../types/application';

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const error = ref<string | null>(null);
  const route = useRoute();
  const applicationId = route.query.id as string;

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
      const { data } = await useAsyncData('products', () =>
        $fetch('/api/products'),
      );

      products.value = data.value!;
      console.log(products.value);
      process.client && saveProducts();
    } catch (err) {
      error.value = 'Ошибка загрузки товаров';
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
    loadProducts,
    updateProductField,
    saveProductsComplite,
  };
};
