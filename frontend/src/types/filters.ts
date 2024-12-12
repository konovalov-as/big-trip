interface IFilterItem {
  id: number;
  inputId: string;
  inputClassName: string;
  inputType: string;
  inputName: string;
  inputValue: string;
  labelClassName: string;
  labelText: string;
}
interface IFilterList extends Array<IFilterItem> {}

export {
  type IFilterItem,
  type IFilterList,
};
