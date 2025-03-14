import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    async onModuleInit() {
        await this.$connect()
    }
    // async enableShutdownHooks(app: INestApplication) {
    //     this.$on('beforeExit' as never, async () => {
    //         await app.close();
    //     })
    // }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}