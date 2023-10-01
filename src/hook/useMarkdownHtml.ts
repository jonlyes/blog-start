import { isRef, Ref, computed } from "vue";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";

const useMarkdownHtml = (markdown: Ref<string> | string) => {
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs github-dark-dimmed",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );
  
  const markdownHtml = computed(() => {
    const isMarkdownValue = isRef(markdown) ? markdown.value : markdown;
    return marked.parse(isMarkdownValue);
  });

  return markdownHtml;
};

export default useMarkdownHtml;
