// sets a cookie for 10 years
export function setCookie() {
	document.cookie =
		"VC_DP_ACK=true; max-age=" + 10 * 365 * 24 * 60 * 60 + "; path=/";
}

export function getCookie() {
	var cookieArr = document.cookie.split(";");
	for (var i = 0; i < cookieArr.length; i++) {
		var cookiePair = cookieArr[i].split("=");
		if (cookiePair[0].trim() == "VC_DP_ACK") {
			return decodeURIComponent(cookiePair[1]);
		}
	}
	return null;
}

export function checkCookie() {
	var VC_DP_ACK = getCookie();
	if (VC_DP_ACK == "true") {
		return true;
	} else {
		return false;
	}
}
