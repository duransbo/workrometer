/* GENERIC FUNCTIONS */
var funcGetElement = function (prmId) {
	return document.querySelector(prmId);
};



var funcAddEvent = function (prmId, prmEvent, prmFunc) {

	var elements = document.querySelectorAll(prmId);
	var i;

	for (i = 0; i < elements.length; i++) {
		elements[i].addEventListener(prmEvent, prmFunc);
	}

};
/* !GENERIC FUNCTIONS */



/* CLASSES */
var ClassAjax = function () {

	var atrAjax = (XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

	var mtdLoad = function (prmFile, prmPost, prmLoaded = function () {}, prmLoading = function () {}) {
		atrAjax.open("POST", prmFile, true);
		atrAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		prmLoading();
		atrAjax.onreadystatechange = function(){
			if(atrAjax.readyState == 4) {
				if(atrAjax.status == 200) {
					prmLoaded();
				}
			}
		}
		atrAjax.send(prmPost);
	}

	var mtdResponse = function () {
		return atrAjax.responseText;
	}

	return {
		load : mtdLoad,
		response : mtdResponse
	}
}
/* !CLASSES */