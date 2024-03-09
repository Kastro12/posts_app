import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "../../../utils/auxiliary";

interface SearchFormProps {
  onSearch: (query: string) => void;
  initialValues: string;
}

const SearchForm: FC<SearchFormProps> = ({ onSearch, initialValues }) => {
  const [query, setQuery] = useState(initialValues);
  const navigate = useNavigate();

  const handleInputChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    navigate(`/posts?searchTerms=${event.target.value}`);
    setQuery(event.target.value);
  }, 400);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // navigate(`/cms/example-mapper?${util.url.param({ ...values, page: 1 })}`);

    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-lg-12">
        <label htmlFor="searchByNameInput" className="form-label">
          Search posts by user
        </label>

        <input
          type="text"
          id="searchByNameInput"
          placeholder="Type a name"
          // value={query}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
    </form>
  );
};

export default SearchForm;
