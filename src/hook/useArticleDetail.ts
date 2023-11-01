import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticleDetail } from "@/service/api/article";
import { ElMessage } from "element-plus";
import { GetArticleInfoRes } from "@/service/api/article/type";

const useArticleDetail = () => {
  const route = useRoute();
  const router = useRouter();

  const articleItem = {
    id: ref<number>(0),
    title: ref<string>(""),
    content: ref<string>(""),
    cover: ref<string>(""),
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
      if (!newId || isNaN(newId)) return;
      try {
        const item = (await getArticleDetail(newId)).data as GetArticleInfoRes;
        articleItem.id.value = item.id;
        articleItem.title.value = item.title;
        articleItem.content.value = item.content;
        articleItem.cover.value = item.cover;
        articleItem.type.value = item.type;
        articleItem.createAt.value = item.createAt;
        articleItem.updateAt.value = item.updateAt;
      } catch (error) {
        ElMessage.error({
          message: "该资源不存在",
        });
        console.log(11);

        router.push("/article");
      }
    },
    { immediate: true }
  );

  return articleItem;
};

export default useArticleDetail;
