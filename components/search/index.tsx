import { FunctionComponent } from 'react';
import { Container, IconWrapper, InputText } from './searchStyled';
import SearchIcon from '@mui/icons-material/Search';

export type SearchProps = {
  onChange(searchText: string): void;
  value: string;
};

const Search: FunctionComponent<SearchProps> = ({ value, onChange }) => {
  return (
    <Container>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <InputText
        onChange={(event) => {
          const value = event.target.value;

          onChange(value);
        }}
        value={value}
        placeholder="Buscar…"
        inputProps={{ 'aria-label': 'buscar' }}
      />
    </Container>
  );
};

export default Search;
