<script setup lang="ts">
import { carouselList, introduceInfo } from './config'


</script>
<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel :interval="20000" type="card" height="30rem">
        <el-carousel-item v-for="(item, index) in carouselList" :key="index">
          <div class="carousel-item">
            <el-image :src="item.img" fit="cover" />
            <div class="title">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 介绍 -->
    <div class="introduce">
      <el-card class="box-card" v-for="(card, index) in  introduceInfo" :key="index" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ card.title }}</span>
          </div>
        </template>
        <li class="text" v-for="(text, index) in card.textList" :key="index">{{ text }}</li>
      </el-card>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;

  .carousel {
    padding: 0 20px;

    .el-carousel__mask {
      background-color: white !important;
      opacity: 1 !important;
      ;
    }

    .carousel-item {
      width: auto;
      height: 100%;
      background-color: none;
      overflow: hidden;
      position: relative;

      .el-image {
        width: 100%;
        height: 100%;
      }

      .title {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        top: 0;
        z-index: 9;
        font-size: 1.3rem;
        font-weight: 800;
        color: white;
        font-family: "HuangLong", sans-serif;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        span {
          width: 80%;
          text-align: center;
          position: absolute;
          top: 20%;
        }
      }
    }
  }

  .introduce {
    width: 70%;
    margin: 0 15%;
    margin-top: 80px;
    box-sizing: initial;
    display: flex;
    justify-content: space-between;

    .box-card {
      width: 30%;
      height: auto;
      background-color: rgba(255, 255, 255, .6);

      .card-header {
        justify-content: center;
        text-align: center;
        font-family: "HuangLong", sans-serif;
        font-size: 1.56rem;
        font-weight: 200;
        font-style: oblique;
      }

      .text {
        margin: 10px 0;
        line-height: 28px;
        font-style: italic;
        font-size: 1.04rem;
      }
    }
  }
}
</style>
