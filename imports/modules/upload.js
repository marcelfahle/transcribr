import { insert } from './../api/recordings/methods.js';


let component;

let _getBlob = ( event ) => "";

let _setPlaceholderText = ( string = "Click or Drag a File Here to Upload" ) => {
  //template.find( ".alert span" ).innerText = string;
};

let _addUrlToDatabase = ( url, refId ) => {
  const recording = {
    file: url,
    refId: refId,
    userId: Meteor.userId()
  }
  insert.call(recording, function(error, responce) {
    if (error) {
      console.log(error);
      Bert.alert( error.reason, 'danger', 'growl-top-right' );
    } else {
      Bert.alert( 'The Recording was added to the database.', 'success', 'growl-top-right' );
    }
  });
};


let _uploadFileToS3 = ( blob, component, refId ) => {
  const uploader = new Slingshot.Upload( "uploadToS3" );

  uploader.send( blob, ( error, url ) => {
    if ( error ) {
      console.log('error', error, url, blob);
      Bert.alert( error.message, "warning" );
      //_setPlaceholderText();
    } else {
      component.uploadHandler();
      console.log('success, add to DB', url);
      _addUrlToDatabase( url, refId );
    }
  });
  component.setUploader( uploader );
};


export const uploadToS3 = ( args ) => {
  component = args.component;
  let blob = args.blob; 
  console.log('upload', args );

  //_setPlaceHolderText( `Publishing recording...` );
  _uploadFileToS3( blob, component, args.id );
};

