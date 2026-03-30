import React from "react";

const ConfirmDialog = ({ title, description, onConfirm, onCancel, confirmLabel = "Delete" }) => (
	<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
		<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[6px_6px_0px_#1C1C1C] p-6 max-w-sm w-full animate-spring-in">
			<h3 className="font-extrabold text-lg text-[#1C1C1C] mb-2">{title}</h3>
			<p className="text-sm text-[#6B6B6B] mb-6">{description}</p>
			<div className="flex gap-3">
				<button
					onClick={onCancel}
					className="flex-1 py-2.5 border-2 border-[#1C1C1C] rounded-xl text-sm font-bold bg-white shadow-[2px_2px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1C1C] transition-all"
				>
					Cancel
				</button>
				<button
					onClick={onConfirm}
					className="flex-1 py-2.5 bg-[#F26076] text-white border-2 border-[#1C1C1C] rounded-xl text-sm font-bold shadow-[2px_2px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1C1C] transition-all"
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
);

export default ConfirmDialog;
