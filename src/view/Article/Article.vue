<script setup lang="ts">
import ArticleGrid from "@/components/Article/ArticleGrid.vue";
import useListData from "@/hook/useListData";
import { getArticleList } from "@/service/api/article";
import { GetArticleInfoRes } from "@/service/api/article/type";
import Finish from "@/components/Finish/Finish.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const { listData, isDisabled, load, listCounts } = useListData<
  Omit<Omit<GetArticleInfoRes, "content">, "imgList">
>(async (params) => {
  const result = await getArticleList(params);

  return result;
});

// 发布文章
const createArticleFn = () => {
  const routerDate = router.resolve(`/article/create`);
  window.open(routerDate.path, "_blank");
};
</script>
<template>
  <div class="article">
    <header class="header-box">
      <div>博客文章</div>
      <div>
        <el-button type="primary" round @click="createArticleFn">发布文章</el-button>
      </div>
    </header>
    <article
      class="content-box"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="isDisabled"
    >
      <ArticleGrid :data="listData" v-if="listData.length"></ArticleGrid>
    </article>
    <Finish v-if="listData.length >= listCounts"></Finish>
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;

  .header-box {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 2.6rem;
    box-sizing: border-box;
    font-size: 2.08rem;
    font-weight: 600;
    font-style: oblique;
    font-family: "HuangLong", sans-serif;
    color: rgba(0, 0, 0, 0.7);
  }

  .content-box {
    width: 100%;
    padding: 0 10%;
    padding-top: 24px;
    box-sizing: border-box;
  }
}
</style>
