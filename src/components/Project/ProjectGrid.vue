<script setup lang="ts">
import { PropType } from 'vue'
import { GetProjectInfoRes } from "@/service/api/project/type";
// import { dayjs } from 'element-plus'
import JDayjs from '@/utils/JDayjs'


defineProps({
    data: {
        require: true,
        type: Array as PropType<GetProjectInfoRes[]>,
    }
})

const goProjectFn = (url: string) => {

    window.open(url, '_blank')
}

</script>
<template>
    <div class="project-grip">
        <div class="grip-item" v-for="item in data" :key="item.id">
            <el-card class="card-box" shadow="hover" :body-style="{ padding: '0px' }">
                <div class="cover-box">
                    <el-image class="cover" :src="item.cover" fit="fill" />
                    <div class="title-box">
                        <span>{{ item.title }}</span>
                    </div>
                </div>
                <div class="intro">
                    <span>{{ item.description }}</span>
                </div>
                <div class="publish-info">
                    <time>{{ JDayjs(item.createAt) }}</time>
                    <span class="detail" @click="goProjectFn(item.link)">详情<el-icon>
                            <ArrowRightBold />
                        </el-icon></span>
                </div>
            </el-card>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.project-grip {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.34rem 2.08rem;
    align-items: start;

    .grip-item {
        text-align: center;
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;

        .card-box {
            width: 100%;
            height: 100%;
            position: relative;


            .cover-box {
                width: 100%;
                // 设置宽高比为 4:3
                aspect-ratio: 4 / 3;
                overflow: hidden;
                position: relative;

                .cover {
                    object-fit: cover;
                    // border-radius: 8px;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(34, 34, 34, .1);
                    }
                }

                .title-box {
                    box-sizing: border-box;
                    position: absolute;
                    bottom: 0px;
                    width: 100%;
                    height: 2.69rem;
                    line-height: 2.69rem;
                    padding: 0 1.56rem;
                    font-size: 1.56rem;
                    font-weight: 400;
                    font-family: "Segoe UI", "Helvetica Neue", sans-serif;
                    text-align: left;
                    box-sizing: border-box;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: white;
                    z-index: 99;
                }

            }


            .intro {
                padding: 0.91rem 1.56rem;
                line-height: 1.56rem;
                font-size: 1.04rem;
                font-weight: 600;
                text-align: left;
                font-family: "Segoe UI", "Helvetica Neue", sans-serif;

                span {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            }

            .publish-info {
                bottom: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-content: center;
                padding: 0.78rem 1.56rem;
                font-family: "Segoe UI", "Helvetica Neue", sans-serif;
                font-size: 14px;
                font-weight: 400;

                time {
                    height: 20px;
                    line-height: 20px;
                }

                .detail {
                    height: 20px;
                    line-height: 20px;
                    font-weight: 500;
                }
            }
        }
    }
}
</style>
