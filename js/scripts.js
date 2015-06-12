(function () {
	var gui = require('nw.gui');
	var currentWindow = gui.Window.get();
	var iframe = document.getElementById('messenger');
	var iframedoc;
	var messengerSidebar;
	var messengerSidebarOpen = true;
	
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
		
	function closeMessengerSidebar () {
		if (typeof messengerSidebar !== 'undefined') {
			messengerSidebar.style.minWidth = '0px';
			messengerSidebar.style.maxWidth = '0px';
			messengerSidebar.style.opacity = '0';
		}
	}
	
	function openMessengerSidebar () {
		if (typeof messengerSidebar !== 'undefined') {
			messengerSidebar.style.minWidth = '';
			messengerSidebar.style.maxWidth = '';
			messengerSidebar.style.opacity = '';
		}
	}
	
	setTimeout(function () {
		iframedoc = document.getElementById('messenger').contentDocument;
		messengerSidebar = iframedoc.getElementsByClassName('_1enh')[0];
	
		messengerSidebar.style.transition = '0.5s ease all, 0.3s ease opacity';	
		
		var messageContent = iframedoc.getElementsByClassName('_4sp8')[0];
		messageContent.style.minWidth = '0';
		
	}, 5000);
	
	document.getElementById('toggle-messenger-sidebar').addEventListener('click', function () {
		if (messengerSidebarOpen) {
			closeMessengerSidebar();
		} else {
			openMessengerSidebar();
		}
		
		messengerSidebarOpen = !messengerSidebarOpen;
	});
})();