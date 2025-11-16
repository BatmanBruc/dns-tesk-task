<template>
  <div id="app">
    <NuxtLayout keepalive>
      <NuxtPage keepalive />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@use '~/assets/scss/main.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}
.page {
  background: #f7f7f7;
  min-height: 100vh;
  padding: 24px 20px;
  display: flex;
  gap: 12px;
}
</style>
