import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/";
import { connect } from "http2";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor() {
        // npm i @prisma/adapter-pg pg
        // npm i dotenv --save-dev
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        
        super({ adapter });
        //! git commit -m "add: uso de Prisma ORM y configuración de servicios y modulos"
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}