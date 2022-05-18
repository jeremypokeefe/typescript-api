import "reflect-metadata";

import dotenv from "dotenv";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { initializeTransactionalContext } from "typeorm-transactional-cls-hooked";

import { LogLevel } from "./enum/LogLevel";

import middleware from "./middleware";
import { AuthProvider } from "./middleware/authProvider";
import errorHandlers from "./middleware/errorHandlers";

import { Logger } from "./services/Logger";

import { bindings } from "./bindings";
import { applyMiddleware } from "./utils";

dotenv.config();

const logger = Logger.getInstance();

(async () => {
  process.on("uncaughtException", err => {
    logger.log(LogLevel.Error, err.message, err.stack);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    logger.log(LogLevel.Error, "Unhandled rejection!!", err);
    process.exit(1);
  });

  const { PORT = 5001 } = process.env;

  initializeTransactionalContext();

  const container = new Container();
  await container.loadAsync(bindings);

  const app = new InversifyExpressServer(
    container,
    null,
    null,
    null,
    AuthProvider
  );

  const server = app
    .setConfig(router => applyMiddleware(router, middleware))
    .setErrorConfig(router => applyMiddleware(router, errorHandlers))
    .build();

  try {
    server.listen(PORT, () =>
      // tslint:disable-next-line: no-console
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://localhost:${PORT}...`)
    );
    // eslint-disable-next-line prettier/prettier
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
