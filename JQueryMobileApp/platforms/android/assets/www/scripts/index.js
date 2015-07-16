// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

var service = {

	getMeetings: function (apiUrl, role, data) {
		var _this = this;
		console.log(role);
		$.ajax({
			url: apiUrl,
			method: "post",
			datatype: "json",
			mimetype: "application/json",
			"data": data,
			success: function (data, status, $jq) {
				var meetings = data["meetings"];
				var $select = $("#slt-meeting-" + role);
				_this.options(meetings, $select, role);
				$("#go-" + role).click();
			},
			error: function ($jq, status, e) {
				navigator.notification.alert(
					"Something Wrong on the Server",	// message
					function () { },					// callback
					'ERROR',							// title
					'OK'								// buttonName
				);
			}
		});
	},

	sponsor: function () {
		var _this = this;
	},

	participate: function () {
		var _this = this;
	},

	options: function (meetings, $select, role) {
		var $option = $("<option>");
		$select.empty();
		$select.append($option.clone().text("Select Meeting to Activate").prop("id", "opt-head-" + role));
		for (var i = 0; i < meetings.length; i++) {
			//console.log(meetings[i]["MeetingId"]);
			var $optionTemp = $option.clone();
			$optionTemp.val(meetings[i]["MeetingId"]);
			$optionTemp.text(meetings[i]["MeetingName"]);
			$select.append($optionTemp);
		}
		//console.log($("#slt-meeting-" + role).html());
	}
}


var testData = [
	{},
	{},
	{},
	{}
];

$(document).ready(function () {
	// initialize cordova framework
	$(document).bind("deviceready", initialize);

	// initialization function
	function initialize() {
		// application initialization
		(function () {
			// 
		})();

		// register event handler 
		$("#btn-sign-in").on("click", function () {
			var alias = $("#alias").val();
			var role = $("input[name='rad-role']:checked").val();
			var sponsorApi = "http://localhost:46568/test/start";
			var participantApi = "http://localhost:46568/test/signin";
			//console.log("alias: " + alias);
			//console.log("roel: " + role);
			//service.getMeetings(sponsorApi, role, { "alias": alias });
			$.localStorage.set("alias", alias);
			$("#go-sponsor").click();

			//if (role == "sponsor") {

			//	});
			//} else {

			//}

		});

		// 
		$("#btn-select-meeting-sponsor").on("click", function () {
			var selectedMeetingId = $("#slt-meeting-sponsor").val();
			console.log(selectedMeetingId);
			$.ajax({
				url: "http://localhost:46568/test/start",
				method: "post",
				datatype: "json",
				mimetype: "application/json",
				data: {
					"alias": $.localStorage.get("alias"),
					"meetingid": selectedMeetingId
				},
				success: function (data, status, $jq) {
					console.log(JSON.stringify(data));
				},
				error: function ($jq, status, e) {

				}
			});
		});

		$("#btn-select-meeting-participant").on("click", function () {
			var selectedMeetingId = $("#slt-meeting-participant").val();
			console.log(selectedMeetingId);
		});
	}

});

