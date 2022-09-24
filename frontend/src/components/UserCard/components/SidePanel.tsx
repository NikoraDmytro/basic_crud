import React from "react";
import classNames from "classnames";

import editIcon from "../img/edit.png";
import deleteIcon from "../img/delete.png";

import { deleteUser } from "service/usersApi";
import { useAxiosMutation } from "hooks/useAxiosMutation";

import { Spinner } from "components/Loaders/Spinner/Spinner";

import styles from "./SidePanel.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  removeFromList: (id: string) => void;
}

export const SidePanel = ({ id, removeFromList }: Props) => {
  const navigate = useNavigate();
  const [remove, { loading, error }] = useAxiosMutation(deleteUser);

  if (error) {
    alert(error);
  }

  const handleDelete = async () => {
    const confirm = window.confirm("You sure you want to delete this user?");

    if (confirm) {
      await remove(id);

      removeFromList(id);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className={classNames(styles.sidePanelBtn, styles.deleteUserBtn)}
      >
        {loading ? <Spinner /> : <img src={deleteIcon} alt="Delete" />}
      </button>

      <button
        onClick={() => navigate(`edit/${id}`)}
        className={classNames(styles.sidePanelBtn, styles.editUserBtn)}
      >
        <img src={editIcon} alt="Edit" />
      </button>
    </>
  );
};
