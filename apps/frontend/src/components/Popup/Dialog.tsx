import * as RadixDialog from "@radix-ui/react-dialog";
import s from "./AlertDialog.module.scss";

type DialogProps = {
	title: string;
	children: React.ReactNode;
	trigger?: React.ReactNode;
	close?: React.ReactNode;
	preventEscape?: boolean;
	defaultOpen: boolean;
};

const Dialog: React.FunctionComponent<DialogProps> = ({
	title,
	children,
	trigger,
	close,
	preventEscape = false,
	defaultOpen: open,
}: DialogProps) => (
	<RadixDialog.Root defaultOpen={open}>
		{trigger && <RadixDialog.Trigger>{trigger}</RadixDialog.Trigger>}
		<RadixDialog.Portal>
			<RadixDialog.Overlay className={s.overlay} />
			<RadixDialog.Content
				onEscapeKeyDown={e => {
					if (preventEscape) e.preventDefault();
				}}
				className={s.content}
			>
				<RadixDialog.Title>{title}</RadixDialog.Title>
				<RadixDialog.Description>{children}</RadixDialog.Description>
				<div className={s.actions}>
					{close && (
						<RadixDialog.Close asChild={true}>{close}</RadixDialog.Close>
					)}
				</div>
			</RadixDialog.Content>
		</RadixDialog.Portal>
	</RadixDialog.Root>
);

export default Dialog;
