import { FunctionComponent, ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Wrapper, FirefoxDetectionArea } from './infiniteScrollStyled';

export type InfiniteScrollProps = {
  isLoading: boolean;
  hasMoreItems?: boolean;
  callback(): void;
  loadingComponent?: ReactElement;
  noMoreItemsComponent?: ReactElement;
};

const InfiniteScroll: FunctionComponent<InfiniteScrollProps> = ({
  isLoading,
  hasMoreItems = true,
  callback,
  loadingComponent = 'Cargando',
  noMoreItemsComponent = 'Final de la lista',
}) => {
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && !isLoading && hasMoreItems) {
      callback();
    }
  }, [inView, isLoading, hasMoreItems, callback]);

  return (
    <>
      {isLoading && loadingComponent}
      {!isLoading && (
        <Wrapper ref={ref}>
          {(inView && !hasMoreItems && noMoreItemsComponent) || <FirefoxDetectionArea />}
        </Wrapper>
      )}
    </>
  );
};

export default InfiniteScroll;
