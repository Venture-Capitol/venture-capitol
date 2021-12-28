import * as AlertDialog from "@radix-ui/react-alert-dialog";
import s from "./Popup.module.scss";

type PopupProps = {
	title: string;
	children: React.ReactNode;
	trigger?: React.ReactNode;
	action?: React.ReactNode;
	cancel: React.ReactNode;
	legal: boolean;
	open: boolean;
};

const Popup: React.FunctionComponent<PopupProps> = ({
	title,
	children,
	trigger,
	action,
	cancel,
	legal,
	open,
}: PopupProps) => (
	<AlertDialog.Root defaultOpen={open}>
		{trigger && <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>}
		<AlertDialog.Portal>
			<AlertDialog.Overlay className={s.overlay} />
			<AlertDialog.Content className={s.content}>
				<AlertDialog.Title>{title}</AlertDialog.Title>
				<AlertDialog.Description>{children}</AlertDialog.Description>
				<div className={s.actions}>
					{cancel && <AlertDialog.Cancel>{cancel}</AlertDialog.Cancel>}
					{action && <AlertDialog.Action>{action}</AlertDialog.Action>}
					{legal && (
						<span className={s.legal_links}>
							<a href='/textpages/impressum'>Impressum</a> |{" "}
							<a href='textpages/datenschutz'>Datenschutz</a>
						</span>
					)}
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default Popup;
