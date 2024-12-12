type TOfferTypeId = string;

type TOfferType = {
  id: string,
  type: string;
}

type TOffersTypes = TOfferType[];

type TNewOfferDetailItem = {
  type: string;
  title: string;
  price:  string;
}

type TOfferDetail = {
  id: string;
  title: string;
  price:  number;
}

type TOffer = {
  id: string,
  type: string;
  offers: TOfferDetail[];
}

type TOffers = TOffer[];

export {
  type TOfferTypeId,
  type TOfferType,
  type TOffersTypes,
  type TNewOfferDetailItem,
  type TOfferDetail,
  type TOffer,
  type TOffers,
};
