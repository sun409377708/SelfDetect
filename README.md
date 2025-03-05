# SelfDetect - 自测健康应用

## 项目介绍

SelfDetect 是一个基于 HTML5 的健康自测应用，提供多种视力测试功能，帮助用户自我评估视力健康状况。应用采用响应式设计，适配各种移动设备和桌面浏览器。

## 功能特点

### 视力测试

- **E字视力表测试**：传统视力检查方法，通过识别不同方向的E字来评估视力
- **色盲测试**：提供多种色盲测试图片，帮助用户检测色盲情况
- **散光测试**：通过特殊图形测试用户是否存在散光
- **颜色敏感度测试**：测试用户对颜色差异的敏感程度

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- 响应式设计

## 项目结构

```
├── css/                # 样式文件
│   ├── fixes.css       # 修复样式
│   ├── history.css     # 历史记录页面样式
│   ├── prototype.css   # 原型页面样式
│   ├── result.css      # 结果页面样式
│   ├── style.css       # 主样式文件
│   ├── test.css        # 测试页面样式
│   └── vision.css      # 视力测试样式
├── images/             # 图片资源
│   ├── cb*.gif         # 色盲测试图片
│   └── sanguang.jpeg   # 散光测试图片
├── js/                 # JavaScript 文件
│   ├── chart.min.js    # 图表库
│   ├── history.js      # 历史记录功能
│   ├── main.js         # 主要功能
│   ├── navigation.js   # 导航功能
│   ├── prototype.js    # 原型功能
│   ├── result.js       # 结果处理
│   ├── test.js         # 测试功能
│   └── vision.js       # 视力测试功能
├── index.html          # 主页面
├── vision.html         # 视力测试页面
└── README.md           # 项目说明文档
```

## 使用方法

1. 克隆仓库到本地：
   ```bash
   git clone git@github.com:sun409377708/SelfDetect.git
   ```

2. 使用浏览器打开 `index.html` 文件或部署到 Web 服务器

3. 选择需要进行的测试类型

4. 按照页面指示完成测试并查看结果

## 视力测试说明

### E字视力测试

- 测试显示不同大小和方向的E字
- 用户需要选择E字开口的方向（上、下、左、右）
- 根据用户的正确率计算视力分数

### 色盲测试

- 显示伊希哈拉色盲测试图
- 用户需要识别图中的数字或图形
- 根据用户的回答判断是否存在色盲情况

### 散光测试

- 显示放射状线条图形
- 用户需要选择看到的最清晰的方向
- 根据用户的选择判断是否存在散光及其类型

### 颜色敏感度测试

- 显示四个颜色方块，其中一个与其他三个略有不同
- 用户需要选择不同的颜色方块
- 测试逐渐增加难度，减小颜色差异
- 根据用户能够识别的最小颜色差异评估颜色敏感度

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参见 LICENSE 文件

## 联系方式

如有任何问题或建议，请通过 GitHub Issues 与我们联系。
