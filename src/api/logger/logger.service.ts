import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoggerService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  addLog(ip: string) {
    const newLog = {
      ip,
      date: new Date(),
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    const currentLogs = this.getLogs();
    currentLogs.push(newLog);

    fs.writeFile(
      'logger.log',
      `${JSON.stringify(currentLogs)}`,
      function (err) {
        if (err) return console.log('logger error - ', err);
      },
    );
  }

  getLogs() {
    try {
      const data = fs.readFileSync('logger.log', 'utf8');
      if (data) {
        const parsedJSON = JSON.parse(data);
        return parsedJSON;
      } else return [];
    } catch (err) {
      console.error(err);
    }
  }
}
