const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex justify-center items-center space-x-2 mt-6">
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
						currentPage === page ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
					}`}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default Pagination;
