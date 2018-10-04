import expect from 'expect';
import {Meteor} from 'meteor/meteor';

import {validateNewUser} from './users';

if (Meteor.isServer) {
  describe('API Users', function () {
    it('Should allow valide email address', function () {
      const user = {
        emails: [{address: 'test@server.com'}]
      }
      const res = validateNewUser(user);
      expect(res).toBe(true);
    });

    it('Should reject incavalid email', function () {
      const user = {
        emails: [{address: 'test.com'}]
      }
      expect(()=> { validateNewUser(user) }).toThrow();
    });

  });
}
