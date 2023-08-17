<script setup lang="ts">
import { ref } from 'vue'
import { ConnectionItem } from './type'
import { github, QQ, juejin } from '@/assets/'


const connectionInfo = ref<ConnectionItem[]>([
    {
        url: 'https://github.com/jonlyes',
        icon: github,
        description: '访问我的github'
    },
    {
        url: 'tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=3236526598',
        icon: QQ,
        description: 'QQ联系我'
    },
    {
        url: 'https://juejin.cn/user/3910306990139735',
        icon: juejin,
        description: '访问我的掘金'
    }
])

const connectionToHandle = (url: string) => {
    window.open(url, '_blank')
}

</script>
<template>
    <div class="footer">
        <div>备案号XXXXXXX</div>
        <div class="connection">
            <el-tooltip class="box-item" effect="dark" v-for="item in connectionInfo" :content="item.description"
                placement="top">

                <img :src="item.icon" @click="connectionToHandle(item.url)">
            </el-tooltip>
        </div>
        <div>少年郎的光，应当绽放于镜中眸眼！</div>
    </div>
</template>


<style lang="scss" scoped>
.footer {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    color: black;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 400;
    font-family: "HuangLong", sans-serif;

    .connection {
        display: flex;
        img {
            margin: 0 20px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;

        }
    }
}
</style>
