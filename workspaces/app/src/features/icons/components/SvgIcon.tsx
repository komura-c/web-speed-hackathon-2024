import {ArrowBack, Close, Favorite, FavoriteBorder, NavigateNext, Search} from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  type: 'ArrowBack' | 'NavigateNext' | 'Close' | 'Favorite' | 'FavoriteBorder' | 'Search';
  width: number;
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  switch (type) {
    case 'ArrowBack':
      return <ArrowBack style={{ color, height, width }} />;
    case 'NavigateNext':
      return <NavigateNext style={{ color, height, width }} />;
    case 'Close':
      return <Close style={{ color, height, width }} />;
    case 'Favorite':
      return <Favorite style={{ color, height, width }} />;
    case 'FavoriteBorder':
      return <FavoriteBorder style={{ color, height, width }} />;
    case 'Search':
      return <Search style={{ color, height, width }} />;
    default:
      return null;
  };
};
