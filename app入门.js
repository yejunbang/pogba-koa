const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// 注册成中间件, 默认只注册一个中间件, 需要显示调用next才能调用下一个中间件
// koa洋葱模型，下面会打印 1，3，4，2
// 且中间件一定要加 async await, 保证洋葱模式, 且还可以 return，但中间件多，不能保证洋葱执行的顺序，也就拿不到return的内容，可使用ctx传参

// app.use(async (ctx, next) => {
//   console.log("====output====>>>>1111");
//   const result = await next();
//   console.log("====output====>>>>", result);
//   console.log("====output====>>>>2222");
// });

// app.use(async (ctx, next) => {
//   console.log("====output====>>>>3333");
//   // await next()
//   // 还可以return
//   console.log("====output====>>>>4444");
//   return "abc";
// });

// app.use(async (ctx, next) => {
//   console.log("====output====>>>>", ctx.path);
//   console.log("====output====>>>>", ctx.method);
//   if (ctx.path === "/classic/latest" && ctx.method === "GET") {
//     ctx.body = "classic";
//   }
//   await next();
// });

router.get("/classic/latest", (ctx, next) => {
  ctx.body = {
    key: "classic"
  };
});

app.use(router.routes());

app.listen(3000);