import winston from "winston";
import { LogLevel } from "../enum/LogLevel";

export interface ILogger {
  log(logLevel: LogLevel, message: string, stack?: any): void;
}

export class Logger implements ILogger {
  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private static instance: Logger;
  private _consoleLogger!: winston.Logger;

  private constructor() {
    this.initializeConsoleLogger();
  }

  public log(logLevel: LogLevel, message: string, stack?: any) {
    if (process.env.NODE_ENV === "development") {
      this._consoleLogger.info(message, stack);
      return;
    }

    switch (logLevel) {
      case LogLevel.Info:
        this._consoleLogger.info(message, stack);
        break;
      case LogLevel.Error:
        this._consoleLogger.error(message, stack);
        break;
      default:
        this._consoleLogger.log(message, stack);
    }
  }

  private initializeConsoleLogger() {
    this._consoleLogger = winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  }
}
