export const buildShortUrl = (shortenUrl) =>
	`${process.env.REACT_APP_BASE_URL}urls/r/${shortenUrl}`;
