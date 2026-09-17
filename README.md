# 企业与合同管理前端实验项目

这是一个 Vue 3 + script setup + Element Plus + TypeScript + Axios 的前端实验项目，适用于企业与合同管理场景。

## 项目简介

该项目实现了两大管理模块：

- 企业管理：列表查询、分页、添加、编辑、删除、文件上传、表单校验。
- 合同管理：企业列表展开行查看合同、合同新增弹窗、状态标签、文件预览与下载、已归档禁用操作。

## 技术栈

- Vue 3
- Vue Router
- Element Plus
- Axios
- TypeScript
- Vite

## 目录结构

```bash
src/
  apis/
    request.ts
    enterprise.ts
    contract.ts
  mock/
    data.ts
  router/
    index.ts
  types/
    index.ts
  views/
    EnterpriseListView.vue
    EnterpriseFormView.vue
  App.vue
  main.ts
  style.css
```

## 运行方式

```bash
npm install
npm run dev
```

默认访问地址：

```text
http://localhost:5173
```

## 功能说明

### 企业管理

- 企业名称模糊查询
- 分页展示
- 新增、编辑、删除
- 删除前二次确认弹窗
- 表单复用页面处理新增/编辑逻辑
- 营业执照图片上传与回显
- 文件类型校验与容量校验

### 合同管理

- 表格展开行查看企业对应合同
- 合同新增弹窗
- 楼宇、日期范围、文件上传
- 状态标签展示
- 文件预览与下载
- 已归档合同禁用按钮

## 实验要求对照

- 代码规范：已统一在 apis 与 types 目录中维护
- 接口封装：使用 axios 封装 + mock 模拟数据访问
- 关键交互：删除确认、消息提示、上传校验、路由参数切换
- 可扩展性：支持继续接真实后端接口

## 测试记录模板

请在 Chrome 浏览器中进行功能测试，并保留截图。建议记录以下内容：

- 企业列表分页正常
- 查询关键字生效
- 新增企业成功并回到列表
- 编辑���业回显正确
- 删除企业弹窗确认
- 上传营业执照图片成功
- 合同新增弹窗确认可用
- 文件预览与下载功能正常
- 已归档合同禁用按钮

更多详细测试清单见 `TESTING.md`。
