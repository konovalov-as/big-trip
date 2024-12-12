import {store} from '../store';

type TState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch;

export {
  type TState,
  type TAppDispatch,
};
