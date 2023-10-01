import { onMounted, ref, Ref, shallowRef } from "vue";

interface ListParams {
  page: number;
  size: number;
  type?: "public" | "private";
}

interface CallBackRes<R> {
  code: number;
  msg: string;
  data: R[];
  counts: number;
}

type CallBack<R> = (params: ListParams) => Promise<CallBackRes<R>>;

interface useListDataFnRes<R> {
  listData: Ref<R[]>;
  isDisabled: Ref<boolean>;
  load: () => void;
  listCounts: Ref<number>;
}

// 列表hook
const useListData = <R>(callback: CallBack<R>): useListDataFnRes<R> => {
  const listParams = ref<ListParams>({
    page: 1,
    size: 6,
  });

  // 加载锁
  const isDisabled = shallowRef<boolean>(true);

  // 列表数据
  const listData = ref<R[]>([]) as Ref<R[]>;

  // 数据总数
  const listCounts = shallowRef<number>(0);

  // 初始化列表
  const initListData = async () => {
    const result = await callback(listParams.value);
    listCounts.value = result.counts;
    listData.value?.push(...result.data);
    result.data.length < listParams.value.size ||
    listData.value.length >= listCounts.value
      ? (isDisabled.value = true)
      : (isDisabled.value = false);
  };

  const load = () => {
    isDisabled.value = true;
    listParams.value.page++;

    initListData();
  };

  onMounted(() => {
    initListData();
  });

  return { listData, isDisabled, load, listCounts };
};

export default useListData;
