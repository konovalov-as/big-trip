interface TPointDTO {
  base_price: number;
  date_from: string;
  date_to: string;
  destination: string;
  is_favorite: boolean;
  offers: string[];
  type: string;
}

type TPoint = {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: string;
  is_favorite: boolean;
  offers: string[];
  type: string;
}

type TPoints = TPoint[];

export {
  type TPoint,
  type TPoints,
  type TPointDTO,
};
