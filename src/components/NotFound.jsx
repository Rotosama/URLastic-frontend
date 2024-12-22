import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from "@material-tailwind/react";

const NotFound = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-96">
				<CardHeader
					color="red"
					className="flex justify-center items-center"
				>
					<Typography variant="h4" color="white">
						404
					</Typography>
				</CardHeader>
				<CardBody className="text-center">
					<Typography variant="h5" color="blue-gray" className="mb-2">
						Page Not Found
					</Typography>
					<Typography color="blue-gray">
						The page you are looking for does not exist.
					</Typography>
				</CardBody>
			</Card>
		</div>
	);
};

export default NotFound;
