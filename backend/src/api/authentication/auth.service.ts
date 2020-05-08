import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Product} from './interfaces/product.interface';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './interfaces/user.interface';
import {Observable} from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Product') private readonly authModel: Model<User>) {}

  async findOne(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);

    let fetchedUser: User;
    try {
      fetchedUser = await this.authModel.findOne(user.email);
    } catch (e) {}

    if (!fetchedUser || fetchedUser.password !== user.password) {
      throw new NotFoundException('User does not exist.');
    }
    return fetchedUser;
  }
}
