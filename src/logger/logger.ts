export class Logger {
  static prefix: string = '[AWS-SDK-HELPER]'
  static info(message: string, data?: Record<string, any>) {
    console.log(`${this.prefix} - ${message}`, JSON.stringify(data))
  }

  static error(message: string, error: any) {
    console.error(`${this.prefix} - ${message}`, error)
  }
}
