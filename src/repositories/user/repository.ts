import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { IUser, IUserRepository, CreationUser } from "./interfaces";

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  postUsers = (user: CreationUser) => this.ormRepository.create(user);
  saveUsers = async (user: IUser) => this.ormRepository.save(user);
  findUser = async (key: string, value: string) =>
    await this.ormRepository.findOne({ [key]: value });
  findUsers = async () => this.ormRepository.find();
  patchUser = async (uuid: string, update: { [x: string]: unknown }) =>
    await this.ormRepository.update(uuid, update);
  deleteUser = async (uuid: string) =>
    await this.ormRepository.delete({ uuid });
}

export { UserRepository, IUser };
