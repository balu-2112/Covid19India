const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;
let main;

console.log(app);
app.on('ready', () => {
	main = new BrowserWindow({});

	main.loadURL(url.format({
		pathname: path.join(__dirname, './dist/Cvindia/index.html'),
		protocol: 'file',
		slashes: true
	}));

});