import { FC, ChangeEvent, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  debounce,
  objectToQueryString,
  linkToParamObject,
} from "../../../utils/auxiliary";
import { ComponentProps } from "../../../interfaces/route.interface";
import { useLocation } from "react-router-dom";

const SearchForm: FC<ComponentProps> = ({ message }) => {
  console.log(`${message} SearchForm`);
  const location = useLocation();
  let paramObject = linkToParamObject(location.search);

  const currentSearch =
    paramObject && paramObject.searchTerms ? paramObject.searchTerms : ``;

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
          defaultValue={currentSearch}
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
