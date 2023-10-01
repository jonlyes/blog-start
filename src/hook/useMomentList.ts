import { onMounted, ref, Ref, shallowRef } from "vue";
import {
  GetMomentListParams,
  GetMomentInfoRes,
} from "@/service/api/moment/type";
import { getMomentList } from "@/service/api/moment";

interface useMomentListFnRes {
  listData: Ref<GetMomentInfoRes[]>;
  isDisabled: Ref<boolean>;
  load: () => void;
  listCounts: Ref<number>;
}

// 列表hook
const useMomentList = (): useMomentListFnRes => {
  const momentListParams = ref<GetMomentListParams>({
    timestamp: new Date().toISOString(),
    size: 6,
  });

  // 加载锁
  const isDisabled = shallowRef<boolean>(true);

  // 列表数据
  const listData = ref<GetMomentInfoRes[]>([]);

  // 数据总数
  const listCounts = shallowRef<number>(0);

  // 初始化列表
  const initListData = async () => {
    const result = await getMomentList(momentListParams.value);
    listCounts.value = result.counts;

    momentListParams.value.timestamp =
      result.data[result.data?.length - 1].createAt;
    listData.value?.push(...result.data);
    listData.value.length >= listCounts.value
      ? (isDisabled.value = true)
      : (isDisabled.value = false);
  };

  const load = () => {
    isDisabled.value = true;
    initListData();
  };

  onMounted(() => {
    initListData();
  });

  return { listData, isDisabled, load, listCounts };
};

export default useMomentList;
