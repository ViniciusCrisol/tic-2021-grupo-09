import { getRepository, Repository } from 'typeorm';
import IBusinessRolesRepository from '@modules/BusinessRoles/repositories/IBusinessRolesRepository';
import ICreateBusinessRoleDTO from '@modules/BusinessRoles/dtos/ICreateBusinessRoleDTO';
import BusinessRole from '../entities/BusinessRole';

class BusinessRolesRepository implements IBusinessRolesRepository {
  private ormRepository: Repository<BusinessRole>;

  constructor() {
    this.ormRepository = getRepository(BusinessRole);
  }

  public async create(data: ICreateBusinessRoleDTO): Promise<BusinessRole> {
    const businessRole = this.ormRepository.create(data);
    await this.ormRepository.save(businessRole);
    return businessRole;
  }

  public async findById(id: string): Promise<BusinessRole | undefined> {
    const response = await this.ormRepository.findOne(id);
    return response;
  }

  public async findAll(): Promise<BusinessRole[]> {
    const response = await this.ormRepository.find();
    return response;
  }
}

export default BusinessRolesRepository;
