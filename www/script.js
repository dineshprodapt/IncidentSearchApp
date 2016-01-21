var module = ons.bootstrap('incident-app', ['onsen']);
module.controller('IncidentSearchController', function($scope,$http) {

	$scope.wsUrl='http://vml707.windstream.com/itsm/index.php?callback=JSON_CALLBACK';
	ons.ready(function() {
	});
	
	$scope.date = new Date();
	
	$scope.searchInc = function(form){
		modal.show();	
		var vIncidentid = form.incidentid.$viewValue;
		
		if(vIncidentid.length!=15){
		 var vIncLength=vIncidentid.length;
		 var vZero='0';
		 var vINC='INC000000000000';
		 var vCount=vINC.length-vIncLength;
		 var vOffset=vINC.substring(0,vCount);
		 vIncidentid=vOffset+vIncidentid;
		}
		
		if(vIncidentid.length == 15 && vIncidentid.indexOf("INC") > -1 ){
			var url=$scope.wsUrl;
			$http.jsonp(url,
			{ params :{ 'inc_id' : vIncidentid } }
			)
			.success(function(data, status, headers, config) {
			$scope.showIncidentID = vIncidentid;
			$scope.showSummary = data.Summary;
			$scope.showAssignedGroup = data.Assigned_Group;
			$scope.showStatus = data.Status;
			
			//href="tel:+919940681807"
			
			if(data.Assigned_Group == "Operations Sys Supp: EPAY"){
			$scope.telnum = 'tel:+919940681807';
			}
			else{
			$scope.telnum = 'tel:+918124519538';
			}			
			
			app.navi.pushPage('incidentPage.html');
			clearSearch($scope);
			})
			
			.error(function(data, status, headers, config) {
			clearSearch($scope);
			ons.notification.alert({
					message: "Invalid IncidentID",
					title: 'WIN-Helpdesk'
					});
			})
		}
		else{
		clearSearch($scope);
			ons.notification.alert({
					message: "Invalid IncidentID",
					title: 'WIN-Helpdesk'
					});
		}
	}

	$scope.backClick = function(){
		ons.notification.confirm({
			message: 'Texting is under construction. Exit?',
			title: 'WIN-Helpdesk',
			buttonLabels: ['Yes', 'No'],
			animation: 'default', // or 'none'
			primaryButtonIndex: 1,
			cancelable: true,
			callback: function(index) {
				if(index == 0) {
					app.navi.pushPage("index.html", { animation: "lift"});
				}
			}
		});
	}
	
	$scope.msgSend = function(){
		var messageInfo = {
				phoneNumber: "+919940681807",
				textMessage: "This is a test message"
			};
			alert(messageInfo);
			sms.sendMessage(messageInfo, function(message) {
				alert("success: " + message);
			}, function(error) {
				alert("code: " + error.code + ", message: " + error.message);
			});
	
	}
	
});

function clearSearch($scope) {
	modal.hide();
	$scope.search = {
		incidentid: ''
	};
}