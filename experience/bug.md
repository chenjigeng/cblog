# 使用react-rouer4.X遇到的问题

### 直接访问url后自定重定向
问题描述:
当我直接访问localhost/passage/1(id)的时候，会先进入passage/:id的界面，然后自动重定向到passage/list界面
原因：
因为我写了一个语句
```js
  <Redirect from='/passage' to='passage/list'></Redirect>
```
因此，当访问passage/1的时候，会重定向到passage/list界面

