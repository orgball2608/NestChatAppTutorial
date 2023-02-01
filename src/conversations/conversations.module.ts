import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Services } from '../utils/constants';
import { Conversation } from '../utils/typeorm';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { ConversationMiddleware } from './middlewares/conversation.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([Conversation]), UsersModule],
    controllers: [ConversationsController],
    providers: [
        {
            provide: Services.CONVERSATIONS,
            useClass: ConversationsService,
        },
    ],
    exports: [
        {
            provide: Services.CONVERSATIONS,
            useClass: ConversationsService,
        },
    ],
})
export class ConversationsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ConversationMiddleware).forRoutes('conversations/:id');
    }
}
