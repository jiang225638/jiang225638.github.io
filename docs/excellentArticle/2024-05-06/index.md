# 前端视频人像实时捕获技术,超干货!!!



### **简介**

**假如有一天, 客户提需求 要我门从摄像头监控中 进行动态人像识别 捕获 ;我们该如何 来完成这一需求呢?**

近年来，计算机视觉和机器学习的进步促成了视频流中物体检测的突破性发展。这项技术在各个领域得到了广泛应用，包括安全、监控，甚至是创意性的影视制作。在本文中，我们将在`coco-ssd.js` 模型基础上 深入探讨专门用于实时捕获人类主体的视频对象检测前端实现。

### **技术理解**

这项技术的核心在于利用预训练的机器学习模型，如 COCO-SSD（上下文中的常见对象 - 单次多框检测器）。这些模型是在包含大量对象类别的广泛数据集上进行训练的，使它们能够准确地识别和定位图像或视频帧中的物体。

### **COCO-SSD 模型**

COCO-SSD 以其高精度检测各种物体的能力脱颖而出。该模型在 COCO 数据集上进行了训练，该数据集包含超过 33 万张图像，涵盖了 80 个不同的对象类别，因此能够精准识别日常场景中的常见对象。

### **实时视频流处理**

通过使用 TensorFlow.js 将 COCO-SSD 集成到前端 Web 应用程序中，开发人员可以直接在浏览器环境中执行实时对象检测。这消除了对复杂的服务器端处理的需求，使其能够与网络摄像头或其他来源的视频流无缝集成。

### **实现概述**

让我们来探讨一个基本的前端视频对象检测实现，专门用于实时捕获人类主体。以下是一个简化的 HTML 文档，嵌入了 JavaScript 代码来实现这一功能：

### **代码操作实现**

我讲需要用到一个第三方模型识别库  `coco-ssd.js` 和`tfjs@3.11.0.js`

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视频人像捕获</title>
   <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>    <style>
        #overlay {
            position: absolute;
            border: 2px solid red;
            display: none;
        }
    </style>
</head>
<body>
<video id="video" width="640" height="480" autoplay></video>
<div id="overlay"></div>
```

1. `<head>` 部分包含了所需的 `<script>` 标签，其中包括 TensorFlow.js 和 COCO-SSD 模型的引用。
2. 关于模型引用 在线对网络要求比较高 建议下载本地咋使用 https://www.tensorflow.org/js 官网
3. 页面中有一个 `<video>` 元素用于显示视频流，以及一个 `<div> `元素作为覆盖层，用于在检测到人像时叠加边框。

### **JavaScript 部分**

```
  <script>
   document.addEventListener('DOMContentLoaded', () => {
      const video = document.getElementById('video');
      const overlay = document.getElementById('overlay');

      // 加载 COCO-SSD 模型
      cocoSsd.load().then(model => {
         console.log('模型加载成功');

         // 开始视频流
         navigator.mediaDevices.getUserMedia({video: true})
         .then(stream => {
            video.srcObject = stream;
            video.play();
         })
         .catch(error => {
            console.error('访问摄像头出错：', error);
         });

         // 在视频流上进行对象检测
         video.addEventListener('play', () => {
            setTimeout(() => {
               setInterval(() => {
                  detectObjects(model);
               }, 10); // 每秒检测一次
            }, 1000);

         });
      });
```

1. DOMContentLoaded 事件监听器确保了当文档完全加载后再执行 JavaScript 代码。
2. video 和 overlay 分别获取了视频元素和覆盖层元素。
3. 使用 cocoSsd.load().then(model => {...}) 异步加载 COCO-SSD 模型。
4. 使用 navigator.mediaDevices.getUserMedia() 获取用户媒体（视频流）并将其赋值给元素的 srcObject 属性，然后播放视频流。
5. addEventListener 监听了视频的 play 事件，一旦视频开始播放，便开始对象检测。

```
// 对视频流进行对象检测
async function detectObjects(model) {
// 使用 COCO-SSD 模型进行对象检测
const predictions = await model.detect(video);
const specifiedObject = predictions.find(prediction => {
return prediction.class === 'person';
 });
          // 如果找到了指定的对象
  if (specifiedObject) {
 // 更新 overlay 的位置使其跟随指定对象
const bbox = specifiedObject.bbox;
overlay.style.left = `${bbox[0]}px`;
overlay.style.top = `${bbox[1]}px`;
overlay.style.width = `${bbox[2]}px`;
overlay.style.height = `${bbox[3]}px`;
overlay.style.display = 'block';
} else {
    overlay.style.display = 'none';
 }
}
});
```

1. detectObjects 函数用于执行对象检测。它接收加载的 COCO-SSD 模型作为参数。
2. 使用 model.detect(video) 对视频中的对象进行检测，返回一个包含对象预测结果的数组。
3. 使用 predictions.find() 方法查找包含类别为 'person' 的预测结果。
4. 如果找到了类别为 'person' 的对象，就更新覆盖层的位置和尺寸，以及显示覆盖层；否则隐藏覆盖层。

**通过这种方式，我们可以实现在前端对视频中的人像进行实时捕获，并在画面中标识出人物的位置。**

**如果是一张静态图片, 我们需要从用户 拍摄的人脸照片 来完成 人脸识别功能 该如何去做呢?**

**详情请看下期。**

**图像人脸识别技术**





