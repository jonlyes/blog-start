<script setup lang="ts">
import { shallowRef, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElScrollbar } from 'element-plus'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'
import { ScrollEvent } from './type'

const route = useRoute()

// 404页面
const isNotFound = shallowRef<boolean>(false)

// 导航箭头
const isShow = shallowRef<boolean>(false)

// scrollbarRef
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

// 监视路由name
watch(() => route.name, (val) => {
  isNotFound.value = val !== 'NotFound'
  isShow.value = val === 'jonlyes'
}, { immediate: true })

// 滚动事件
const scrollHandle = (event: ScrollEvent) => {
  if (route.name === 'jonlyes') {
    isShow.value = event.scrollTop > 200 ? false : true
  }
}

// setScrollTo
const scrollToHandle = () => {
  scrollbarRef.value?.setScrollTop(600)
}


</script>
<template>
  <div class="layout">
    <el-scrollbar ref="scrollbarRef" height="100vh" @scroll="scrollHandle">
      <el-container>
        <el-header height="100px" v-if="isNotFound">
          <PageHeader />
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <Transition name="blog">
              <keep-alive include="blog">
                <component :is='Component' />
              </keep-alive>
            </Transition>
          </router-view>
        </el-main>
        <el-footer v-if="isNotFound">
          <PageFooter />
        </el-footer>
        <div class="scroll-down" v-if="isShow">
          <el-icon>
            <ArrowDown @click="scrollToHandle" />
          </el-icon>
        </div>
      </el-container>
    </el-scrollbar>
  </div>
</template>


<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  background-color: rgb(222, 229, 231);

  .el-main {
    overflow: hidden;
  }
  .el-footer{
    margin-top: 60px;
  }

  .scroll-down {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0px;
    z-index: 99;

    .el-icon {
      color: black;
      font-size: 32px;
      cursor: pointer;
      animation: icon-shake 0.5s ease-in-out infinite alternate;

    }

  }
}

@keyframes icon-shake {
  0% {
    transform: translateY(0);
    opacity: 0.4;
  }

  100% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

// vue 内置动画
.blog-enter-active {
  opacity: 1;
  transform: translateY(0px);
  transition: all 0.8s ease;

}

.blog-enter-from {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}
</style>
