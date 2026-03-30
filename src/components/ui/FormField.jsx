import React from "react";

const FormField = ({ label, type = "text", value, onChange, placeholder, hasError = false }) => (
	<div>
		<label className="block text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-1.5">
			{label}
		</label>
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`w-full px-4 py-3 border-2 rounded-xl text-sm bg-white outline-none transition-colors font-medium ${
				hasError
					? "border-[#F26076]"
					: "border-[#1C1C1C] focus:border-[#F26076]"
			}`}
		/>
	</div>
);

export default FormField;
