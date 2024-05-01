import { FC } from "react";

import { User } from "../types";
import DeleteIcon from "./icons/delete-icon";
import styles from "./user-table.module.css";
import IconButton from "./icon-button";

interface UserTableProps {
  users?: User[];
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

const UserTable: FC<UserTableProps> = ({
  users,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Gender</th>
          <th className={styles.th}>First name</th>
          <th className={styles.th}>Last name</th>
          <th className={styles.th}>Age</th>
          <th className={styles.th}></th>
        </tr>
      </thead>
      <tbody>
        {Boolean(users?.length) ? (
          users?.map((user) => {
            if (!user) return null;

            return (
              <tr key={user.firstName}>
                <td className={styles.td}>{user.gender}</td>
                <td className={styles.td}>{user.firstName}</td>
                <td className={styles.td}>{user.lastName}</td>
                <td className={styles.td}>{user.age}</td>
                <td className={styles.td}>
                  <div className={styles.row_action_container}>
                    <button
                      className="button button_secondary button_small"
                      onClick={() => onEditClick(user.id)}
                    >
                      Edit
                    </button>
                    <IconButton onClick={() => onDeleteClick(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td className={styles.no_results} colSpan={5} align="center">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
