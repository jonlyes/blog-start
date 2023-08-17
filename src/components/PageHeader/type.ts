import { Ref } from "vue";

export interface TabItem {
  label: string;
  path: string;
  isShow: boolean | Ref<boolean>;
  SubmenuList?: TabItem[];
}
