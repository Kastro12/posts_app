import { FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { debounce, objectToQueryString } from "../../../utils/auxiliary";

interface SearchFormProps {
  initialValue: string;
}

const SearchForm: FC<SearchFormProps> = ({ initialValue }) => {
  const navigate = useNavigate();

  const handleInputChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    navigate(
      `/posts?${
        event.target.value
          ? objectToQueryString({
              searchTerms: event.target.value,
            })
          : ``
      }`
    );
  }, 400);

  return (
    <form className="row">
      <div className="col-lg-12">
        <label htmlFor="searchByNameInput" className="form-label">
          Search posts by user
        </label>

        <input
          defaultValue={initialValue}
          type="text"
          id="searchByNameInput"
          placeholder="Type a name"
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
    </form>
  );
};

export default SearchForm;
