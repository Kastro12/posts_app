import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchForm from "../SearchForm";
import { MemoryRouter } from "react-router-dom";

describe("SearchForm component", () => {
  it("should update search when user types in the input field", async () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "?page=1" }]}>
        <SearchForm message="Test" />
      </MemoryRouter>
    );
    const input = getByPlaceholderText("Type a name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test user" } });
    expect(input.value).toBe("test user");
  });
});
