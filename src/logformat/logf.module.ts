import { Module } from "@nestjs/common";
import { LogfService } from "./logf.service";


@Module({
    providers:[LogfService],
    exports: [LogfService]
})
export class LogfModule{}