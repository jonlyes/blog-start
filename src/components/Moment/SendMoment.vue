<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue'])

// 手动双向绑定
const isShow = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val)
})

const gridData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
]

</script>
<template>
  <el-dialog v-model="isShow">
    <template #header>
      <h4 class="title">发布动态</h4>
    </template>
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-dialog>
</template>


<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 0px;
}
</style>
