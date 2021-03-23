import BusinessRole from '../infra/typeorm/entities/BusinessRole';
import ICreateBusinessRoleDTO from '../dtos/ICreateBusinessRoleDTO';

export default interface IBusinessRolesRepository {
  create(data: ICreateBusinessRoleDTO): Promise<BusinessRole>;
  findById(id: string): Promise<BusinessRole | undefined>;
  findAll(): Promise<BusinessRole[]>;
}
