# JetApp

A simple web app using [Vue.js](https://vuejs.org/). The `jetApp` program contains functionalies like face recogenition and management, TTS, image playing, and identity authentification, and deployed on an `jetbot` based on [Nvidia Jetson Nano](https://developer.nvidia.com/embedded/jetson-nano).     
Since the full JetBot system is developed for a companry I interned previously, only part of the frontend code could be public here. **Only allowed for non-profit purpose**.     

## Overview
The Application includes following functionalities:
- Baidu and Tencent APIs are used for face dataset management and TTS functionalities.
- `Tracking` for face recogenition
- CSS and JS files implements the styles, layouts and image display, etc.

Due to the some Confidentiality Agreements, only an original version is displayed here for learning and communication. As for language, basically the frontend uses purely `html/css+js` and the backend uses `Java` and `SQL` on `Docker`. More specifically, the backend uses a [framework](https://gitee.com/bewithmeallmylife/avocado-cloud) based on [Spring Boot](https://spring.io/projects/spring-boot), which is not included here. For the  mechanism part, it is highly recommended to refer to [Nvidia Official Website](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetbot-ai-robot-kit/) for more information about the edge device and tutorials on AI & equipment Kit.

## Vue Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
More about Vue-cli please see [Configuration Reference](https://cli.vuejs.org/config/).
