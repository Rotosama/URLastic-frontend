import React from "react";
import LoginButton from "./LoginButton";
import { UserContext } from "../../context/UserContext";
import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import {
	Navbar,
	Collapse,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from "@material-tailwind/react";

import {
	Bars3Icon,
	ChevronDownIcon,
	XMarkIcon,
	InboxArrowDownIcon,
} from "@heroicons/react/24/outline";

export function CustomNavbar() {
	const [openMenu, setOpenMenu] = React.useState(false);
	const [openNav, setOpenNav] = React.useState(false);
	const [lang, setLang] = React.useState("English");
	const { isLogged } = React.useContext(UserContext);

	React.useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			{isLogged && (
				<Typography
					as="li"
					variant="small"
					color="blue-gray"
					className="p-1 font-medium"
				>
					<Link to="/dashboard" className="flex items-center">
						<InboxArrowDownIcon className="size-4 m-2" />
						Dashboard
					</Link>
				</Typography>
			)}
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-medium"
			>
				<Link to="/account" className="flex items-center">
					<UserIcon className="size-4 m-2" />
					Account
				</Link>
			</Typography>
		</ul>
	);

	const countries = [
		{
			flag: "🇺🇸",
			name: "English",
		},
		{
			flag: "🇪🇸",
			name: "Spain",
		},
		{
			flag: "🇫🇷",
			name: "France",
		},
		{
			flag: "🇩🇪",
			name: "Germany",
		},
	];

	return (
		<Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
			<div className="flex items-center justify-between text-blue-gray-900">
				<Typography
					as="a"
					href="/"
					className="mr-4 cursor-pointer py-1.5 font-medium"
				>
					<img src="/logo.png" alt="Logo" className="h-16 w-auto" />
				</Typography>
				<div className="mr-4 hidden lg:block">{navList}</div>
				<div className="hidden flex-wrap items-center gap-2 lg:flex">
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-medium"
					>
						<LoginButton />
					</Typography>
					<Menu open={openMenu} handler={setOpenMenu}>
						<MenuHandler>
							<Button
								size="sm"
								variant="outlined"
								className="hidden items-center gap-2 lg:flex"
							>
								<span className="h-min text-base leading-none">
									{
										countries.find(
											({ name }) => name === lang
										)?.flag
									}
								</span>
								{
									countries.find(({ name }) => name === lang)
										?.name
								}
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`h-3.5 w-3.5 transition-transform ${
										openMenu ? "rotate-180" : ""
									}`}
								/>
							</Button>
						</MenuHandler>
						<MenuList className="hidden max-h-72 w-20 lg:block">
							{countries.map(({ name, flag }) => (
								<MenuItem
									key={name}
									className="flex items-center gap-2"
									onClick={() => setLang(name)}
								>
									{flag} {name}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
				</div>
				<IconButton
					variant="text"
					className="lg:hidden"
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<XMarkIcon className="h-6 w-6" strokeWidth={2} />
					) : (
						<Bars3Icon className="h-6 w-6" strokeWidth={2} />
					)}
				</IconButton>
			</div>
			<Collapse open={openNav}>
				{navList}
				<div className="flex w-full flex-nowrap items-center gap-x-4 lg:hidden">
					<LoginButton />
					<Menu open={openMenu} handler={setOpenMenu}>
						<MenuHandler>
							<Button
								fullWidth
								size="sm"
								variant="outlined"
								className="flex items-center justify-center gap-2 lg:hidden"
							>
								🇺🇸 English{" "}
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`w-3.h-3.5 h-3.5 transition-transform ${
										openMenu ? "rotate-180" : ""
									}`}
								/>
							</Button>
						</MenuHandler>
						<MenuList className="block max-h-72 w-20 lg:hidden">
							{countries.map(({ name, flag }) => (
								<MenuItem
									key={name}
									className="flex items-center gap-2"
								>
									{flag} {name}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
				</div>
			</Collapse>
		</Navbar>
	);
}

export default CustomNavbar;
