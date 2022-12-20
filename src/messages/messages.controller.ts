import {Body, Controller, Inject, Post} from '@nestjs/common';
import {Routes, Services} from "../utils/constants";
import {IMessageService} from "./messages";
import {AuthUser} from "../utils/decorator";
import {User} from "../utils/typeorm";
import {CreateMessageDto} from "./dtos/CreateMessage.dto";

@Controller(Routes.MESSAGES)
export class MessagesController {
    constructor(@Inject(Services.MESSAGES) private  readonly messageService: IMessageService) {
    }
    @Post()
    createMessage(
        @AuthUser() user: User,
        @Body() createMessageDto: CreateMessageDto,
    ) {
        return this.messageService.createMessage({ ...createMessageDto, user });
    }
}
