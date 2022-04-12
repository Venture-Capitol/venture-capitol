import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/outline/esm";
import { ExclamationIcon } from "@heroicons/react/solid/esm";
import * as Popover from "@radix-ui/react-popover";
import { API } from "@vc/api";
import { postFeedbackMessage } from "@vc/api/api";
import Button from "@vc/ui/src/components/Button/Button";
import React, { FC, useEffect, useRef, useState } from "react";
import s from "./FeedbackPopup.module.scss";

interface FeedbackPopupProps {
	currentTask: string;
}

const FeedbackPopup: FC<FeedbackPopupProps> = ({ currentTask }) => {
	const [loadingState, setLoadingState] = useState<
		undefined | "loading" | "error" | "success"
	>();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [nameValid, setNameValid] = useState<undefined | boolean>();
	const [emailValid, setEmailValid] = useState<undefined | boolean>();
	const [messageValid, setMessageValid] = useState<undefined | boolean>();

	const submitButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		document.body.classList.add(s.bodyPopup);
		return () => {
			document.body.classList.remove(s.bodyPopup);
		};
	}, []);

	function validateEmail(email: string) {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	}

	function handleOnChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		validateInput(e.currentTarget.name, e.currentTarget.value);
	}

	function validateInput(name: string, value: string) {
		switch (name) {
			case "name":
				setName(value);
				if (value.length > 0) {
					setNameValid(true);
				} else {
					setNameValid(false);
				}
				break;
			case "email":
				setEmail(value);
				if (validateEmail(value)) {
					setEmailValid(true);
				} else {
					setEmailValid(false);
				}
				break;
			case "message":
				setMessage(value);
				if (value.length > 0) {
					setMessageValid(true);
				} else {
					setMessageValid(false);
				}
				break;
			default:
				break;
		}
	}

	function handleSubmit(e: any) {
		e.preventDefault();

		if (!nameValid || !emailValid || !messageValid) {
			validateInput("name", name);
			validateInput("email", email);
			validateInput("message", message);
			submitButtonRef.current?.classList.remove(s.wiggle);
			submitButtonRef.current?.offsetWidth;
			submitButtonRef.current?.classList.add(s.wiggle);

			return;
		}

		setLoadingState("loading");

		// feedback request

		const body = {
			taskId: currentTask,
			name,
			email,
			message,
		};
		postFeedbackMessage(body)
			.then(res => {
				if (res.status === 200) {
					setLoadingState("success");
				} else {
					setLoadingState("error");
				}
			})
			.catch(err => {
				setLoadingState("error");
			});
	}

	const validIcon = (
		<div className={s.validateIcon} data-valid='true'>
			<CheckIcon />
		</div>
	);
	const invalidIcon = (
		<div className={s.validateIcon}>
			<ExclamationCircleIcon />
		</div>
	);

	return (
		<div className={s.wrapper}>
			{loadingState == "loading" && (
				<div className={s.loadingIndicator}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
			{loadingState == "error" && (
				<div className={s.errorContainer}>
					<ExclamationIcon className={s.icon} />
					<p>Beim Senden deiner Frage ist ein Fehler aufgetreten.</p>

					<Button
						onClick={e => {
							setLoadingState(undefined);
						}}
					>
						Erneut probieren
					</Button>
				</div>
			)}
			{loadingState == "success" && (
				<div className={s.errorContainer}>
					<CheckIcon className={s.icon} />
					<p>Deine Frage wurde erfolgreich gesendet.</p>
				</div>
			)}
			{loadingState == undefined && (
				<form className={s.form} onSubmit={handleSubmit} id='form'>
					<div className={s.formItem}>
						<label className={s.label} htmlFor='name'>
							Dein Name
						</label>
						<input
							className={s.input}
							id='name'
							type='text'
							name='name'
							value={name}
							placeholder='Max Mustermann'
							onChange={handleOnChange}
						/>
						{nameValid && validIcon}
						{nameValid == false && invalidIcon}
					</div>
					<div className={s.formItem}>
						<label className={s.label} htmlFor='email'>
							Deine Email
						</label>
						<input
							className={s.input}
							id='email'
							type='email'
							name='email'
							value={email}
							placeholder='deine@email.de'
							required={true}
							onChange={handleOnChange}
						/>
						{emailValid && validIcon}
						{emailValid == false && invalidIcon}
					</div>
					<div className={s.formItem}>
						<label className={s.label} htmlFor='message'>
							Deine Nachricht
						</label>
						<textarea
							className={s.textarea}
							id='message'
							name='message'
							value={message}
							placeholder='Hallo, ich würde gerne sagen...'
							required={true}
							onChange={handleOnChange}
						/>
						{messageValid && validIcon}
						{messageValid == false && invalidIcon}
					</div>
					<div className={s.actionContainer}>
						<Popover.Close>
							<Button variant='primary'>Abbrechen</Button>
						</Popover.Close>
						<Button
							variant='secondary'
							onClick={handleSubmit}
							ref={submitButtonRef}
						>
							Abschicken
						</Button>
					</div>
				</form>
			)}
		</div>
	);
};

export default FeedbackPopup;
