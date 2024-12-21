import React, { useEffect, useState, useContext } from "react";
import urlAPI from "../../apiCalls/urlApi";
import { UserContext } from "../../context/UserContext";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Card, IconButton, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Original URL", "Shortened URL", "Created At", "Actions"];

const Dashboard = () => {
	const { token, userId } = useContext(UserContext);
	const [urls, setUrls] = useState([]);

	useEffect(() => {
		const fetchUrls = async () => {
			const response = await urlAPI.getAllUrls(token, userId);
			setUrls(response);
		};

		fetchUrls();
	}, [token, userId]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-6xl p-4 overflow-auto">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th key={head} className="p-4 pt-10">
									<Typography
										variant="small"
										color="blue-gray"
										className="font-bold leading-none"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{urls.map((url, index) => (
							<tr key={url._id} className="even:bg-gray-50">
								<td className="p-4 max-w-xs truncate">
									<Typography
										variant="small"
										color="blue-gray"
										className="font-bold"
									>
										{url.originalUrl}
									</Typography>
								</td>
								<td className="p-4 max-w-xs truncate">
									<Typography
										variant="small"
										className="font-normal text-gray-600"
									>
										{url.shortenUrl}
									</Typography>
								</td>
								<td className="p-4">
									<Typography
										variant="small"
										className="font-normal text-gray-600"
									>
										{new Date(
											url.createdAt
										).toLocaleString()}
									</Typography>
								</td>
								<td className="p-4">
									<div className="flex items-center gap-2">
										<IconButton variant="text" size="sm">
											<DocumentIcon className="h-4 w-4 text-gray-900" />
										</IconButton>
										<IconButton variant="text" size="sm">
											<ArrowDownTrayIcon
												strokeWidth={3}
												className="h-4 w-4 text-gray-900"
											/>
										</IconButton>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>
		</div>
	);
};

export default Dashboard;
