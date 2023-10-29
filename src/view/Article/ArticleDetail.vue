<script setup lang="ts">
import { storeToRefs } from "pinia";
import Finish from "@/components/Finish/Finish.vue";
import useArticleDetail from "@/hook/useArticleDetail";
import JDayjs from "@/utils/JDayjs";
import useAuthStore from "@/store/useAuthStore";
import useArticleStore from "@/store/useArticleStore";
import { useRouter } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { deleteArticle } from "@/service/api/article/index";
const router = useRouter();

const { id, content, title, createAt, updateAt } = useArticleDetail();


const authStore = useAuthStore();
const articleStore = useArticleStore();

const { isLogin, authToken } = storeToRefs(authStore);
const { articleTitle, articleContent } = storeToRefs(articleStore);

// 文章编辑
const editFn = (title: string, content: string) => {
  articleTitle.value = title;
  articleContent.value = content;
  // 编辑页面
  const routerDate = router.resolve(`/article/${id.value}/update`);
  window.open(routerDate.path, "_blank");
};

// 删除文章
const deleteFn = async (articleId: string) => {
  await deleteArticle(articleId);
  router.push("/article");
};
</script>
<template>
  <div class="layout">
    <div class="title-box">
      <h1 class="title">{{ title }}</h1>
    </div>
    <div class="time-edit">
      <time class="time">{{ JDayjs(createAt || "") }}</time>
      <!-- 编辑权限 -->
      <div class="edit" v-if="isLogin && authToken">
        <el-button
          icon="edit"
          type="primary"
          size="small"
          @click="editFn(title, content)"
          >编辑</el-button
        >
        <el-popconfirm
          title="确定删除此文章吗？"
          width="200px"
          @confirm="deleteFn(String(id))"
        >
          <template #reference>
            <el-button icon="Delete" type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>

    <div class="content">
      <MdPreview v-model="content"></MdPreview>
    </div>
    <Finish>
      <p>更新于 {{ JDayjs(updateAt || "") }}</p>
    </Finish>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 50rem;
  height: 100%;
  margin-left: 25rem;
  padding: 1.3rem 2.6rem;
  color: 252933;
  position: relative;
  background-color: white;
  border-radius: 4px;
  box-shadow: inset;

  .title-box {
    width: 100%;
    height: 100%;

    .title {
      font-size: 24px;
      font-weight: bold;
      margin: 0px;
      padding: 12px 0;
    }
  }

  .time-edit {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;

    .time {
      font-size: 14px;
      color: #8a919f;
      text-align: center;
      line-height: 22px;
    }
  }

  .content {
    // :deep(img) {
    //   max-width: 100% !important;
    // }

    // :deep(pre) {
    //   background-color: rgb(34, 39, 46);

    //   code::-webkit-scrollbar {
    //     height: 8px;
    //     border-radius: 8px;
    //     background-color: rgba(206, 203, 203);
    //   }

    //   code::-webkit-scrollbar-thumb {
    //     background-color: rgba(255, 255, 255, 0.6);
    //     border-radius: 8px;
    //   }
    // }

    // :deep(blockquote) {
    //   color: #666 !important;
    //   background-color: #f8f8f8 !important;
    //   padding: 12px 16px;
    // }
  }

  p {
    font-size: 12px;
    font-weight: 300;
  }
}
</style>
