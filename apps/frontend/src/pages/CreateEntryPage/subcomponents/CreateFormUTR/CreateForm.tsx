import React from "react";
import s from "./CreateForm.module.scss";

const CreateForm: React.FunctionComponent = () => {
	return (
		<div className={s.maindiv}>
			<form className={s.form}>
				<label className={s.input_block}>
					Firmenname*
					<input type='text' className={s.textinput} />
				</label>
				<label className={s.input_block}>
					Dienstleistung*
					<select name='Dienstleistungen' className={s.joboption}>
						<option value='Notar'>Notar</option>
						<option value='Rechtsanwalt'>Rechtsanwalt</option>
						<option value='Steuerberater'>Steuerberater</option>
						<option value='Webagentur'>Webagentur</option>
					</select>
				</label>
				<label className={s.input_block}>
					Adresse / PLZ / Ort*
					<input type='text' className={s.textinput} />
				</label>
				<label className={s.input_block}>
					E-Mail Adresse*
					<input type='text' className={s.textinput} />
				</label>
				<label className={s.input_block}>
					Telefon
					<input type='text' className={s.textinput} />
				</label>
				<label className={s.input_block}>
					Website
					<input type='text' className={s.textinput} />
				</label>
				<input type='submit' value='Suchen' className={s.submit} />
			</form>
		</div>
	);
};

export default CreateForm;
