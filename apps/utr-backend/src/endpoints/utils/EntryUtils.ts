/* SEEMS TO BE UNNECESSARY DUE TO OPENAPI VALIDATOR
// REMOVE AFTER FURTHER TESTING
export function parseToBoolean(value: string) {
	if (value === undefined) {
		return value;
	} else if (value === "true" || value === "false") {
		return value === "true";
	} else {
		return null;
	}
}
*/

export function parseToNumber(value: string) {
	if (value === undefined) {
		return value;
	} else {
		return parseInt(value);
	}
}
