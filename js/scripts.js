(function () {
	var WINDOW_WIDTH = 750,
		WINDOW_HEIGHT = 500,
		TOPBAR_HEIGHT = 30,
	
		gui = require('nw.gui'),
		currentWindow = gui.Window.get(),
		iframe = document.getElementById('messenger'),
		messengerSidebar,
		messengerSidebarOpen = true,
		iframeInterval,
		iframeDone = false;
	
	gui.Screen.Init();
	
	currentWindow.title = 'Messenger Mini';
	currentWindow.width = WINDOW_WIDTH;
	currentWindow.height = WINDOW_HEIGHT;
	
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
		iframe.style.height = height - TOPBAR_HEIGHT;
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
	
	iframe.onload = function () {
		var iframeDocument = document.getElementById('messenger').contentDocument;
		
		// wait for content to be added, need to keep doing this until after user has logged in
		iframeInterval = setInterval(function () {	
			if (!iframeDone && iframeDocument.getElementsByClassName('_1enh').length) {
				messengerSidebar = iframeDocument.getElementsByClassName('_1enh')[0];
			
				messengerSidebar.style.transition = '0.5s ease all, 0.3s ease opacity';	
				
				var messageContent = iframeDocument.getElementsByClassName('_4sp8')[0];
				messageContent.style.minWidth = '0';
				
				document.getElementById('toggle-messenger-sidebar').classList.add('active');
				
				// this clear() doesn't work, added a temp fix with, var iframeDone
				clearInterval(iframeInterval);
				iframeDone = true;
			}	
		}, 2000);
	};
	
	document.getElementById('toggle-messenger-sidebar').addEventListener('click', function () {
		if (messengerSidebarOpen) {
			closeMessengerSidebar();
		} else {
			openMessengerSidebar();
		}
		
		messengerSidebarOpen = !messengerSidebarOpen;
	});
})();