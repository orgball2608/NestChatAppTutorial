import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseMessage } from './BaseMessage';
import { Group } from './Group';
import { GroupAttachment } from './GroupAttachments';
import { ReactGroupMessage } from './ReactGroupMessage';

@Entity({ name: 'group_messages' })
export class GroupMessage extends BaseMessage {
    @ManyToOne(() => Group, (group) => group.messages)
    group?: Group;

    @OneToMany(() => GroupAttachment, (attachment) => attachment.message)
    @JoinColumn()
    attachments?: GroupAttachment[];

    @OneToMany(() => ReactGroupMessage, (react) => react.message)
    @JoinColumn()
    reacts: ReactGroupMessage[];
}
