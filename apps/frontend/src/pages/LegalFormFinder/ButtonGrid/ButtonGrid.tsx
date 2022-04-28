import s from "./ButtonGrid.module.scss";

interface ButtonGridProps {
	options: {
		id: string;
		name: string;
		Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
	}[];
	onChange?: (selectedId: string) => void;
}

export default function ButtonGrid({ options }: ButtonGridProps) {
	return (
		<div className={s.buttonGrid}>
			<form onSubmit={e => e.preventDefault()}>
				{options.map(option => (
					<div className='option'>
						<input type='radio' name='radio' id={option.id} />
						<label key={option.id} htmlFor={option.id}>
							{<option.Icon height={40} />}
							{option.name}
						</label>
					</div>
				))}
			</form>
		</div>
	);
}
