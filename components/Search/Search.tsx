import { Container, IconWrapper, InputText } from './Search.styled';
import SearchIcon from '@mui/icons-material/Search';

export interface IProps {
  onChange(searchText: string): void;
  value: string;
}

const Search = ({ value, onChange }: IProps) => {
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
