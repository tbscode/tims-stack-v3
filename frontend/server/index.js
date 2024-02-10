import express from "express";
import compression from "compression";
import { renderPage } from "vike/server";
import cookieParser from "cookie-parser";
import { root } from "./root.js";
const isProduction = process.env.NODE_ENV === "production";

startServer();

async function startServer() {
  const app = express();

  app.use(compression());
  app.use(cookieParser());

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    const userAgent = req.headers["user-agent"];
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      requestHeaders: req.headers,
      cookies: req.headers.cookie,
      xcsrfToken: req.cookies["csrftoken"],
      sessionId: req.cookies["sessionid"] || null,
      userAgent,
    };
    console.log("pageContextInit", pageContextInit);
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { statusCode, headers, earlyHints } = httpResponse;
      //if (res.writeEarlyHints)
      //res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      httpResponse.pipe(res);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
