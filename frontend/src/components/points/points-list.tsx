import {useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import {v4 as uuidv4} from 'uuid';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  selectFilteredAndSortedPoints,
  selectIsVisibleNewPoint,
  selectOpenPointId,
  setPointId,
  setIsVisibleNewPoint,
} from '../../store';
import {PointItem, PointEdit,} from '../../components';
import {TPoints, TPoint,} from '../../types';

interface INewPoint {
  isNew: boolean;
  point: TPoint;
  handleDetailPointToggle: CallableFunction;
}

function PointsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const filteredAndSortedPoints: TPoints = (useAppSelector(selectFilteredAndSortedPoints));
  const isVisibleNewPoint: boolean = useAppSelector(selectIsVisibleNewPoint);
  const openPointId: number | null = useAppSelector(selectOpenPointId);
  
  const handleDetailPointToggle = (idx: number) => {
    dispatch(setIsVisibleNewPoint(false));
    idx === openPointId ? dispatch(setPointId(null)) : dispatch(setPointId(idx));
  };

  const newPoint: INewPoint = {
    point: {
      id: uuidv4(),
      base_price: 0,
      date_from: new Date(Date.now()).toISOString(), // 'YYYY-MM-DDTHH:mm:ss.sssZ',
      date_to: new Date(Date.now()).toISOString(), // 'YYYY-MM-DDTHH:mm:ss.sssZ',
      destination: '', // uuid, for example '33e40ccc-f321-4ec7-9e4f-f7d30c873a40',
      is_favorite: false,
      offers: [], // Array of uuid,
      type: 'flight', // default value
    },
    isNew: true,
    handleDetailPointToggle,
  };

  const newPointRef = useRef(null);

  return (
    <ul className="trip-events__list">
      <CSSTransition
        timeout={500}
        classNames="fade"
        in={isVisibleNewPoint}
        nodeRef={newPointRef}
        unmountOnExit
      >
        <div
          ref={newPointRef}
        >
          <PointEdit
            point={newPoint.point}
            isNew={newPoint.isNew}
            handleDetailPointToggle={newPoint.handleDetailPointToggle}
          />
        </div>
      </CSSTransition>

      {filteredAndSortedPoints.map((onePoint: TPoint, idx: number) => (
        <PointItem
          key={onePoint.id}
          onePoint={onePoint}
          handleDetailPointToggle={() => handleDetailPointToggle(idx)}
          isOpenPoint={idx === openPointId}
        />
        )
      )}
    </ul>
  );
}

export {
  PointsList,
};

