$(function () {

	$(document).bind("deviceready", function () {
		//
		$("#btn-select-meeting").on("click", function () {
			var message = "select " + $("#slt-meeting").val();
			navigator.notification.alert(
				message,				// message
				function () { },		// callback
				'Game Over',			// title
				'OK'					// buttonName
			);
			//console.log(message);
		});

	});

});