# Vue Calc

> A Simple VueJS's Calculator built with ElectronJS

**Last Releases** [link](https://github.com/el3um4s/vue-calc/releases)
  - [Portable Windows 32bit](https://github.com/el3um4s/vue-calc/releases/download/v0.18.04.15/vue-calc-32bit.exe)
  - [Portable Windows 64bit](https://github.com/el3um4s/vue-calc/releases/download/v0.18.04.15/vue-calc-64bit.exe)
  - [Linux (.appimage 32bit)](https://github.com/el3um4s/vue-calc/releases/download/v0.18.04.15/vue-calc-i386.AppImage)
  - [Linux (.appimage 64bit)](https://github.com/el3um4s/vue-calc/releases/download/v0.18.04.15/vue-calc-x86_64.AppImage)

![screenshot](https://raw.githubusercontent.com/el3um4s/vue-calc/master/altro/screenshot.JPG)

**Version** 0.18.04.06

**License** MIT © 2017-2018 - Samuele de Tomasi

**GitHub** [el3um4s/vue-calc](https://github.com/el3um4s/vue-calc/)

**Created with:**
  - Vue.js
  - Vuetify
  - Electron-vue
  - decimal.js
  - Google Font Roboto
  - Google Font Mina
  - vue-shortkey
  - electron-store
  
**Icons** created by [Arslan Şahìn](https://twitter.com/arslansahin)

**Note about Calculator Logic:** It should be noted that there are two main schools of thought on calculator input logic: immediate execution logic and formula logic. Formula logic observes order of operation precedence, immediate execution does not. **Vue Calc utilizes immediate execution logic**.

Either is acceptable, but please note that depending on which you choose, your calculator may yield different results than ours for certain equations (see below example)

`3 + 5 x 6 - 2 / 4 =`
 * Immediate Execution Logic: 11.5
 * Formula/Expression Logic: 32.5
