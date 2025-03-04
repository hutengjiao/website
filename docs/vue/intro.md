---
sidebar_position: 2
---

# Tutorial Intro

## 1. 数据绑定

### 1.1 双向数据绑定

- 在模板中使用 `[(ngModel)]` 指令
- 在组件中使用 `@Input` 和 `@Output` 装饰器

```html
<input [(ngModel)]="name" />
<p>{{ name }}</p>
```
