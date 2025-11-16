<template>
  <BaseTable :columns="columns" :data="data">
    <template #cell-status="{ value }">
      <div
        class="applications-status"
        :class="['applications-status--' + statusMap[value].key]"
      >
        {{ statusMap[value].text }}
      </div>
    </template>
    <template #cell-result="{ value }">
      <div
        class="applications-result"
        :class="['applications-result--' + resultMap[value].key]"
      >
        {{ resultMap[value].text }}
      </div>
    </template>
    <template #cell-createdAt="{ value }">
      {{ formatDate(value) }}
    </template>
    <template #action="{ row }">
      <div>
        <BaseButton
          v-if="isSave(row.id)"
          text="Отправить"
          type="primary"
          @click="sendApplication(row.id)"
        />
        <BaseButton
          v-else
          text="Редактировать"
          type="tertiary"
          @click="router.push(`/edit?id=${row.id}`)"
        />
      </div>
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import type { Application } from '../types/application';

interface Props {
  applications: Application[];
}

const statusMap = {
  1: {
    text: 'Активна',
    key: 'active',
  },
};
const resultMap = {
  0: {
    text: 'В обработке',
    key: 'processing',
  },
};
const router = useRouter();
const props = defineProps<Props>();

const columns = [
  {
    title: 'Номер',
    key: 'number',
  },
  {
    title: 'Статус',
    key: 'status',
  },
  {
    title: 'Дата создания',
    key: 'createdAt',
  },
  {
    title: 'Результат проверки',
    key: 'result',
  },
];

const { sendApplication, hasLocalProducts } = useApplications();

const isSave = (id: number) => {
  return process.client && hasLocalProducts(id);
};

const data = computed(() => {
  if (process.client) {
    return props.applications.map((app) => {
      return {
        ...app,
        active: isSave(app.id),
      };
    });
  } else {
    return props.applications;
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_fonts.scss';
.applications-status {
  padding: var(--space-tiny) var(--space-sm);
  border-radius: var(--radius-sm);
  display: inline-block;
  @include font-t(bold);
  &--active {
    background: var(--background-success-light);
    color: var(--text-success);
  }
}

.applications-result {
  color: var(--text-tertiary);
}
</style>
