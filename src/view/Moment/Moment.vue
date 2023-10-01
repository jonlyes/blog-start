<script setup lang="ts">
import useMomentList from '@/hook/useMomentList'
import JDayjs from '@/utils/JDayjs'
import Finish from '@/components/Finish/Finish.vue'

const { listData, isDisabled, load ,listCounts} = useMomentList()

</script>
<template>
  <div class="layout">
    <header class="header-box">
      <div>
        我的动态
      </div>
    </header>
    <main v-infinite-scroll="load" :infinite-scroll-disabled="isDisabled">
      <el-timeline>
        <el-timeline-item type="warning" center size="large" v-for="item in listData" :key="item.id"
          :timestamp="JDayjs(item.createAt)" placement="top">
          <el-card :body-style="{ paddingLeft: '40px', paddingRight: '40px' }">
            <p class="content">{{ item.content }}</p>
            <div class="pictures-box" :style="{ flexGrow: item.pictures.length % 2 === 0 ? '2' : '3' }"
              v-if="listData.length">
              <div class="img-box" v-for="(img, index) in item.pictures" :key="index">
                <el-image :src="img" :preview-src-list="item.pictures" :lazy="true" :hide-on-click-modal="true"
                  fit="cover"></el-image>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </main>
    <Finish v-if="listData.length >= listCounts"></Finish>
  </div>
</template>


<style lang="scss" scoped>
.layout {
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

  main {
    width: 100%;
    padding: 10px 25%;
    box-sizing: border-box;

    :deep(.el-timeline-item__tail) {
      border-left: 2px solid #b2b23b;
    }

    .content {
      font-size: 18px;
      font-weight: 400;
    }

    .pictures-box {
      display: flex;
      padding: 0.78rem;
      box-sizing: border-box;
      grid-gap: 0.52rem;

      .img-box {
        width: 10.42rem;
        height: 10.42rem;
        border-radius: 0.13rem;
        cursor: pointer;

        &:hover {
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
          ;
        }

        :deep(.el-image)>img {
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
      }
    }
  }

}
</style>
