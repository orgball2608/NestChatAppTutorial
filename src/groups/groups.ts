import { CreateGroupParams, FindUserSelectOption, GetGroupsByIdParams, GetGroupsParams } from '../utils/types';
import { Group } from '../utils/typeorm';

export interface IGroupService {
    createGroup(params: CreateGroupParams, options?: FindUserSelectOption);
    getGroups(params: GetGroupsParams): Promise<Group[]>;
    getGroupById(params: GetGroupsByIdParams): Promise<Group>;
    saveGroup(group: Group): Promise<Group>;
}