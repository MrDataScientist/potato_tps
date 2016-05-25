OudyJS = {
	socket: null,
	url: (window.location.protocol != 'https:' ? 'ws' : 'wss')+'://unlikes.oudy.works',
	overlay: null,
	page: null,
	status: function(message) {
		OudyJS.page.addClass('uk-hidden');
		OudyJS.overlay.removeClass('uk-hidden').find('span').text(message);
	},
	ready: function() {
		OudyJS.page.removeClass('uk-hidden');
		OudyJS.overlay.addClass('uk-hidden').find('span').text('');
	},
	connect: function(hash) {
		OudyJS.status('Connecting...');
		OudyJS.socket = new WebSocket(OudyJS.url+'/'+hash);
		OudyJS.socket.onopen = function(message) {
			OudyJS.ready();
		};
		OudyJS.socket.onmessage = function(message) {
			OudyJS.message(JSON.parse(message.data));
		};
		OudyJS.socket.onerror = function(message) {
			OudyJS.status('Error Connecting to WebSocket');
		};
		OudyJS.socket.onclose = function() {
			OudyJS.status('Connection closed');
			OudyJS.socket = null;
			setTimeout(function (){
				OudyJS.connect(hash);
			 }, 1000);
		}
	},
	message: function(message) {
		console.log(message);
	},
	send: function(task, data) {
		OudyJS.socket.send(JSON.stringify({task: task, data: data}));
	}
};
