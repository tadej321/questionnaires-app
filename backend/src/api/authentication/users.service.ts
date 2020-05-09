import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(user: User): Promise<{token: string, isAdmin: boolean}> {
    const fetchedUser: User = await this.userModel.findOne({email: user.email});

    if (!fetchedUser) {
      throw new NotFoundException('user does not exist');
    }

    return bcrypt.compare(user.password, fetchedUser.password).then(res => {
      if (!res) {
        throw new NotFoundException('user does not exist');
      }
      const token = this.jwtService.sign(
        {email: fetchedUser.email, userId: fetchedUser.id},
      );

      return {
        expiresIn: 3600,
        email: fetchedUser.email,
        isAdmin: fetchedUser.isAdmin,
        localId: fetchedUser.id,
        token,
      };
    });

  }

  async create(user: User): Promise<string> {

    const hash = await bcrypt.hash(user.password, 10);

    const newUser: User = {
      email: user.email,
      password: hash,
      isAdmin: user.isAdmin,
    };

    return await this.userModel.create(newUser).then(() => {
      return 'User successfully added';
    });
  }
}
