import {selectCurrentFilterType} from '../../store';
import {useAppSelector} from '../../hooks';
import {EventMessage} from '../../utils';

function PointsEmptyList(): JSX.Element {
  const currentFilterType: string = useAppSelector(selectCurrentFilterType);

  return (
    <p className="trip-events__msg">
      {EventMessage[currentFilterType as keyof typeof EventMessage]}
    </p>
  );
}

export {
  PointsEmptyList,
};
