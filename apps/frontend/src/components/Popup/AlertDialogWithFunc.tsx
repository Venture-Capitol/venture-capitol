import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import s from "./Dialog.module.scss";

type AlertDialogProps = {
	title: string;
	children: React.ReactNode;
	trigger?: React.ReactNode;
	action?: React.ReactNode;
	cancel?: React.ReactNode;
	preventEscape?: boolean;
	defaultOpen: boolean;
	func: Function;
};

const AlertDialogWithFunc: React.FunctionComponent<AlertDialogProps> = ({
	title,
	children,
	trigger,
	action,
	cancel,
	preventEscape = false,
	defaultOpen: open,
	func,
}: AlertDialogProps) => (
	<RadixAlertDialog.Root defaultOpen={open}>
		{trigger && <RadixAlertDialog.Trigger>{trigger}</RadixAlertDialog.Trigger>}
		<RadixAlertDialog.Portal>
			<RadixAlertDialog.Overlay className={s.overlay} />
			<RadixAlertDialog.Content
				onEscapeKeyDown={e => {
					if (preventEscape) e.preventDefault();
				}}
				className={s.content}
			>
				<RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>
				<RadixAlertDialog.Description>{children}</RadixAlertDialog.Description>
				<div className={s.actions}>
					{cancel && (
						<RadixAlertDialog.Cancel asChild={true}>
							{cancel}
						</RadixAlertDialog.Cancel>
					)}
					{action && (
						<RadixAlertDialog.Action asChild={true} onClick={e => func()}>
							{action}
						</RadixAlertDialog.Action>
					)}
				</div>
			</RadixAlertDialog.Content>
		</RadixAlertDialog.Portal>
	</RadixAlertDialog.Root>
);

export default AlertDialogWithFunc;
