class RemHandle {
  private docElement: HTMLElement = document.documentElement;
  private dpr: number = window.devicePixelRatio || 1;

  constructor(private minWidth: number = 0) {
    this.init();
  }

  private init() {
    // adjust body font size
    this.setBodyFontSize();
    this.setResize();
    window.addEventListener('resize', this.setResize);
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        // 边界判断 页面时缓存拿出来的，例如是url的前进后退
        this.setResize();
      }
    });
  }

  private setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12.8 * this.dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", this.setBodyFontSize);
    }
  }

  private setResize=()=> {
    // 最小宽度边界判断
    if (Math.floor(this.docElement.clientWidth) > this.minWidth) {
      this.docElement.style.fontSize = this.docElement.clientWidth / 100 + "px";
    }
  }
}

export default RemHandle;
