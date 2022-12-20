import {Body, Controller, Get, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {Routes, Services} from "../utils/constants";
import {IConversationsService} from "./conversations";
import {AuthenticatedGuard} from "../auth/utils/Guards";
import {CreateConversationDto} from "./dtos/CreateConversation.dto";
import {AuthUser} from "../utils/decorator";
import {User} from "../utils/typeorm";

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
    constructor(@Inject(Services.CONVERSATIONS) private readonly  conversationsService:IConversationsService) {
    }
    @Post()
    async createConversation(
        @AuthUser() user: User,
        @Body() createConversationPayload: CreateConversationDto,
    ) {
        return this.conversationsService.createConversation(
            user,
            createConversationPayload,
        );
    }

    @Get()
    async getConversations(@AuthUser() user: User) {
        const { id } = user.participant;
        return await this.conversationsService.find(id);
    }

    @Get(':id')
    async getConversationById(@Param('id') id: number) {
        return await this.conversationsService.findConversationById(
            id,
        );
    }


}
