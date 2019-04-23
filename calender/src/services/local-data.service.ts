import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {User} from '../common/interferce/commonDataFormat';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() {
  }

  public static RESULT_CODE = {
    SUCCESS: 0,
    ERROR: 1
  };

  public userList: User[] = [
    {
      userName: '774624709@qq.com',
      password: '123123'
    }
  ];

  public addUser(user: User): number {
    if (this.checkUser(user)) {
      this.userList.push(user);
      console.table(this.userList);
      return LocalDataService.RESULT_CODE.SUCCESS;
    } else {
      return LocalDataService.RESULT_CODE.ERROR;
    }
  }

  private checkUser(user: User): boolean {
    return isNullOrUndefined(_.find(this.userList, {userName: user.userName})) && user.userName !== '' && user.password !== '';
  }

  public loginUserVerify(user: User): boolean {
    let result = false;
    this.userList.forEach((ele) => {
      if (ele.userName === user.userName && ele.password === user.password) {
        result = true;
      }
    });
    return result;
  }
}
