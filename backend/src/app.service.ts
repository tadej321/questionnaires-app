import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello and welcome to my API, please refer to localhost:3000/api for the documentation';
  }
}
