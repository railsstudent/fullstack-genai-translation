import { Injectable } from '@nestjs/common';
// import { langchain } from 'langchain/chains';

console.log(langchain);

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // translate() {
  //   // langchain.
  // }
}
