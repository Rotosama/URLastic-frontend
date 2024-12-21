import React from "react";
import { Collapse, Card, Typography, CardBody } from "@material-tailwind/react";
import { CustomUrl } from "./CustomUrl";

export default function CollapseDefault({ open }) {
	return (
		<Collapse open={open}>
			<Card className={`my-4 mx-auto ${!open ? "hidden" : ""}`}>
				<CardBody>
					<Typography>
						<CustomUrl />
					</Typography>
				</CardBody>
			</Card>
		</Collapse>
	);
}
