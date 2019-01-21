import { Injectable } from '@angular/core';

import { Profile } from '../../models/profile';
import { Api } from '../api/api';

@Injectable()
export class Profiles {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Profile) {
  }

  delete(item: Profile) {
  }

}