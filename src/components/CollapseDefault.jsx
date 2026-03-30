import React from "react";
import { Collapse } from "@material-tailwind/react";
import { CustomUrl } from "./CustomUrl";

export default function CollapseDefault({ open, urlId }) {
	return (
		<Collapse open={open}>
			<div className="mt-4 bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C] overflow-hidden">
				<div className="h-1.5 bg-[#FF9760]" />
				<div className="p-6">
					<CustomUrl urlId={urlId} />
				</div>
			</div>
		</Collapse>
	);
}
