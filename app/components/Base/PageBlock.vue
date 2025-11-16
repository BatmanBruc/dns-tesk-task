<template>
  <div class="page-block block">
    <div class="page-block__header">
      <div v-show="showBack" class="page-block__back" @click="router.back()">
        <BaseIcon color="icon-primary" :size="3">
          <IconBack />
        </BaseIcon>
      </div>
      <div class="page-block__title">{{ title }}</div>
    </div>
    <div class="page-block__content"><slot /></div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ title: string }>();
const router = useRouter();

const showBack = computed(() => {
  return process.client && window.location.pathname !== '/';
});
</script>
<style lang="scss">
.page-block {
  &__header {
    padding: var(--space-l) var(--space-xxl);
    color: #333333;
    font-weight: bold;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    gap: var(--space-m);
  }
  &__content {
    padding: var(--space-xxl) var(--space-xxl);
  }
  &__title {
    font-size: 24px;
    line-height: 130%;
  }
  &__back {
    cursor: pointer;
  }
  flex: 1;
}
</style>
