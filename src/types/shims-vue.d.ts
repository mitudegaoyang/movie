/* eslint-disable */
// declare module "*.vue" {
//   import type { DefineComponent } from "vue";
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

export {};

declare module "vue" {
  import type { DefineComponent } from "vue";
  interface ComponentCustomProperties {
    component: DefineComponent<{}, {}, any>;
    $dayjs: typeof dayjs;
  }
}
