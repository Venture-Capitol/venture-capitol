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
	onOpenChange?: (open: boolean) => void;
};

const AlertDialog: React.FunctionComponent<AlertDialogProps> = ({
	title,
	children,
	trigger,
	action,
	cancel,
	preventEscape = false,
	defaultOpen: open,
	onOpenChange,
}: AlertDialogProps) => (
	<RadixAlertDialog.Root defaultOpen={open} onOpenChange={onOpenChange}>
		{trigger && (
			<RadixAlertDialog.Trigger asChild={true}>
				{trigger}
			</RadixAlertDialog.Trigger>
		)}
		<RadixAlertDialog.Portal>
			<RadixAlertDialog.Overlay className={s.overlay} />
			<RadixAlertDialog.Content
				onEscapeKeyDown={e => {
					if (preventEscape) e.preventDefault();
				}}
				className={s.content}
			>
				<RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>
				<RadixAlertDialog.Description className={s.description}>
					{children}
				</RadixAlertDialog.Description>
				<div className={s.actions}>
					{cancel && (
						<RadixAlertDialog.Cancel asChild={true}>
							{cancel}
						</RadixAlertDialog.Cancel>
					)}
					{action && (
						<RadixAlertDialog.Action asChild={true}>
							{action}
						</RadixAlertDialog.Action>
					)}
				</div>
			</RadixAlertDialog.Content>
		</RadixAlertDialog.Portal>
	</RadixAlertDialog.Root>
);

export default AlertDialog;
