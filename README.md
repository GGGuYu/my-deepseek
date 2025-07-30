仿DeepSeek首页，自用AI聊天Web端


## 消息自动下滑

## messages更新防抖

## 循环更新问题
初始化的用chatinfo更新messages，此时不应该触发定时器再次去循环更新chatinfo
只能互斥锁试试

## useLayoutEffct防止闪屏

## 深度思考模式

## 修改已发送消息

## 异步suspense load

## 支持markdown渲染
react-markdown库