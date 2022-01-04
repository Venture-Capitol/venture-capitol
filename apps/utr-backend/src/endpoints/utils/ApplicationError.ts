export default class ApplicationError extends Error {
	public errorCode: number;

	constructor(message: string, errorCode: number) {
		super(message);
		this.errorCode = errorCode;

		Object.setPrototypeOf(this, ApplicationError.prototype);
	}
}
