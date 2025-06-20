/// <reference types='@dcloudio/types' />
/// <reference types='@tuniao/tnui-vue3-uniapp/global.d.ts' />
import 'vue'

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance;

  interface ComponentCustomOptions extends Hooks {

  }
}
