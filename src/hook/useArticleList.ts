import { onMounted, ref } from "vue";
import{getArticleList} from '@/service/api/article/'
import { GetArticleListParams } from "@/service/api/article/type";


const useArticleList = () => {
  const listParams = ref<GetArticleListParams>({
    page: 1,
    size: 20,
  });

  onMounted(()=>{
    getArticleList(listParams.value)
  })

  return {};
};
