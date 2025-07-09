import uniModule from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

// @ts-expect-error missing types
const Uni = uniModule.default || uniModule

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Uni(),
  ],
})
// import { defineConfig } from 'vite'
// import uni from '@dcloudio/vite-plugin-uni'

// // https://vitejs.dev/config/
// export default defineConfig(async () => {
//   const unoCSS = (await import('unocss/vite')).default;

//   return {
//     plugins: [
//       uni(),
//       unoCSS()
//     ],
//     css: {
//       preprocessorOptions: {
//         scss: {
//           silenceDeprecations: ['legacy-js-api']
//         },
//       },
//     },
//   }
// })
