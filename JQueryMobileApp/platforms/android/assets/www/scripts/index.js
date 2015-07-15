// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

$(document).ready(function () {

	$(document).bind("deviceready", initialize);

	function initialize() {

		// application initialization

		// register event handler 
		$("#btn-sign-in").on("click", function () {

			/*$.ajax({
				url: "http://localhost:46568/Test/Ajax",
				datatype: "jsonp",
				method: "POST",
				data: {
					alias: $('#alias').val(),
					
				},
				error: function () {
					console.log("error");
				},
				success: function (data) {
					var jsonStr = JSON.stringify(data);
					navigator.notification.alert(
						jsonStr,				// message
						function () { },		// callback
						'Game Over',			// title
						'OK'					// buttonName
					);
					console.log(jsonStr);
				}
			});
			*/
			//
			var alias = $("#alias").val();
			console.log(alias);
			$("#go-sponsor").click();
		});

		// 
		$("#btn-select-meeting").on("click", function () {
			var message = "select " + $("#slt-meeting").val();
			navigator.notification.alert(
				message,				// message
				function () { },		// callback
				'Game Over',			// title
				'OK'					// buttonName
			);
			console.log(message);
		});
	}

});