import { getRepository, Repository } from 'typeorm';
import IMainThingsRepository from '@modules/MainThings/repositories/IMainThingsRepository';
import ICreateMainThingDTO from '@modules/MainThings/dtos/ICreateMainThingDTO';
import MainThing from '../entities/MainThing';

class MainThingsRepository implements IMainThingsRepository {
  private ormRepository: Repository<MainThing>;

  constructor() {
    this.ormRepository = getRepository(MainThing);
  }

  public async create(data: ICreateMainThingDTO): Promise<MainThing> {
    const mainThing = this.ormRepository.create(data);
    await this.ormRepository.save(mainThing);
    return mainThing;
  }

  public async findById(id: string): Promise<MainThing | undefined> {
    const response = await this.ormRepository.findOne(id);
    return response;
  }

  public async findAll(): Promise<MainThing[]> {
    const response = await this.ormRepository.find();
    return response;
  }
}

export default MainThingsRepository;
