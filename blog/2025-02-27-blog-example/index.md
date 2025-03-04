---
slug: 博客示例
title: 博客示例
authors: [laker_tj]
tags: [note, hello, docusaurus]
---

[Docusaurus blogging features](https://docusaurus.io/docs/blog) are powered by the [blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).

Docusaurus 博客功能示例

<!-- truncate -->

只需将 Markdown 文件（或文件夹）添加到 `blog` 目录即可。

常规博客作者可以添加到 `authors.yml`。

可以从文件名中提取博客文章日期，例如：

- `2019-05-30-welcome.md`
- `2019-05-30-welcome/index.md`

博客文章文件夹可以方便地将博客文章图像放在一起：

![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)

博客也支持标签！

**如果您不想要博客**：只需删除此目录，然后在 Docusaurus 配置中使用 `blog: false`。