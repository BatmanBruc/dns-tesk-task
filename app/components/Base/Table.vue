<template>
  <table class="custom-table block">
    <colgroup>
      <col v-for="column in columns" :key="column.key" />
      <col v-if="$slots.action" style="width: 158px" />
    </colgroup>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.title }}
        </th>
        <th v-if="$slots.action">Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in data"
        :key="row.id || index"
        :class="{ active: row.active }"
      >
        <td v-for="column in columns" :key="column.key">
          <slot
            :name="`cell-${column.key}`"
            :row="row"
            :index="index"
            :key="column.key"
            :value="getValue(row, column.key)"
          >
            {{ getValue(row, column.key) }}
          </slot>
        </td>
        <td class="action" v-if="$slots.action">
          <slot name="action" :row="row" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface TableColumn {
  key: string;
  title: string;
}

interface Props {
  data: any[];
  columns: TableColumn[];
}

defineProps<Props>();

const getValue = (row: any, key: string) => {
  return row[key];
};
</script>
<style lang="scss">
.custom-table {
  width: 100%;
  border-spacing: 0px;
  border: 1px solid var(--stroke-border-light);
  table-layout: fixed;
  th {
    text-align: start;
  }
  thead {
    background: var(--background-primary);
    tr {
      min-height: 48px;
      th {
        text-align: start;
        padding: 15px 20px;
        font-size: 14px;
        line-height: 130%;
        color: var(--text-tertiary);
      }
    }
  }
  tbody {
    tr {
      height: 64px;
      &.active {
        background: var(--background-date-range);
      }
      td {
        padding: var(--space-xl);
        font-size: 16px;
        line-height: 24px;
        border-top: 1px solid var(--stroke-border-light);
        color: var(--text-secondary);
        font-family: PT_sans;
        &.action {
          width: 158px;
        }
      }
    }
  }
}
</style>
