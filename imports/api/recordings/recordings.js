export const Recordings = new Mongo.Collection('recordings');


Recordings.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


RecordingSchema = new SimpleSchema({
  userId: {
    type: String
  },
  refId: {
    type: String
  },
  file: {
    type: String
  },
 	createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    optional: true
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  } 
});

Recordings.attachSchema( RecordingSchema );
