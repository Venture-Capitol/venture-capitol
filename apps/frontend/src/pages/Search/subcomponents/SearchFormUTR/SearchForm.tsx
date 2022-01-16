import React from "react";
import s from "./SearchForm.module.scss";

class SearchForm extends React.Component<
	{},
	{ chosenJobname: string; chosenAddress: string }
> {
	constructor(props: any) {
		super(props);
		this.state = {
			chosenJobname: "",
			chosenAddress: "",
		};

		this.handleChangeJobname = this.handleChangeJobname.bind(this);
		this.handleChangeAddress = this.handleChangeAddress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeJobname(event: any) {
		this.setState({ chosenJobname: event.target.value });
		console.log(this.state);
	}

	handleChangeAddress(event: any) {
		this.setState({ chosenAddress: event.target.value });
		console.log(this.state);
	}

	handleSubmit(event: any) {
		event.preventDefault();
		alert(
			"The form was submitted " +
				this.state.chosenAddress +
				" " +
				this.state.chosenJobname
		);
	}

	render() {
		return (
			<div className={s.maindiv}>
				<form className={s.form} onSubmit={this.handleSubmit}>
					<label className={s.input_block}>
						Dienstleistung
						<select
							name='Dienstleistungen'
							className={s.joboption}
							onChange={this.handleChangeJobname}
						>
							<option value='Notar'>Notar</option>
							<option value='Rechtsanwalt'>Rechtsanwalt</option>
							<option value='Steuerberater'>Steuerberater</option>
							<option value='Webagentur'>Webagentur</option>
						</select>
					</label>
					<label className={s.input_block}>
						Adresse
						<input
							type='text'
							value={this.state.chosenAddress}
							className={s.textinput}
							onChange={this.handleChangeAddress}
						/>
					</label>
					<input type='submit' value='Suchen' className={s.submit} />
				</form>
			</div>
		);
	}
}

export default SearchForm;
