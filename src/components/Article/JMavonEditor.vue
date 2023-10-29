<script setup lang="ts">
import { ref, PropType } from "vue";
import { MdEditor, ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import avatar from "@/assets/avatar.jpg";
import { uploadImage } from "@/service/api/upload/index";
import { updateArticle, createArticle } from "@/service/api/article/index";
import { ElMessageBox, ElMessage } from "element-plus";
import type { Action } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<"update" | "create">,
    default: "",
  },
});

// 文章是否public
const isPublic = ref<boolean>(true);

//marked配置
const config = ref<ToolbarNames[]>(["github", "save"]);

const MDcontent = ref<string>(props.content || "");
const MDtitle = ref<string>(props.title || "");

// 上传图片
const onUploadImg = async (
  files: Array<File>,
  callback: (urls: Array<string>) => void
) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("image", file);

        // 上传图片
        uploadImage(form)
          .then((res) => rev(res.data))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item: any) => item.imgUrl as string));
};

// 更新创建文章
const sendArticle = () => {
  if (!(MDtitle.value && MDcontent.value)) {
    return ElMessage({
      message: "标题跟内容不能为空！",
      type: "error",
    });
  }
  ElMessageBox.alert(
    `确认${props.type === "update" ? "更新" : "发布"}文章吗？`,
    "文章编辑",
    {
      confirmButtonText: "确认",
      autofocus: false,
      callback: async (action: Action) => {
        if (action === "confirm") {
          if (props.type === "update") {
            const articleId = route.params.id;

            await updateArticle(
              {
                title: MDtitle.value,
                content: MDcontent.value,
                type: isPublic ? "public" : "private",
              },
              articleId as string
            );
            router.push(`/article/${articleId}`);
          } else {
            const result = await createArticle({
              title: MDtitle.value,
              content: MDcontent.value,
              type: isPublic ? "public" : "private",
            });
            router.push(`/article/${result.data.insertId}`);
          }
        }
      },
    }
  );
};
</script>
<template>
  <div class="layout">
    <header class="header-box">
      <el-input
        v-model="MDtitle"
        class="left"
        placeholder="输入文章标题..."
      ></el-input>
      <div class="right">
        <el-switch
          v-model="isPublic"
          width="80"
          size="large"
          class="ml-2"
          inline-prompt
          active-text="public"
          inactive-text="private"
        />
        <el-button type="primary" @click="sendArticle">{{
          type === "update" ? "更新" : "发布"
        }}</el-button>
        <el-avatar :size="32" :src="avatar" />
      </div>
    </header>

    <MdEditor
      v-model="MDcontent"
      :toolbars-exclude="config"
      :footers="['markdownTotal', 0, '=', 1, 'scrollSwitch']"
      class="mavonEditor"
      @upload-img="onUploadImg"
    ></MdEditor>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .header-box {
    background-color: #fff;
    height: 64px;
    display: flex;
    justify-content: space-between;
    padding: 0 32px;
    .left {
      flex: 1;
      :deep(.el-input__wrapper) {
        box-shadow: none;
        border-radius: 0px;
        border: 0px;
      }

      :deep(.el-input__inner) {
        height: 64px;
        font-size: 24px;
        text-align: start;
        font-weight: bold;
        color: black;
      }
    }
    .right {
      height: 64px;
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: center;
      :deep(.el-switch--large) {
        height: 32px;
        line-height: 32px;
        .el-switch__core {
          height: 32px;
          border-radius: 32px;
        }
      }
      button,
      span {
        margin: 0 12px;
      }
    }
  }

  .mavonEditor {
    width: 100%;
    height: calc(100% - 64px);
  }
}
</style>
