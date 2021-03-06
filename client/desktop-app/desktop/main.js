const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
var mime = require('mime');
var { google } = require('googleapis');
var fs = require('fs');
var http = require('http');
var https = require('https');
var service = google.drive('v3');
//const electron = window.require('electron');
var dialog = require('electron').dialog;
const ipc = require('electron').ipcMain;

var AUTH = undefined;

let mainWindow;
function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow = new BrowserWindow({ webPreferences: {  enableRemoteModule: true ,webSecurity: false, nodeIntegration: true } });
  //mainWindow.setMenu(null);
  
  mainWindow.maximize();
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.setTitle('Examination Room');
}

const template = [
    {
       role: 'help',
       submenu: [
          {
             label: 'Learn More'
          }
       ]
    }
 ]

const menu = Menu.buildFromTemplate(template);
//Menu.setApplicationMenu(menu);

app.on('ready', function() {

  createWindow();
  /*
  var OAuth2 = google.auth.OAuth2;
  var spawn = require('child_process').spawn;
  var url = require('url');
  var querystring = require('querystring');

  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
                   process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
  
  var oauth2Client = new OAuth2(
    "413249080011-4k81h25ctatbtd17akm9knc7al3o3hrj.apps.googleusercontent.com", 
    "AIzaSyBntrHoivkETJNwoHwgRr0aHcbEmgZwBmg", 
    "http://localhost:3000" // addr of our web server that will be listening
  );

  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
      AUTH = oauth2Client;
    }
  });


  var scopes = [
    'https://www.googleapis.com/auth/drive'
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });




  function callback(auth) {
        
    service.about.get({
      auth: auth,
      alt: 'json',
      fields: 'exportFormats'
    }, function(error, response) {
      mainWindow.send('load-export-formats', response.exportFormats);
    }); 
    
    service.files.list({
      auth: auth,
      q: "not mimeType contains 'python' and not mimeType contains 'folder'",
      pageSize: 50,
      fields: "nextPageToken, files(id, name, modifiedTime, kind, createdTime, thumbnailLink, mimeType, size, webContentLink)"
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var files = response.files;
      if (files.length == 0) {
        console.log('No files found.');
      } else {
        mainWindow.send('load-files', files, auth.credentials.access_token);
      }
    });
  }//Ready Finished.


  function getNewToken(oauth2Client, callback) {
    
    function storeToken(token) {
      try {
        fs.mkdirSync(TOKEN_DIR);
      } catch (err) {
        if (err.code != 'EEXIST') {
          throw err;
        }
      }
      fs.writeFile(TOKEN_PATH, JSON.stringify(token));
      console.log('Token stored to ' + TOKEN_PATH);
    } 

    function handler (request, response, server, callback) {
      var qs = querystring.parse(require('url').parse(request.url).query);
      oauth2Client.getToken(qs.code, function (err, tokens) {
        if (err) {
          console.error('Error getting oAuth tokens: ' + err);
        }
        oauth2Client.credentials = tokens;
        mainWindow.loadURL('file://' + __dirname + '/index.html');
        storeToken(tokens);
        callback(oauth2Client);
        AUTH = oauth2Client;
        server.close();
      });
    }

    var server = http.createServer(function (request, response) {
      handler(request, response, server, callback);
    }).listen(8080, function () {
      mainWindow.loadURL(url);
    });

  }
*/
});


/*ipc.on('download-file', function(event, data) {
  dialog.showSaveDialog(function(fileName) {
    if (fileName) {
      data = JSON.parse(data);
      var fileObject = fs.createWriteStream(fileName);
      
      service.files[data.method]({
        auth: AUTH,
        fileId: data.fileId,
        mimeType: data.mimeType,
        alt: 'media'
      })
      .on('error', function(error) {
        console.log('error during download');
      })
      .pipe(fileObject);
    }
  });
});

ipc.on('create-file', function(event, data) {
  dialog.showOpenDialog({properties: ['openFile']}, function(fileNames) {
    if (fileNames.length >= 1) {
      
      var media = {
        body: fs.createReadStream(fileNames[0]),
        mimeType: mime.lookup(fileNames[0])
      };

      var fileData = {
        name: fileNames[0].replace(/^.*[\\\/]/, '')
      };
      
      service.files.create({
        auth: AUTH,
        resource: fileData,
        media: media,
        fields: 'id',
      }, function(error, file) {
        if (error) console.log('error during download');
        else {
          service.files.list({
            auth: AUTH,
            q: "not mimeType contains 'python' and not mimeType contains 'folder'",
            pageSize: 50,
            fields: "nextPageToken, files(id, name, modifiedTime, kind, createdTime, thumbnailLink, mimeType, size, webContentLink)"
          }, function(err, response) {
            if (err) {
              console.log('The API returned an error: ' + err);
              return;
            }
            var files = response.files;
            if (files.length == 0) {
              console.log('No files found.');
            } else {
              mainWindow.send('load-files', files, AUTH.credentials.access_token);
            }
          });
        }
      });
    }
  });
});
*/
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});