<template>
  <div class="nav-bar block" :class="{ 'nav-bar--collapsed': !menu.isOpen }">
    <div
      class="nav-bar__block"
      style="display: flex; justify-content: flex-end"
    >
      <div class="nav-bar__toggle" @click="toggleMenu">
        <BaseIcon
          color="icon-primary"
          :rotate="menu.isOpen ? 0 : 180"
          :size="2"
        >
          <IconArrow />
        </BaseIcon>
      </div>
    </div>
    <div class="nav-bar__block">
      <div class="nav-menu">
        <div class="nav-menu__item nav-menu__item--active">
          <div class="nav-menu__icon">
            <BaseIcon color="icon-brand-dark" :size="3">
              <IconGoodsGrid />
            </BaseIcon>
          </div>
          <div v-show="menu.isOpen" class="nav-menu__title">Заявки</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const menu = useMenu();

const toggleMenu = () => {
  menu.value.isOpen = !menu.value.isOpen;
};
</script>

<style scoped lang="scss">
.nav-bar {
  width: 280px;
  .nav-bar__toggle {
    width: 36px;
    height: 36px;
    padding: var(--space-sm);
    background: #f7f7f7;
    border-radius: var(--radius-sm);
    margin: var(--space-l) 18px;
    cursor: pointer;
  }
  .nav-menu {
    margin-top: var(--space-m);
    margin-bottom: var(--space-m);
    &__item {
      padding-left: 14px;
      padding-right: 12px;
      padding-top: 10px;
      padding-bottom: 10px;
      display: flex;
      gap: 12px;
      cursor: pointer;
      &--active {
        border-left: 2px solid var(--stroke-border-brand);
        color: var(--text-brand);
      }
      &:hover:not(.nav-bar--collapsed) {
        background: var(--background-date-range);
      }
    }
    &__title {
      font-size: 16px;
      line-height: 24px;
    }
  }

  &--collapsed {
    width: 68px;
    .nav-bar__toggle {
      margin: var(--space-l) 16px;
    }
    .nav-menu__item {
      padding-top: var(--space-nity);
      padding-bottom: var(--space-nity);
    }
    .nav-menu__icon {
      width: 36px;
      height: 36px;
      padding: 6px;
      border-radius: var(--radius-sm);
    }
    .nav-menu__item--active .nav-menu__icon {
      background: #fff7dab2;
    }
  }
}
</style>
