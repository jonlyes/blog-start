import { ref } from "vue";
import { CarouselItem, CardItem } from "./type";
import { carousel01, carousel02, carousel03 } from "@/assets/index";

export const carouselList = ref<CarouselItem[]>([
  {
    img: carousel01,
    title: "跟堂哥他们一起去东海岸玩，这一路上的黄昏好美",
  },
  {
    img: carousel02,
    title: "与好朋友们散步在校外街道，看看被雨水滋润了的景色",
  },
  {
    img: carousel03,
    title: "汕头一日游，跟吉他社的靓仔靓女们一日玩遍汕头",
  },
]);

export const introduceInfo = ref<CardItem[]>([
  {
    title: "文案栏",
    textList: [
      "满天繁星，有我想成为的那道光",
      "生活总是这样，不能叫人处处都满意。但我们还要热情地活下去。人活一生，值得爱的东西很多，不要因为一个不满意，就灰心",
      "洋葱、萝卜和西红柿不相信世界上有南瓜这种东西， 它们认为那是一种空想。 南瓜不说话， 默默地生长",
    ],
  },
  {
    title: "关于我",
    textList: [
      "处女座的广东靓仔",
      "喜欢编程、吉他、音乐、羽毛球",
      "山楂院学子，身在电商心在前端",
      "技术栈：vue3、typescript、node后端、mysql、elementPlus等组件库、webpack、vite、Echart、axios、git",
    ],
  },
  {
    title: "心愿贴",
    textList: [
      "拿到前端office",
      "有自己的车,可以全国自驾游",
      "去大理看看，没机会一起去，一个人去也挺好",
    ],
  },
]);
