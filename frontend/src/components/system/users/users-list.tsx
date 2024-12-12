import {IUser, TAppDispatch} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {lockAsyncOneUser, selectUsers} from '../../../store';
import {LockIcon, UnlockIcon} from "../../icons";

function UsersList(): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();
  const allUsers: IUser[] = useAppSelector(selectUsers);

  const handleBlockUser = (userId: string): void => {
    dispatch(lockAsyncOneUser(userId));
  };

  return (
    <div className="data-view">
      <div className="data-view__header">
        <h3 className="data-view__title">Users list</h3>
      </div>

      <ul className="data-view__list">
        {allUsers.map((oneUser: IUser): JSX.Element => (
          <li
            key={oneUser.id}
            className="data-view__item"
          >
            <div className="data-view__item-wrap data-view__item-wrap-row data-view__item-wrap-row2">
              <div className="data-view__item-inner">
                <p className="data-view__item-text"><strong>Email:</strong> {oneUser.email}</p>
                <p className="data-view__item-text"><strong>Id:</strong> {oneUser.id}</p>
                <p className="data-view__item-text"><strong>Status: </strong> {`${oneUser.isActivated ? 'Activated user' : 'Unactivated user'}`}</p>
                <p className="data-view__item-text"><strong>Access: </strong> {`${oneUser.isLocked ? 'Blocked user' : 'Unblocked user'}`}</p>
                <p className="data-view__item-text"><strong>Roles:</strong></p>
                {oneUser.roles.map((oneRole: string): JSX.Element => (
                  <p className="data-view__item-text data-view__item-text--sub" key={oneRole}>{oneRole}</p>
                ))}
              </div>
              <div className="data-view__action">
                <button
                  className="sys-btn"
                  onClick={(): void => handleBlockUser(oneUser.id)}
                  type="button"
                  aria-label="Block or unblock user"
                >
                  {oneUser.isLocked ? <UnlockIcon /> : <LockIcon /> }
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export {
  UsersList,
};
