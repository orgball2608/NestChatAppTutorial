import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { Friend, User } from 'src/utils/typeorm';
import { DeleteFriendParams, GetFriendParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { FriendNotFoundException } from './exceptions/FriendNotFound';
import { IFriendService } from './friends';

@Injectable()
export class FriendsService implements IFriendService {
    constructor(
        @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>,
        @Inject(Services.USERS) private readonly userService: IUserService,
    ) {}

    getFriends(user: User): Promise<Friend[]> {
        return this.friendRepository.find({
            where: [
                { sender: user },
                {
                    receiver: user,
                },
            ],
            relations: ['sender', 'receiver'],
        });
    }

    getFriend({ userId, friendId }: GetFriendParams): Promise<Friend> {
        return this.friendRepository.findOne({
            where: [
                {
                    sender: {
                        id: userId,
                    },
                    receiver: {
                        id: friendId,
                    },
                },
            ],
        });
    }

    async deleteFriend(params: DeleteFriendParams) {
        const { removeUserId, userId } = params;
        const user = await this.userService.findUser({ id: removeUserId });
        if (!user) throw new UserNotFoundException();
        const friend = await this.getFriend({ userId, friendId: removeUserId });
        if (!friend) throw new FriendNotFoundException();
        return this.friendRepository.delete({
            sender: {
                id: userId,
            },
            receiver: {
                id: removeUserId,
            },
        });
    }
}
