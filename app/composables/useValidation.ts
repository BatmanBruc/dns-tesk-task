export const useValidation = () => {
  const validateNumber = (value: string): boolean => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(value);
  };

  const validateColor = (value: string): boolean => {
    const validColors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
    return validColors.includes(value);
  };

  const validateProduct = (product: any) => {
    const errors: Record<string, string> = {};

    if (!+product.quantity) {
      errors.quantity = 'Значение должно быть больше нуля';
    }

    if (!Number.isInteger(+product.quantity)) {
      errors.quantity = 'Допускаются целые числа';
    }

    if (!+product.price) {
      errors.price = 'Значение должно быть больше нуля';
    }

    if (!validateNumber(product.price)) {
      errors.price = 'Допускаются только цифры и точка';
    }

    if (!validateColor(product.color)) {
      errors.color = 'Выберите корректный цвет';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return {
    validateNumber,
    validateColor,
    validateProduct,
  };
};
