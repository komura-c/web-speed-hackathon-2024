import { Suspense, useCallback, useEffect, useId, useState } from 'react';

import { useBookList } from '../../features/book/hooks/useBookList';
import { Box } from '../../foundation/components/Box';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { Input } from './internal/Input';
import { SearchResult } from './internal/SearchResult';

const SearchPage: React.FC = () => {
  const searchResultsA11yId = useId();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [keyword, setKeyword] = useState('')
  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword],
  );

  const getWithQuery = (query: string) => {
    if (!query) {
      return { 
        query: {
          name: '',
          nameRuby: '',
        }
      };
    }
    return { 
      query: {
        name: keyword,
        nameRuby: keyword,
      }
    }
  };
  const { data: books } = useBookList(getWithQuery(keyword));


  return (
    <Box px={Space * 2}>
      <Input 
          disabled={!isClient} 
          onBlur={(e) => {
              e.target.focus()
          }} 
          onChange={(e) => onChangedInput(e)}
        />
      <Box aria-labelledby={searchResultsA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text color={Color.MONO_100} id={searchResultsA11yId} typography={Typography.NORMAL20} weight="bold">
          検索結果
        </Text>
        {keyword !== '' && <SearchResult books={books} keyword={keyword} />}
      </Box>
    </Box>
  );
};

const SearchPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
};

export { SearchPageWithSuspense as SearchPage };
