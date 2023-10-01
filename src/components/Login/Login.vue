<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/useAuthStore';
import { LoginInfo } from './type'
import { FormInstance, FormRules } from 'element-plus'

const authStore = useAuthStore()
const { isLogin } = storeToRefs(authStore)

const disabled = shallowRef<boolean>(false)
const isShowDialog = shallowRef<boolean>(false)

// 表单实例
const loginForm = ref<FormInstance>()

// 登录数据
const loginInfo = ref<LoginInfo>({
  username: '',
  password: ''
})

// 表单校验规则
const loginRules = ref<FormRules>({
  username: {
    required: true,
    trigger: ['blur'],
    message: '请输入用户账号'
  },
  password: {
    required: true,
    trigger: ['blur'],
    message: '请输入用户密码'
  }
})

// 禁用登录按钮
const isLoginBtn = shallowRef<boolean>(false)

// 取消按钮
const onCancel = () => {
  loginInfo.value.username = ''
  loginInfo.value.password = ''
  isShowDialog.value = false;
}

// 登录
const onLogin = (data: LoginInfo) => {
  // 禁用登录按钮防抖
  isLoginBtn.value = true

  // 校验表单
  loginForm.value?.validate((valid) => {
    if (valid) {
      // 调用store的login函数
      authStore.loginHandle(data)
      isLoginBtn.value = false
      if (isLogin) {
        isShowDialog.value = false
      }
    }
  })

}


</script>
<template>
  <div class="login-box">
    <!-- tooltip -->
    <el-tooltip :disabled="disabled" placement="bottom" effect="light" trigger="contextmenu">
      <slot></slot>
      <template #content>
        <div class="tooltip-menu">
          <span @click="isShowDialog = true" v-if="!isLogin">登录</span>
          <span @click="authStore.logoutHandle" v-else>登出</span>
        </div>
      </template>
    </el-tooltip>

    <!-- 登录弹窗 -->
    <el-dialog v-model="isShowDialog" width="30rem" align-center :show-close="false">

      <!-- 头部标题 -->
      <template #header>
        <div class="header-box"><span class="title">登录</span></div>
      </template>

      <!-- 登录表单 -->
      <el-form :model="loginInfo" size="large" ref="loginForm" :rules="loginRules">
        <el-form-item label="用户账号：" prop="username">
          <el-input v-model="loginInfo.username" autocomplete="off" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item label="用户密码：" prop="password">
          <el-input v-model="loginInfo.password" type="password" :show-password="true" autocomplete="off"
            placeholder="请输入用户密码" />
        </el-form-item>
      </el-form>

      <!-- 登录按钮 -->
      <template #footer>
        <div class="btn-box">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" :disabled="isLoginBtn" @click="onLogin(loginInfo)">登录</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>


<style lang="scss" scoped>
.tooltip-menu {
  width: 40px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}

.login-box {
  :deep(.el-dialog) {
    background-color: rgb(222, 229, 231);
    border-radius: 20px;
    overflow: hidden;
  }

  .header-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


    .title {
      text-align: center;
      font-size: 1.82rem;
      font-family: "HuangLong", sans-serif;
      font-weight: 100;
      color: rgba(0, 0, 0, .8);

    }
  }

  :deep(.el-form-item__label) {
    font-weight: 800;
  }


  .btn-box {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 2.6rem;
    box-sizing: border-box;

    .el-button {
      width: 120px;
      height: 40px;
    }

  }


}
</style>
