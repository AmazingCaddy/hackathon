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
				if (result["status"] == 0) {
					var result = data["result"];
					var $select = $("#slt-meeting-" + role);
					_this.options(data["meetings"], $select, role);
					$("#go-" + role).click();
					return;
				}
				_this.doResult(result);
			},
			error: function ($jq, status, e) {
				_this.showError(
					"Something Wrong on the Server",
					function () {
						$("#alias").val("");
						$("#go-index").click();
					},
					e
				);
			}
		});
	},

	signIn: function (role, meetingId) {
		var _this = this;
		console.log(meetingId);
		if (meetingId == "-1") {
			return;
		}
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
				var result = data["result"];
				_this.doResult(result, function () {
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

	callbacks: [
		function () {
			$("#go-index").click();
		},
		function () {
			$("#go-index").click();
		},
		function () {
			$("#go-index").click();
		},
		function () {
			$("#go-index").click();
		},
		function () {
			$("#go-index").click();
		},
		function () {
			$("#go-index").click();
		}
	],

	doResult: function (result, func) {
		var _this = this;
		var title = (result["status"] == 0 ? "SUCCESS" : "ERROR");
		var callback = ((typeof func == "undefined") ? _this.callbacks[result["status"]] : func);
		navigator.notification.alert(
			result["message"],
			callback,
			title,
			"OK"
		);
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
		$select.selectmenu();
		var text = (role == "sponsor" ? "Select Meeting to Activate" : "Select Meeting to Participate");
		var $optionTemp = $option.clone();
		$optionTemp.text(text).val(-1).prop("id", "opt-head-" + role);
		$optionTemp.prop("selected", true);
		$select.append($optionTemp);
		for (var i = 0; i < meetings.length; i++) {
			$optionTemp = $option.clone();
			$optionTemp.val(meetings[i]["Id"]);
			var startTime = _this.datetimeCsharp2js(meetings[i]["StartTime"]);
			var endTime = _this.datetimeCsharp2js(meetings[i]["EndTime"]);
			var optText = meetings[i]["Theme"] + ", " + $.datepicker.formatDate("yy-mm-dd", startTime) + " " + startTime.getHours() + ":" + startTime.getMinutes() + " to " + $.datepicker.formatDate("yy-mm-dd", endTime) + " " + endTime.getHours() + ":" + endTime.getMinutes();
			console.log(optText);
			$optionTemp.text(optText);
			$select.append($optionTemp);
		}
		$select.selectmenu("refresh", true);
		console.log($("#slt-meeting-" + role).html());
	},

	datetimeCsharp2js: function (cSharpDate) {
		var milli = cSharpDate.replace(/\/Date\((-?\d+)\)\//, '$1');
		return new Date(parseInt(milli));
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

