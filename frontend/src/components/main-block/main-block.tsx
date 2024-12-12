import {useAppSelector} from '../../hooks';
import {
  selectFilteredAndSortedPoints,
  selectIsDestinationLoading,
  selectIsPointsEmptyList,
  selectIsPointsLoading,
} from '../../store';
import {
  Loading,
  PointsEmptyList,
  Sorting,
  PointsList,
} from '../../components';
import {TPoints} from '../../types';

function MainBlock(): JSX.Element {
  const isPointsLoading: boolean = useAppSelector(selectIsPointsLoading);
  const isDestinationsLoading: boolean = useAppSelector(selectIsDestinationLoading);
  const isPointsEmptyList:boolean = useAppSelector(selectIsPointsEmptyList);
  const filteredPoints: TPoints = useAppSelector(selectFilteredAndSortedPoints);

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-decor">
          <section className="trip-events">
            <h2 className="visually-hidden">Trip events</h2>

            {(isPointsLoading || isDestinationsLoading) && <Loading />}

            {(( (!isPointsLoading || !isDestinationsLoading) && !!filteredPoints.length) && !isPointsEmptyList) && <Sorting />}

            {(isPointsEmptyList ) && <PointsEmptyList />}

            {(!isPointsEmptyList) && <PointsList />}
          </section>

        </div>
      </div>
    </main>
  );
}

export {
  MainBlock,
};
