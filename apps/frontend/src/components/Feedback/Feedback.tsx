import {
	AnnotationIcon,
	ThumbDownIcon,
	ThumbUpIcon,
} from "@heroicons/react/outline/esm";

import {
	ThumbUpIcon as ThumbUpIconSolid,
	ThumbDownIcon as ThumbDownIconSolid,
} from "@heroicons/react/solid/esm";
import { sendFeedbackDislike, sendFeedbackLike } from "@vc/api/api";
import React, { FC, useEffect, useRef, useState } from "react";
import s from "./Feedback.module.scss";
import FeedbackPopup from "./FeedbackPopup/FeedbackPopup";

interface FeedbackProps {
	currentTask: string;
}

const Feedback: FC<FeedbackProps> = ({ currentTask }) => {
	const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
	const [feedback, setFeedback] = useState<undefined | "like" | "dislike">();

	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFeedback(undefined);
	}, [currentTask]);

	const handleFeedbackClick = () => {
		if (!isFeedbackPopupOpen) {
			document.addEventListener("mousedown", handleOutsideClick, true);
		}
		setIsFeedbackPopupOpen(!isFeedbackPopupOpen);
	};

	function handleOutsideClick(e: MouseEvent) {
		if (!popupRef.current) return;
		if (!popupRef.current.contains(e.target as Node)) {
			setIsFeedbackPopupOpen(false);
			document.removeEventListener("mousedown", handleOutsideClick, true);
		}
	}

	function handleThumbClick(
		e: React.MouseEvent,
		feedbackType: "like" | "dislike"
	) {
		if (feedbackType != feedback) {
			if (feedbackType == "like") {
				setFeedback("like");
				sendFeedbackLike({ taskId: currentTask });
			} else if (feedbackType == "dislike") {
				setFeedback("dislike");
				sendFeedbackDislike({ taskId: currentTask });
			}
		} else {
			setFeedback(undefined);
		}
	}

	return (
		<div className={s.container}>
			<div className={s.thumbs}>
				{feedback && (
					<div className={s.feedbackNotification}>Danke für dein Feedback.</div>
				)}
				<div
					className={`${s.item} ${s.bubbles} ${feedback == "like" && s.active}`}
					onClick={e => {
						handleThumbClick(e, "like");
					}}
				>
					{feedback == "like" ? (
						<ThumbUpIconSolid className={s.icon} />
					) : (
						<ThumbUpIcon className={s.icon} />
					)}
				</div>
				<div
					className={`${s.item} ${s.bubbles} ${
						feedback == "dislike" && s.active
					}`}
					onClick={e => {
						handleThumbClick(e, "dislike");
					}}
				>
					{feedback == "dislike" ? (
						<ThumbDownIconSolid className={s.icon} />
					) : (
						<ThumbDownIcon className={s.icon} />
					)}
				</div>
			</div>
			<div className={s.questionContainer} ref={popupRef}>
				<div className={s.item} onClick={handleFeedbackClick}>
					<AnnotationIcon className={s.icon} />
					Frage stellen
				</div>

				{isFeedbackPopupOpen && (
					<div className={s.popup}>
						<FeedbackPopup
							currentTask={currentTask}
							closePopup={() => {
								setIsFeedbackPopupOpen(false);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Feedback;
