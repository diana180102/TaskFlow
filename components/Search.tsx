import Input from "./Input";
import { Search } from 'lucide-react';


interface SearchProps {
    onSearch: (query: string) => void;
    placeholder: string;
    className?: string
}
function Searchs({ onSearch, placeholder, className }: SearchProps) {
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      onSearch(query);
    };
  
  return (
    <form>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
          <Search />
        </div>
        <Input
          type="search"
          id="search"
          onChange={handleSearch}
          className={`block w-full p-2 ps-50 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 `  }
          placeholder={`${placeholder}`}
          style={{
            textIndent: '1.5rem', 
            background: '#f1f8ea'}}
          
        />
      </div>
    </form>
  );
}

export default Searchs;
