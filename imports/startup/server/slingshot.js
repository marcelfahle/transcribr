import _ from 'lodash-addons';
import URL from 'url-parse';

Slingshot.fileRestrictions( "uploadToS3", {
  allowedFileTypes: [ "audio/wav" ],
  maxSize: 50 * 1024 * 1024
});

Slingshot.createDirective( "uploadToS3", Slingshot.S3Storage, {
  bucket: "mflab",
  acl: "public-read",
  region: "eu-central-1",
  authorize: function () {
    //let userFileCount = Files.find( { "userId": this.userId } ).count();
    //return userFileCount < 3 ? true : false;
    return true;
  },
  key: function ( file ) {
    var user = Meteor.users.findOne( this.userId );
    //return user.emails[0].address + "/" + file.name;
    //const host = headers.get(this, 'host');
    // TODO: add user info to filename
    const url = new URL(Meteor.absoluteUrl());
    const key = "transcribr/" + url.host + "/" + _.slugify(new Date().toString()) + ".wav";
		const encKey = key.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return encKey;
  }
});
