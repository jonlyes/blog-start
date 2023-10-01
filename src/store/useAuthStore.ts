import { shallowRef, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { login } from "@/service/api/auth";
import { LoginParams, LoginRes } from "@/service/api/auth/type";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const router = useRouter();

    const authToken = shallowRef<string>("");
    const isLogin = computed(() => {
      return authToken.value !== "";
    });

    // 登录
    const loginHandle = async (loginData: LoginParams) => {
      const res: LoginRes = (await login(loginData)).data;
      if (res?.token !== "" && res?.token !== undefined) {
        authToken.value = res?.token;
      }
    };

    // 登出
    const logoutHandle = () => {
      ElMessageBox.alert("是否退出登录?", "提示", {
        confirmButtonText: "确认",
        showCancelButton: true,
        cancelButtonText: "取消",
        callback: (action: Action) => {
          if (action === "confirm") {
            authToken.value = "";
            router.push("/");
            ElMessage({
              type: "success",
              message: `登出成功`,
            });
          }
        },
      });
    };

    return {
      isLogin,
      authToken,
      loginHandle,
      logoutHandle,
    };
  },
  {
    persist: {
      key: "authStore",
      storage: sessionStorage,
    },
  }
);
