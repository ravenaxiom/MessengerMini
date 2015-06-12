(function () {
	var gui = require('nw.gui');
	var currentWindow = gui.Window.get();
	var iframe = document.getElementById('messenger');
	
	gui.Screen.Init();
	
	currentWindow.title = 'Messenger Mini';
	currentWindow.width = 750;
	currentWindow.height = 500;
	
	currentWindow.on('maximize', function () {
		currentWindow.unmaximize();
		resetWindow();
	});
	
	function resetWindow () {
		currentWindow.x = gui.Screen.screens[0].work_area.width - currentWindow.width;
		currentWindow.y = gui.Screen.screens[0].work_area.height - currentWindow.height;
	}
	
	currentWindow.on('resize', function (width, height) {
		iframe.style.width = width;
		iframe.style.height = height - 30;
	});
	
	resetWindow();
	
	document.getElementById('close').addEventListener('click', function () {
		currentWindow.close();
	});
})();