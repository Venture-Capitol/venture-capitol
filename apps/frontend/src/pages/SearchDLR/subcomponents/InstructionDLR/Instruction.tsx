import React from "react";
import s from "./Instruction.module.scss";

const Instruction: React.FunctionComponent = () => {
	return (
		<div className={s.maindiv_instruction}>
			<p className={s.instruction}>
				Wähle aus welche Dienstleistung du benötigst und gib deinen Standort an
			</p>
		</div>
	);
};

export default Instruction;
