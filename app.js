const Koa = require("koa");
const parser = require("koa-bodyparser");
const InitManager = require("./core/init");
const catchError = require("./middlewares/exception");
const response = require("./middlewares/response");
const niv = require("node-input-validator");

const app = new Koa();
app.use(parser());
app.use(catchError);
app.use(response());
app.use(niv.koa());

InitManager.initCore(app);

app.listen(3000);