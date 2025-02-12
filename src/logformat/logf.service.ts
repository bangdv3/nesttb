import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { promises as fsPromises} from 'fs';
import * as path from 'path';

@Injectable()
export class LogfService extends ConsoleLogger {
    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh'
        }).format(new Date())}\t${entry}\n`

        try {
            if(!fs.existsSync(path.join(__dirname, '..','..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..','..', 'logs'))
            }
            await fsPromises.appendFile(path.join(__dirname, '..','..', 'logs','mylog.log'), formattedEntry)
        } catch (e) {
            if (e instanceof Error) console.error(e.message) 
        }
    }

    log(message: any, context?: string, ): void {
        const entry = `${context}\t${message}`
        this.logToFile(entry)
        super.log(message, context)
    }
    error(message: any, stack?: string, ): void {
        const entry = `${stack}\t${message}`
        this.logToFile(entry)
        super.error(message, stack)
    }
}