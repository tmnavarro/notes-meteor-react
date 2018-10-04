import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';

if (Meteor.isServer) {
  describe('API Notes', function() {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My bode for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Title 2',
      body: 'My bode for note 2',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it ('should insert new note', function() {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId: noteOne.userId });
      expect(Notes.findOne({ _id })).toBeTruthy();
    });

    it ('should not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it ('should update note', function() {
      const title = 'This update title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId,
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toEqual({
        ...noteOne,
        title,
        updatedAt: note.updatedAt
      });

    });

    it ('should not update note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it ('should not update note if user was not creator', function() {
      const title = 'This update title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'userId'
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);
      expect(note).toEqual(noteOne);
    });

    it('should not remove note if extra updates', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId,
        }, [
          noteOne._id,
          { title: 'My title error', name: 'My name' }
        ]);
      }).toThrow();
    });

    it('should not remove note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId}, []);
      }).toThrow();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId}, [noteOne._id]);
      expect(Notes.findOne(noteOne._id)).toBeFalsy();
    });

    it('should return a users notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId});
      const notes = res.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should not return notes for user has not loged', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: undefined});
      const notes = res.fetch();
      expect(notes.length).toBe(0);
    });

  });
}
