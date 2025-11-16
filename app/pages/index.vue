<template>
  <BasePageBlock title="Список заявок">
    <ApplicationsTable :applications="applications" />
  </BasePageBlock>
</template>

<script setup lang="ts">
const { applications, loadApplications } = useApplications();
definePageMeta({
  layout: 'default',
});
onMounted(() => {
  loadApplications();
});
</script>

<style scoped lang="scss"></style>
