import { Injectable } from '@nestjs/common';
import { langchain } from 'langchain';

console.log(langchain);

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // translate() {
  //   langchain.
  // }
}
