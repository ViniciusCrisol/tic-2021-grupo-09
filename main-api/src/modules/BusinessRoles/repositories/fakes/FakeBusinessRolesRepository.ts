import { uuid } from 'uuidv4';
import IBusinessRolesRepository from '@modules/BusinessRoles/repositories/IBusinessRolesRepository';
import ICreateBusinessRoleDTO from '@modules/BusinessRoles/dtos/ICreateBusinessRoleDTO';
import BusinessRole from '../../infra/typeorm/entities/BusinessRole';

class FakeBusinessRolesRepository implements IBusinessRolesRepository {
  private businessRoles: BusinessRole[] = [];

  public async create(data: ICreateBusinessRoleDTO): Promise<BusinessRole> {
    const businessRole = new BusinessRole();
    Object.assign(businessRole, { id: uuid(), ...data });

    this.businessRoles.push(businessRole);
    return businessRole;
  }

  public async findById(id: string): Promise<BusinessRole | undefined> {
    const response = this.businessRoles.find(
      businessRole => businessRole.id === id,
    );
    return response;
  }

  public async findAll(): Promise<BusinessRole[]> {
    return this.businessRoles;
  }
}

export default FakeBusinessRolesRepository;
