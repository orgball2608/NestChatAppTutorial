import { Attachment, GroupAttachment } from 'src/utils/typeorm';
import { AttachmentFile } from 'src/utils/types';

export interface IAttachmentService {
    create(attachments: AttachmentFile[]): Promise<Attachment[]>;
    createGroupAttachments(attachments: AttachmentFile[]): Promise<GroupAttachment[]>;
}