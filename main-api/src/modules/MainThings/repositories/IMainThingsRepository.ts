import MainThing from '../infra/typeorm/entities/MainThing';
import ICreateMainThingDTO from '../dtos/ICreateMainThingDTO';

export default interface IMainThingsRepository {
  create(data: ICreateMainThingDTO): Promise<MainThing>;
  findById(id: string): Promise<MainThing | undefined>;
  findAll(): Promise<MainThing[]>;
}
