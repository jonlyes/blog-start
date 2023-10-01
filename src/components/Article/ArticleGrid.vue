<script setup lang="ts">
import { PropType } from 'vue'
import { GetArticleInfoRes } from "@/service/api/article/type";
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
  data: {
    require: true,
    type: Array as PropType<Omit<Omit<GetArticleInfoRes, "content">, "imgList">[]>,
  }
})


</script>
<template>
  <div class="article-grip">
    <div class="grip-item" v-for="item in data" :key="item.id" @click="router.push(`/article/${item.id}`)">
      <el-card class="card-box" shadow="hover" :body-style="{ padding: '0px' }">
        <div class="cover-box">
          <el-image class="cover" :src="item.cover" fit="fill" />
        </div>
        <div class="title-box">
          <span>{{ item.title }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.article-grip {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.36rem 2.13rem;

  .grip-item {
    text-align: center;
    position: relative;
    border-radius: 8px;
    // overflow: hidden;
    cursor: pointer;

    .card-box {
      width: 100%;
      height: 100%;
      position: relative;


      .cover-box {
        width: 100%;
        // 设置宽高比为 4:3
        aspect-ratio: 4 / 3;
        overflow: hidden;

        .cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .title-box {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 2.69rem;
        line-height: 2.69rem;
        padding: 0 1.57rem;
        font-size: 0.91rem;
        text-align: center;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: white;
        background-color: rgba(0, 0, 0, .4);
      }
    }
  }
}
</style>
