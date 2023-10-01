<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { storeToRefs } from 'pinia'
import { TabItem } from './type';
import avatar from '@/assets/avatar.jpg'
import { useAuthStore } from '@/store/useAuthStore';
import Login from '@/components/Login/Login.vue'

const route: RouteLocationNormalizedLoaded = useRoute()

const authStore = useAuthStore()
const { isLogin } = storeToRefs(authStore)

const tabList = ref<TabItem[]>(
    [{
        label: 'Jonlyes',
        path: '/',
        isShow: shallowRef<boolean>(true)
    }, {
        label: 'Article',
        path: '/article',
        isShow: shallowRef<boolean>(true)
    }, {
        label: 'Project',
        path: '/project',
        isShow: shallowRef<boolean>(true)
    },
    {
        label: 'Moment',
        path: '/moment',
        isShow: shallowRef<boolean>(true)
    },
    {
        label: 'Admin',
        path: '/admin',
        isShow: isLogin
    }
    ])

const showTabList = computed(() => {
    return tabList.value.filter((item) => {
        return item.isShow
    })
})


</script>
<template>
    <div class="tab-box">
        <div class="tab-left">
            <Login>
                <img :src="avatar">
            </Login>
        </div>
        <div class="tab-title">
            <span>jonleyes' personal blog</span>
        </div>
        <div class="tab-right">
            <div class="tab-item" v-for="(item, index) in  showTabList " :key="index" :class="{
                active: item.path === '/' ? route.path === item.path : route.path.includes(item.path)
            }" @click="$router.push(item.path)">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.tab-box {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(66, 66, 66,);

    .tab-left {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;

        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: none;
            cursor: pointer;
        }
    }

    .tab-title {
        color: black;
        font-size: 1.56rem;
        font-weight: bold;
        font-family: "HuangLong", sans-serif;
        ;
        font-style: oblique;
        opacity: .8;
    }

    .tab-right {
        width: auto;
        display: flex;
        align-items: center;

        .tab-item {
            width: auto;
            height: 40px;
            line-height: 40px;
            padding: 0 1.3rem;
            cursor: pointer;
            color: black;
            font-size: 1.3rem;
            font-family: "HuangLong", sans-serif;
            font-weight: bold;


            &:hover {
                color: rgb(77, 77, 196);
            }

        }

        .active {
            border-radius: 8px;
            color: rgb(77, 77, 196);
            background-color: #b2b23b;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0);
                opacity: 0;
                z-index: 1;
                border-radius: 8px;
            }

            &:hover::before {
                opacity: .1;
            }

        }

    }
}
</style>
