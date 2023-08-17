<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Astral from '@/components/Astral/Astral.vue';
import errImg from '@/assets/404.png'
import { useIntervalFn } from '@vueuse/core'
import { useRouter, Router } from 'vue-router';

const router: Router = useRouter()

// 倒计时数字
const count = ref<number>(10)

// 倒计时函数
const countDown = () => {
    const { pause } = useIntervalFn(() => {
        if (count.value > 0) {
            count.value--
        } else {
            pause()
            // 跳转登录页
            toJonlyes()
        }
    }, 1000)
}

//进度条百分比
const percent = ref<number>(0)

// 进度条函数
const countPercent = () => {
    const { pause, } = useIntervalFn(() => {
        if (percent.value < 100) {
            percent.value++
        } else {
            pause()
        }
    }, 100)
}

// 跳转到jonlyes页面
const toJonlyes = () => {
    router.push('/')
}

onMounted(() => {
    countDown()
    countPercent()
})

</script>
<template>
    <Astral :style="{ width: '100vw', height: '100vh' }">
        <div class="down" @click="toJonlyes">{{ count }} S 跳转</div>
        <div class="dao">
            <el-progress type="circle" :percentage="percent" :width="60" @click="toJonlyes" />
        </div>
        <img :src="errImg" class="myimg" alt="">
    </Astral>
</template>


<style lang="scss" scoped>
.down {
    position: absolute;
    left: 20px;
    top: 20px;
    border: 1px solid #fff;
    color: #fff;
    width: 70px;
    height: 30px;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
}


.myimg {
    width: 270px;
    height: 270px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 10;
}


.dao {
    position: absolute;
    top: 20px;
    right: 20px;

    :deep .el-progress__text {
        color: white;
    }
}
</style>
