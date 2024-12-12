type TPicture = {
  src: string;
  description: string;
}

type TDestination = {
  id: string;
  description: string;
  name: string;
  pictures: TPicture[];
}

type TIsFocusedPictureDescriptions = {
  [key: number]: boolean;
}

type TPictureDescriptions = {
  [key: number]: string;
}

type TPictureDescriptionsErrors = {
  [key: number]: string | undefined;
};

type TNewDestination = {
  description: string;
  name: string;
  pictureDescriptions: TPictureDescriptions
}

type TCity = {
  id: string,
  name: string,
}

type TCities = TCity[];

type TDestinations = TDestination[];

export {
  type TPicture,
  type TDestination,
  type TIsFocusedPictureDescriptions,
  type TPictureDescriptions,
  type TPictureDescriptionsErrors,
  type TNewDestination,
  type TCity,
  type TCities,
  type TDestinations,
};
