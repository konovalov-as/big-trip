import {ReactNode} from 'react';

interface IDestinationPicturesProps {
  children?: ReactNode;
}

function DestinationPicturesList({children}: IDestinationPicturesProps): JSX.Element {
  return (
    <div className="data-view__images">
      <ul className="data-view__images-list">
        {children}
      </ul>
    </div>
  )
}

export {
  DestinationPicturesList,
};
