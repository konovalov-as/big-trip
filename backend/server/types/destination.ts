
interface IPicture {
  src: string;
  description: string;
}

interface IDestination {
  description: string;
  name: string;
  pictures: IPicture[];
}

interface ICity {
  name: string
}

interface ICities extends Array<ICity>{}

export {
  type IPicture,
  type IDestination,
  type ICity,
  type ICities,
};
