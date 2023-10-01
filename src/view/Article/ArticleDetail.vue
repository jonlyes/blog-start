<script setup lang="ts">
import Finish from '@/components/Finish/Finish.vue';
import useArticleDetail from '@/hook/useArticleDetail'
import JDayjs from '@/utils/JDayjs';

const { content, title, createAt, updateAt } = useArticleDetail()
console.log(createAt.value);


</script>
<template>
    <div class="layout">
        <div class="title-box">
            <h1 class="title">{{ title }}</h1>
            <time class='time'>{{ JDayjs(createAt || '') }}</time>
        </div>

        <div class="content markdown-body" v-html="content">
        </div>
        <Finish>
            <p>更新于 {{ JDayjs(updateAt || '') }} </p>
        </Finish>
    </div>
</template>


<style lang="scss" scoped>
.layout {
    width: 50rem;
    height: 100%;
    margin-left: 25rem;
    padding: 1.3rem 2.6rem;
    color: 252933;
    position: relative;
    background-color: white;
    border-radius: 4px;
    box-shadow: inset;

    .title-box {
        width: 100%;
        height: 100%;
        padding-bottom: 16px;

        .title {
            font-size: 24px;
            font-weight: bold;
            margin: 0px;
            padding: 12px 0;

        }

        .time {
            font-size: 14px;
            color: #8a919f;
            text-align: center;
            line-height: 22px;
        }
    }

    .content {

        :deep(img) {
            max-width: 100% !important;
        }

        :deep(pre) {
            background-color: rgb(34, 39, 46);

            code::-webkit-scrollbar {
                height: 8px;
                border-radius: 8px;
                background-color: rgba(206, 203, 203);
            }

            code::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, .6);
                border-radius: 8px;
            }
        }

        :deep(blockquote) {
            color: #666 !important;
            background-color: #f8f8f8 !important;
            padding: 12px 16px;
        }
    }

    p {
        font-size: 12px;
        font-weight: 300;
    }
}
</style>


