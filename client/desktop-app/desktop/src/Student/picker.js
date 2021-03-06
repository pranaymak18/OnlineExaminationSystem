import React,{ Component,MyCustomButton } from 'react';
import ReactDOM from 'react-dom';
import {Button } from 'reactstrap';
import {Helmet} from "react-helmet";
import { gapi } from 'gapi-script';
import GooglePicker from 'react-google-picker';
import axios from 'axios';
const shell = window.require('electron').shell;


export default class Picker extends Component {
  constructor(props) {
    super(props);
    
  }
  state = {
    fileId: "",
    authToken: ""
  }


  componentDidUpdate() {
    console.log(this.state.fileId);
    console.log(this.state.authToken);
    const url = "https://www.googleapis.com/auth/drive.readonly" + 
      this.state.fileId + 
      "?key=<AIzaSyD4PB8itgucLQlc9H5qNykHSgkMOuzynfg>" + 
      "?alt=media";
    axios.get(url, {headers: {"Authorization": "Bearer " + this.state.authToken}})
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }
  
  /*
  
  
  render () {
    return (
      <div>
        <GooglePicker clientId={'<MY-CLIENT-ID>'}
                      developerKey={'<MY-API-KEY>'}
                      scope={['https://www.googleapis.com/auth/drive.readonly']}
                      onChange={data => {
                        data.docs ? this.setState({fileId: data.docs[0].id}) : console.log('on change:', data);
                      }}
                      onAuthenticate={token => {
                        console.log('oauth token:', token);
                        this.setState({authToken: token});
                      }}
                      onAuthFailed={data => console.log('on auth failed:', data)}
                      multiselect={true}
                      navHidden={true}
                      authImmediate={false}
                      mimeTypes={['application/vnd.google-apps.spreadsheet']}
                      viewId={'SPREADSHEETS'}>
           <button>Click</button>
        </GooglePicker>
      </div>
    );
  }
}

  */
  render() {
    var CLIENT_ID = '413249080011-d5es5rb0g27thoenu1g6eiiocrns3bdg.apps.googleusercontent.com';
    var DEVELOPER_KEY = 'AIzaSyD4PB8itgucLQlc9H5qNykHSgkMOuzynfg';
    var appId = '413249080011';
    var SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];
    
    var pickerApiLoaded = false;
    var oauthToken;
    /*
    function showPickerDialog(){
      loadPicker();
    }


    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      window.gapi.auth.authorize(
          {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult
          );
    }
    
    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("image/png,image/jpeg,image/jpg");
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsUploadView())
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    function pickerCallback(data) {
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        alert('The user selected: ' + fileId);
      }
    }


    */
    //New--------------------------------------------------------------------------------------------
    
    /*const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

    const handleClientLoad = () => {
      gapi.load('client:auth2', initClient);
    };

    const initClient = () => {
      //setIsLoadingGoogleDriveApi(true);
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          },
          function (error) {}
        );
    };


    const updateSigninStatus = (isSignedIn) => {
      if (isSignedIn) {
        // Set the signed in user
        setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
        setIsLoadingGoogleDriveApi(false);
        // list files if user is authenticated
        listFiles();
      } else {
        // prompt user to sign in
        handleAuthClick();
      }
    };


    const listFiles = (searchTerm = null) => {
      setIsFetchingGoogleDriveFiles(true);
      gapi.client.drive.files
        .list({
          pageSize: 10,
          fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
          q: searchTerm,
        })
        .then(function (response) {
          setIsFetchingGoogleDriveFiles(false);
          setListDocumentsVisibility(true);
          const res = JSON.parse(response.body);
          setDocuments(res.files);
        });
    };

    const handleAuthClick = (event) => {
      gapi.auth2.getAuthInstance().signIn();
    };
  
    return(
    <>
    <Helmet>
      <script type="text/javascript" src="https://apis.google.com/js/api.js"></script>
    </Helmet>
      <Button color="primary" onClick={() => handleClientLoad()}>Upload File Here</Button>
    </>
    );
  
}*/
 return(
   <>
    <div>
    <GooglePicker clientId={'413249080011-4k81h25ctatbtd17akm9knc7al3o3hrj.apps.googleusercontent.com'}
              developerKey={'AIzaSyBntrHoivkETJNwoHwgRr0aHcbEmgZwBmg'}
              scope={['https://www.googleapis.com/auth/drive.readonly']}
              onChange={data => {
                data.docs ? this.setState({fileId: data.docs[0].id}) : console.log('on change:', data);
              }}
              onAuthenticate={token => {
                console.log('oauth token:', token);
                this.setState({authToken: token});
              }}
              onAuthFailed={data => alert('on auth failed:', data)}
              multiselect={true}
              navHidden={true}
              authImmediate={false}
              mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
              viewId={'DOCS'}>
              <button>Upload File Here</button>
  </GooglePicker>
  
    </div>
    </>
 );
}


/*<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <title>Google Picker Example</title>

    <script type="text/javascript">

    // The Browser API key obtained from the Google API Console.
    // Replace with your own Browser API key, or your own key.
    var developerKey = '//Your Api Key//';

    // The Client ID obtained from the Google API Console. Replace with your own Client ID.
    var clientId = "//Your Client Id//"

    // Replace with your own project number from console.developers.google.com.
    // See "Project number" under "IAM & Admin" > "Settings"
    var appId = "//Your Project ID";

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive.file'];

    var pickerApiLoaded = false;
    var oauthToken;

    // Use the Google API Loader script to load the google.picker script.
    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      window.gapi.auth.authorize(
          {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult);
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }

    // Create and render a Picker object for searching images.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("image/png,image/jpeg,image/jpg");
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsUploadView())
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        alert('The user selected: ' + fileId);
      }
    }
    </script>
  </head>
  <body>
    <div id="result"></div>
    <button onclick="showPickerDialog()">Show Picker Dialog</button>

    <!-- The Google API Loader script. -->
    <script type="text/javascript" src="https://apis.google.com/js/api.js"></script>
    <script>
    function showPickerDialog(){
        loadPicker()
    }
    </script>
  </body>
</html>
  */}
