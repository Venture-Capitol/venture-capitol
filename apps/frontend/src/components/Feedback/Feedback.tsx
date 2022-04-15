import {
	AnnotationIcon,
	ThumbDownIcon,
	ThumbUpIcon,
} from "@heroicons/react/outline/esm";

import {
	ThumbUpIcon as ThumbUpIconSolid,
	ThumbDownIcon as ThumbDownIconSolid,
} from "@heroicons/react/solid/esm";
import * as Popover from "@radix-ui/react-popover";
import { sendFeedbackDislike, sendFeedbackLike } from "@vc/api/api";
import useMediaQuery from "@vc/frontend/util/useMediaQuery";
import React, { FC, useEffect, useState } from "react";
import s from "./Feedback.module.scss";
import FeedbackPopup from "./FeedbackPopup/FeedbackPopup";

interface FeedbackProps {
	currentTask: string;
}

const Feedback: FC<FeedbackProps> = ({ currentTask }) => {
	const [feedback, setFeedback] = useState<undefined | "like" | "dislike">();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width: 950px)");

	// clear feedback state on task change
	useEffect(() => {
		setFeedback(undefined);
	}, [currentTask]);

	// close popup when view changes to mobile
	useEffect(() => {
		if (isMobile) {
			setIsPopupOpen(false);
		}
	}, [isMobile]);

	function handleThumbClick(feedbackType: "like" | "dislike") {
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
					onClick={() => handleThumbClick("like")}
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
					onClick={() => handleThumbClick("dislike")}
				>
					{feedback == "dislike" ? (
						<ThumbDownIconSolid className={s.icon} />
					) : (
						<ThumbDownIcon className={s.icon} />
					)}
				</div>
			</div>
			<Popover.Root
				open={isPopupOpen}
				onOpenChange={() => {
					setIsPopupOpen(!isPopupOpen);
				}}
			>
				<div className={s.questionContainer}>
					<Popover.Anchor />
					<Popover.Trigger asChild>
						<div className={s.item}>
							<AnnotationIcon className={s.icon} />
							Frage stellen
						</div>
					</Popover.Trigger>
					<Popover.Content sideOffset={30} align={"end"} side='top'>
						<FeedbackPopup currentTask={currentTask} />
					</Popover.Content>
				</div>
			</Popover.Root>
		</div>
	);
};

export default Feedback;
