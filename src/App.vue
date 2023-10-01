<script setup lang="ts">
import { shallowRef, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElScrollbar } from 'element-plus'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'
import RemHandle from '@/utils/RemHandle'
import { ScrollEvent } from './type'

const route = useRoute()
const remHandle = RemHandle.getInstance()

// 404页面
const isNotFound = shallowRef<boolean>(false)

// 导航箭头
const isShow = shallowRef<boolean>(false)

// 箭头锁(大于800直接不显示箭头并锁住不允许被操作)
const arrowLock = shallowRef<boolean>(true)

// 滚动条实例
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

// 监视路由name
watch(() => route.name, (val) => {

  isNotFound.value = val !== 'NotFound'

  if (val === 'jonlyes') {
    remHandle.addRemFn(resizeHandleFn, true)
  } else {
    setTimeout(() => {
      remHandle.removeRemFn(resizeHandleFn)
    }, 0);
    isShow.value = false
    arrowLock.value= false
  }

}, { immediate: true })


// remHandle的回调
const resizeHandleFn = (document: HTMLElement) => {
  if (document.clientHeight > 800) {
    isShow.value = false
    arrowLock.value = false
  } else {
    isShow.value = true
    arrowLock.value = true
  }
}


// 滚动事件
const scrollHandle = (event: ScrollEvent) => {
  if (route.name !== 'jonlyes') return
  if (!arrowLock.value) {
    isShow.value = false
  } else {
    isShow.value = event.scrollTop > 200 ? false : true
  }

}

// 设置滚动距离
const scrollToHandle = () => {
  scrollbarRef.value?.setScrollTop(600)
}



</script>
<template>
  <div class="layout">
    <el-scrollbar ref="scrollbarRef" height="100vh" @scroll="scrollHandle" :always="true">
      <div class="page">
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
      </div>
    </el-scrollbar>
  </div>
</template>


<style lang="scss" scoped>
.layout {
  background-color: rgb(222, 229, 231);
  // width: 100%;
  // height: 100%; /* 或者设置一个具体的高度 */
  // background-image: url('./assets/背景2.jpg');
  // background-repeat: repeat-y;
  // background-size:cover ;


  :deep(.el-scrollbar__bar) {
    z-index: 999 !important;

    div {
      opacity: .8;
    }
  }

  .page {
    width: 100vw;
    min-width: 1000px;
  }
  .el-header{
    // background-color: rgba(255,255,255,.7);
    // margin-bottom: 40px;
  }

  .el-main {
    overflow: hidden;
  }

  .el-footer {
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
    z-index: 19;

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
