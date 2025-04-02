import { lexen } from "@/ui/fonts";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

function Pagination({currentPage, totalPages, handlePageChange}: PaginationProps) {
    
   
    
    return ( 
        <nav className=" flex items-center flex-column flex-wrap md:flex-row justify-between  pt-4">
        <ul className=" inline-flex -space-x-px text-sm h-8">
          <li >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={` rounded-sm flex items-center justify-center px-3 h-8 leading-tight text-black bg-[#DBF227] borderhover:bg-[#B5FF57] hover:text-gray-700 ${lexen.className}`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === index + 1
                    ? "text-black bg-blue-50"
                    : "text-gray-500 bg-[#f0fee0]"
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
             className={` rounded-sm flex items-center justify-center px-3 h-8 leading-tight text-black bg-[#DBF227] borderhover:bg-[#B5FF57] hover:text-gray-700 ${lexen.className}`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
     );
}

export default Pagination;