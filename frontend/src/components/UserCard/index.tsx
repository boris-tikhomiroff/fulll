import { useEditContext } from "../../context/edit.context";
import { UserType } from "../../type";
import "./UserCard.css";

import { CheckBoxInput } from "..";

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
    <div className="user-card" data-testid="user-card">
      {editMode && (
        <div className="user-card__checkbox-wrapper">
          <CheckBoxInput
            checked={selectedItems.includes(user.id)}
            onChangeCheckbox={() => handleIndividualCheckboxChange(user.id)}
          />
        </div>
      )}
      <div className="user-card__image-container">
        <img
          className="user-card__image"
          src={user?.avatar_url}
          alt={`${user?.login} github profil`}
        />
      </div>
      <div className="user-card__description">
        <p>{user?.id}</p>
        <p>{user?.login}</p>
      </div>
      <button className="user-card__button" data-testid={`view-profile-${user.login}`}>
        <a href={user?.html_url} target="_blank" rel="noreferrer" className="user-card__link">
          View profile
        </a>
      </button>
    </div>
  );
};

export default UserCard;
