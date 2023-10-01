<script lang="ts" setup>
import ProjectGrid from '@/components/Project/ProjectGrid.vue'
import useListData from '@/hook/useListData'
import { GetProjectInfoRes } from '@/service/api/project/type'
import { getProjectList } from '@/service/api/project';
import Finish from '@/components/Finish/Finish.vue';
const { listData, isDisabled, load, listCounts } = useListData<GetProjectInfoRes>(async (params) => {

  const result = await getProjectList(params)

  return result
})




</script>
<template>
  <div class="project">
    <header class="header-box">
      <div>
        项目列表
      </div>
    </header>
    <div class="content-box" v-infinite-scroll="load" :infinite-scroll-disabled="isDisabled">
      <ProjectGrid :data="listData" v-if="listData.length"></ProjectGrid>
    </div>
    <Finish v-if="listData.length >= listCounts"></Finish>
  </div>
</template>


<style lang="scss" scoped>
.project {
  width: 100%;

  .header-box {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 0 2.6rem;
    box-sizing: border-box;
    font-size: 2.08rem;
    font-weight: 600;
    font-style: oblique;
    font-family: "HuangLong", sans-serif;
    color: rgba(0, 0, 0, .7);

  }

  .content-box {
    width: 100%;
    padding: 0 10%;
    padding-top: 24px;
    box-sizing: border-box;
  }
}
</style>
