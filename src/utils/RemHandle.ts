import { RemFnType } from "./type";
// 单例模式

class RemHandle {
  private static instance: RemHandle | null = null;
  private docElement: HTMLElement = document.documentElement;
  private dpr: number = window.devicePixelRatio || 1;
  private fns: RemFnType[] = [];
  private constructor(private minWidth: number = 0) {
    this.init();
  }

  public static getInstance(minWidth: number = 0): RemHandle {
    if (!RemHandle.instance) {
      RemHandle.instance = new RemHandle(minWidth);
    }
    return RemHandle.instance;
  }

  // 添加回调(回调会在setResize里执行)
  public addRemFn = (fn: RemFnType, immediate: boolean = false) => {
    if (!this.fns.includes(fn)) {
      immediate ? fn(this.docElement) : fn;
      this.fns.push(fn);
    }
  };

  // 删除回调
  public removeRemFn = (fn: RemFnType) => {
    const index = this.fns.indexOf(fn);
    if (index !== -1) {
      this.fns.splice(index, 1);
    }
  };

  private init() {
    // 调整body字体大小
    this.setBodyFontSize();
    this.setResize();
    window.addEventListener("resize", this.setResize);
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        // 边界判断 页面时缓存拿出来的，例如是url的前进后退
        this.setResize();
      }
    });
  }

  // 调整body字体大小
  private setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12.8 * this.dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", this.setBodyFontSize);
    }
  }

  private setResize = () => {
    // 最小宽度边界判断
    if (Math.floor(this.docElement.clientWidth) > this.minWidth) {
      this.docElement.style.fontSize = this.docElement.clientWidth / 100 + "px";
    }
    // 遍历执行fns
    this.fns.forEach((fn) => {
      fn(this.docElement);
    });
  };
}

export default RemHandle;
