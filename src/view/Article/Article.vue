<script setup lang="ts">
import { onMounted,ref } from 'vue';
import ArticleGrid from '@/components/Article/ArticleGrid.vue'

const initArticleList = ref([])

onMounted(()=>{

})

</script>
<template>
  <div class="article">
    <header class="header-box">
      <div>
        博客文章
      </div>
    </header>
    <div class="content-box">
      <ArticleGrid></ArticleGrid>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.article {
  width: 100%;
  height: 1000px;

  .header-box {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 32px;
    font-weight: 600;
    font-style: oblique;
    font-family: "HuangLong", sans-serif;
    color: rgba(0, 0, 0, .7);

  }
}
</style>
