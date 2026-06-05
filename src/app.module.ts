import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/infrastructure/task.module';

@Module({
  imports: [ TaskModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
