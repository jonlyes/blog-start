<script setup lang="ts">
// import { ref } from "vue";
import useArticleDetail from "@/hook/useArticleDetail";
import JMavonEditor from "@/components/Article/JMavonEditor.vue";

const { title, content } = useArticleDetail();
</script>
<template>
  <JMavonEditor
    v-if="content"
    :content="content"
    :title="title"
    type="update"
  ></JMavonEditor>
</template>

<style lang="scss" scoped></style>
