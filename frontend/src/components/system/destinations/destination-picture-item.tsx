import {ReactNode} from 'react';
import {TPicture} from '../../../types';
import {STATIC_FILES_URL} from '../../../config/app.ts';

interface IDestinationPictureItemProps {
  controlElement?: ReactNode;
  picture: TPicture;
}

function DestinationPictureItem({controlElement, picture}: IDestinationPictureItemProps): JSX.Element {
  return (
    <li className="data-view__images-item">
      <div className="data-view__images-item-wrap">
        <div className="data-view__images-image">
          <img src={`${STATIC_FILES_URL}/${picture.src}`} alt={picture.description}/>
        </div>
        {controlElement}
      </div>
    </li>
  )
}

export {
  DestinationPictureItem,
};
