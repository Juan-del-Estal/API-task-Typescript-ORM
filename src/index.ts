import { App } from "./app";
import { UserRoute } from "./routes/user/user.routes";

const app = new App([
  new UserRoute()
]);

app.listener();