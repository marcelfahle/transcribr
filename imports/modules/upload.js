import { insert } from './../api/recordings/methods.js';


let component;

let _getBlob = ( event ) => "";

let _setPlaceholderText = ( string = "Click or Drag a File Here to Upload" ) => {
  //template.find( ".alert span" ).innerText = string;
};

let _addUrlToDatabase = ( url ) => {
  insert.call(url, function(error, responce) {
    if (error) {
      Bert.alert( error.reason, 'danger', 'growl-top-right' );
    } else {
      Bert.alert( 'The Recording was added to the database.', 'success', 'growl-top-right' );
    }
  });
};


let _uploadFileToS3 = ( blob ) => {
  const uploader = new Slingshot.Upload( "uploadToS3" );

  uploader.send( blob, ( error, url ) => {
    if ( error ) {
      console.log('error', error, url, blob);
      Bert.alert( error.message, "warning" );
      //_setPlaceholderText();
    } else {
      console.log('success, add to DB');
      //_addUrlToDatabase( url );
    }
  });
};


export const uploadToS3 = ( args ) => {
  component = args.component;
  let blob = args.blob; 
  console.log('upload', args );

  //_setPlaceHolderText( `Publishing recording...` );
  _uploadFileToS3( blob );
};

