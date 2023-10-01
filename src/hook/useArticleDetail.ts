import { ref, isRef, watch, computed, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getArticleDetail } from "@/service/api/article";
import useMarkdownHtml from "@/hook/useMarkdownHtml";
import { ArticleDetail } from "@/view/Article/type";
import { ElMessage } from "element-plus";

const useArticleDetail = () => {
  const route = useRoute();

  const articleItem = {
    id: ref<number>(0),
    title: ref<string>(""),
    content: ref<string>(""),
    cover: ref<string>(""),
    imgList: ref<string[]>([]),
    type: ref<"public" | "private">("public"),
    createAt: ref<string>(),
    updateAt: ref<string>(),
  };

  const id = computed(() => {
    return Number(route.params.id);
  });

  watch(
    id,
    async (newId) => {
      try {
        const item = (await getArticleDetail(newId)).data;

        articleItem.id.value = item.id;
        articleItem.title.value = item.title;

        const contentValue = useMarkdownHtml(item.content);
        isRef(contentValue)
          ? (articleItem.content.value = contentValue.value as string)
          : (articleItem.content.value = contentValue as string);

        articleItem.cover.value = item.cover;
        articleItem.imgList.value = item.imgList;
        articleItem.type.value = item.type;
        articleItem.createAt.value = item.createAt;
        articleItem.updateAt.value = item.updateAt;
      } catch (error) {
        ElMessage.error({
          message: "请求失败",
        });
      }
    },
    { immediate: true }
  );

  return articleItem;
};

export default useArticleDetail;
