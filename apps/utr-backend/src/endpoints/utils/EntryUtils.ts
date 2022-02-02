export function parseToBoolean(value: any) {
	if (value === undefined || value === true || value === false) {
		return value;
	} else if (value == "true" || value == "false") {
		return value == "true";
	} else {
		return null;
	}
}

export function parseToNumber(value: any) {
	if (value === undefined) {
		return value;
	} else {
		return parseInt(value);
	}
}
