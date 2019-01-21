import { Injectable } from '@angular/core';

import { Profile } from '../../models/profile';

@Injectable()
export class Profiles {
  profiles: Profile[] = [];

  defaultProfile: any = {
    "name": "Burt Bear",
    "picture": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let profiles = [
      {
        "name": "Burt Bear",
        "profilePic": "assets/img/avatar-01.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/avatar-02.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Donald Duck",
        "profilePic": "assets/img/avatar-03.jpg",
        "about": "Donald is a Duck."
      },
      {
        "name": "Eva Eagle",
        "profilePic": "assets/img/avatar-04.jpg",
        "about": "Eva is an Eagle."
      },
      {
        "name": "Ellie Elephant",
        "profilePic": "assets/img/avatar-05.jpg",
        "about": "Ellie is an Elephant."
      },
      {
        "name": "Molly Mouse",
        "profilePic": "assets/img/avatar-06.jpg",
        "about": "Molly is a Mouse."
      },
      {
        "name": "Paul Puppy",
        "profilePic": "assets/img/avatar-07.jpg",
        "about": "Paul is a Puppy."
      }
    ];

    for (let profile of profiles) {
      this.profiles.push(new Profile(profile));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.profiles;
    }

    return this.profiles.filter((profile) => {
      for (let key in params) {
        let field = profile[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return profile;
        } else if (field == params[key]) {
          return profile;
        }
      }
      return null;
    });
  }

  add(profile: Profile) {
    this.profiles.push(profile);
  }

  delete(profile: Profile) {
    this.profiles.splice(this.profiles.indexOf(profile), 1);
  }
}
