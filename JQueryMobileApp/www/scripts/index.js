// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

var service = {

	getMeetings: function (api, role, data) {
		var _this = this;
		console.log(role);
		$.ajax({
			url: api,
			method: "post",
			datatype: "json",
			mimetype: "application/json",
			"data": data,
			success: function (data, status, $jq) {
				var result = data["result"];
				var $select = $("#slt-meeting-" + role);
				_this.options(data["meetings"], $select, role);
				$("#go-" + role).click();
			},
			error: function ($jq, status, e) {
				_this.showError(
					"Something Wrong on the Server",
					function () { },
					e
				);
			}
		});
	},

	signIn: function (role, meetingId) {
		var _this = this;
		console.log(meetingId);
		var api = "http://localhost:25368/meetings/" + (role == "sponsor" ? "startmeeting" : "signinmeeting");
		$.ajax({
			url: api,
			method: "post",
			datatype: "json",
			mimetype: "application/json",
			data: {
				"alias": $.localStorage.get("alias"),
				"meetingid": meetingId
			},
			success: function (data, status, $jq) {
				_this.showSuccess("operate successfully!", function () {
					$("#alias").val("");
					$("#go-index").click();
				});
				console.log(JSON.stringify(data));
			},
			error: function ($jq, status, e) {
				console.log("ERROR: " + role + " meeting error!");
				_this.showError(
					"Something Wrong on the Server",
					function () { },
					e
				);
			}
		});
	},

	doResult: function (result, msg) {
		var _this = this;
		
		//_this.showError(msg, )
	},

	showSuccess: function (msg, callback) {
		var _this = this;
		navigator.notification.alert(
			msg,
			callback,
			"SUCCESS",
			"OK"
		);
	},

	showError: function (eMsg, callback, e) {
		var _this = this;
		navigator.notification.alert(
			eMsg,			// message
			callback,		// callback
			"ERROR",		// title
			"OK"			// buttonName
		);
	},

	options: function (meetings, $select, role) {
		var _this = this;
		var $option = $("<option>");
		$select.empty();
		$select.append($option.clone().text("Select Meeting to Activate").prop("id", "opt-head-" + role));
		for (var i = 0; i < meetings.length; i++) {
			var $optionTemp = $option.clone();
			$optionTemp.val(meetings[i]["Id"]);
			$optionTemp.text(meetings[i]["Theme"]);
			$select.append($optionTemp);
		}
		console.log($("#slt-meeting-" + role).html());
	}
}

$(document).ready(function () {
	// initialize cordova framework
	$(document).bind("deviceready", initialize);

	// initialization function
	function initialize() {
		// application initialization
		(function () {
			// TODO
		})();

		// register event handler 
		$("#btn-sign-in").on("click", function () {
			var alias = $("#alias").val();
			var role = $("input[name='rad-role']:checked").val();
			var url = "http://localhost:25368/";
			api = url + "meetings/" + (role == "sponsor" ? "start" : "signin");
			service.getMeetings(api, role, { "alias": alias });
			$.localStorage.set("alias", alias);
		});

		$("#btn-select-meeting-sponsor").on("click", function () {
			var selectedMeetingId = $("#slt-meeting-sponsor").val();
			service.signIn("sponsor", selectedMeetingId);
		});

		$("#btn-select-meeting-participant").on("click", function () {
			var selectedMeetingId = $("#slt-meeting-participant").val();
			service.signIn("participant", selectedMeetingId);
		});
	}

});

