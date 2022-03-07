import { Pipe, PipeTransform } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Pipe({
  name: 'decodeToken',
})
export class DecodeTokenPipe implements PipeTransform {
  transform(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
