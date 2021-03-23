import { uuid } from 'uuidv4';
import IMainThingsRepository from '@modules/MainThings/repositories/IMainThingsRepository';
import ICreateMainThingDTO from '@modules/MainThings/dtos/ICreateMainThingDTO';
import MainThing from '../../infra/typeorm/entities/MainThing';

class FakeMainThingsRepository implements IMainThingsRepository {
  private mainThings: MainThing[] = [];

  public async create(data: ICreateMainThingDTO): Promise<MainThing> {
    const mainThing = new MainThing();
    Object.assign(mainThing, { id: uuid(), ...data });

    this.mainThings.push(mainThing);
    return mainThing;
  }

  public async findById(id: string): Promise<MainThing | undefined> {
    const response = this.mainThings.find(mainThing => mainThing.id === id);
    return response;
  }

  public async findAll(): Promise<MainThing[]> {
    return this.mainThings;
  }
}

export default FakeMainThingsRepository;
