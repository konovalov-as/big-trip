import {useEffect} from 'react';
import {FormikErrors, useFormik} from 'formik';
import {TOfferDetail} from '../../../types';
import {CustomInput} from '../../custom-input/custom-input';
import {DeleteIcon} from "../../icons";

interface IEditTitleOfferProps {
  offerDetail: TOfferDetail;
  onAddOfferDetailItem: (updatedOfferDetail: TOfferDetail) => void;
  onDeleteOfferDetailItem: (offerDetailId: string) => void;
}

interface IOfferData {
  title: string;
  price: number,
}

const validate = (values: IOfferData) => {
  let errors: FormikErrors<IOfferData> = {};

  if (!values.title.trim()) {
    errors.title = 'Required';
  }

  if (!values.price) {
    errors.price = 'Required';
  }

  return errors;
}

function EditOfferDetail({
                           offerDetail,
                           onAddOfferDetailItem,
                           onDeleteOfferDetailItem
                         }: IEditTitleOfferProps): JSX.Element {
  const formik = useFormik<IOfferData>({
    initialValues: {
      title: offerDetail.title,
      price: offerDetail.price,
    },
    validate,
    onSubmit: (): void => {},
  })

  useEffect((): void => {
    onAddOfferDetailItem({
      id: offerDetail.id,
      title: formik.values.title,
      price: formik.values.price,
    })
  }, [formik.values.title, formik.values.price]);

  const handleDeleteOfferDetailItem = (): void => {
    onDeleteOfferDetailItem(offerDetail.id);
  };

  return (
    <li className="data-view__edit-item">
      <CustomInput
        customInputId="title"
        name="title"
        type="text"
        label="Title"
        value={formik.values.title}
        isTouched={formik.touched.title}
        errorMessage={formik.errors.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <CustomInput
        customInputId="price"
        name="price"
        type="text"
        label="Price"
        value={String(formik.values.price)}
        isTouched={formik.touched.price}
        errorMessage={formik.errors.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <div className="data-view__action">
        <button
          className="sys-btn sys-btn--warning sys-btn--small sys-btn--align"
          onClick={handleDeleteOfferDetailItem}
          type="button"
          aria-label="Delete offer item"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  )
}

export  {
  EditOfferDetail,
};
