// src/components/SearchInput.js
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;

  &:focus {
    border-color: #2196f3;
    outline: none;
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
  }
`;

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Cari tugas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Wrapper>
  );
};

export default SearchInput;
