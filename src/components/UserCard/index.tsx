import { useEditContext } from "../../context/edit.context";
import { UserType } from "../../type";

import Checkbox from "../CheckBoxInput";

type UserCardProps = {
  user: UserType;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { selectedItems, setSelectedItems, editMode } = useEditContext();

  const handleIndividualCheckboxChange = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <>
      <div className="userCard">
        <div className="userCard__checkbox-wrapper">
          {editMode && (
            <Checkbox
              checked={selectedItems.includes(user.id)}
              onChangeCheckbox={() => handleIndividualCheckboxChange(user.id)}
            />
          )}
        </div>
        <div className="userCard__imageContainer">
          <img
            className="userCard__image"
            src={user?.avatar_url}
            alt={`${user?.login} github profil`}
          />
        </div>
        <div className="userCard__description">
          <p>{user?.id}</p>
          <p>{user?.login}</p>
        </div>
        <button className="userCard__button">
          <a href={user?.html_url} target="_blank" rel="noreferrer" className="userCard__link">
            View profile
          </a>
        </button>
      </div>
    </>
  );
};

export default UserCard;
