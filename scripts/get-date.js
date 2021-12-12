const getDatePath = () => {
	const monthNames = "JanFebMarAprMayJunJulAugSepOctNovDec";
	const today = new Date();
	const day = today.getDate().toString().padStart(2, '0');
	const month = monthNames.slice(today.getMonth() * 3, today.getMonth() * 3 + 3);
	const year = today.getFullYear();

	const date = `${day}-${month}-${year}`;
	return date;
}

exports.getDatePath = getDatePath;