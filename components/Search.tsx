import Input from "./Input";
import { Search } from 'lucide-react';


interface SearchProps {
    onSearch: (query: string) => void;
    placerholder: string;
}
function Searchs({ onSearch, placerholder }: SearchProps) {
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      onSearch(query);
    };
  
  return (
    <form>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search />
        </div>
        <Input
          type="search"
          id="search"
          onChange={handleSearch}
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`${placerholder}`}
          
        />
      </div>
    </form>
  );
}

export default Searchs;
