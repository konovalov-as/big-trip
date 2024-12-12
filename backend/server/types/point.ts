interface IPoint {
  base_price: number;
  date_from: string;
  date_to: string;
  destination: string;
  is_favorite: boolean;
  offers: Array<String>;
  type: string;
}

type TPoints = IPoint[];

export {
  type IPoint,
  type TPoints,
};
