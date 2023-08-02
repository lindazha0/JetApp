# JetApp

A simple web app using [Vue.js](https://vuejs.org/). The `jetApp` program contains functionalities like face recognition and management, TTS, image playing, and identity authentification, and is deployed on a `jetbot` based on [Nvidia Jetson Nano](https://developer.nvidia.com/embedded/jetson-nano).     
Since the full JetBot system is developed for a company I interned with previously, only part of the front-end code could be public here. **Only allowed for non-profit purposes**.     

## Overview
The Application includes the following functionalities:
- [Baidu face](https://intl.cloud.baidu.com/product/face.html) and [Tencent TTS](https://www.tencentcloud.com/products/tts) APIs are used for face comparison and dataset management, and audio functionalities, respectively.
- [Tracking.js](https://trackingjs.com/) applied for face recognition
- CSS and JS files implement the styles, layouts and image display, etc.

Due to some Confidentiality Agreements, only an original version is displayed here for learning and communication. As for language, basically, the front end uses purely `html/css+js` and the back end uses `Java` and `SQL` on `Docker`. More specifically, the backend uses a [framework](https://gitee.com/bewithmeallmylife/avocado-cloud) based on [Spring Boot](https://spring.io/projects/spring-boot), which is not included here. For the mechanism part, it is highly recommended to refer to [Nvidia Official Website](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetbot-ai-robot-kit/) for more information about the edge device and tutorials on AI & Equipment Kit.

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
