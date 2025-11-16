import type { Application } from '../types/application';

export const useApplications = () => {
  const router = useRouter();
  const applications = ref<Application[]>([]);

  const loadApplications = async () => {
    try {
      const data = await $fetch('/api/applications');
      // @ts-ignore
      applications.value = data;
    } catch (err) {
      console.error(err);
    }
  };

  const sendApplication = async (applicationId: number) => {
    try {
      const storedData = localStorage.getItem(
        `application_complite_${applicationId}`,
      );
      if (!storedData) return;

      const response = await $fetch('/api/send', {
        method: 'POST',
        body: { applicationId, data: JSON.parse(storedData) },
      });
      // Очищаем localStorage после успешной отправки
      localStorage.removeItem(`application_complite_${applicationId}`);
      localStorage.removeItem(`application_${applicationId}`);

      window.location.reload();
    } catch (error) {
      console.error('Ошибка отправки:', error);
      throw error;
    }
  };

  const hasLocalProducts = (applicationId: number): boolean => {
    return !!localStorage.getItem(`application_complite_${applicationId}`);
  };

  return {
    applications,
    loadApplications,
    sendApplication,
    hasLocalProducts,
  };
};
