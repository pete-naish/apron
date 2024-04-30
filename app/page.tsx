"use client";

import { FC, useEffect, useState } from "react";

import { User } from "./types";
import AddIcon from "./add-icon";
import styles from "./page.module.css";
import DeleteIcon from "./delete-icon";
import CloseIcon from "./close-icon";
import UserForm from "./user-form";

const getUserData = async () => {
  const res = await fetch("/api/users", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const UserPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const getUsers = async () => {
    const users = await getUserData();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddUserModalClose = () => {
    setShowAddUserModal(false);
  };

  const handleAddUserSubmit = async (user: Omit<User, "id">) => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    getUsers();
    handleAddUserModalClose();
  };

  const handleEditUserModalClose = () => {
    setShowEditUserModal(false);
    setSelectedUserId("");
  };

  const handleEditUserSubmit = async (user: Omit<User, "id">) => {
    await fetch(`/api/users/${selectedUserId}`, {
      method: "PATCH",
      body: JSON.stringify(user),
    });

    getUsers();
    handleEditUserModalClose();
  };

  const handleDeleteUserModalClose = () => {
    setShowDeleteUserModal(false);
    setSelectedUserId("");
  };

  const handleDeleteUserSubmit = async () => {
    await fetch(`/api/users/${selectedUserId}`, {
      method: "DELETE",
    });

    getUsers();
    handleDeleteUserModalClose();
  };

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Users</h1>
          <button
            className="button_cta"
            onClick={() => setShowAddUserModal(true)}
          >
            <AddIcon />
            Add user
          </button>
        </header>
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
            {Boolean(users.length) ? (
              users.map((user) => {
                if (!user) return null;
                return (
                  <tr key={user.firstName} className={styles.tr}>
                    <td>{user.gender}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>
                      <div className={styles.row_action_container}>
                        <button
                          className="button button_secondary button_small"
                          onClick={() => {
                            setShowEditUserModal(true);
                            setSelectedUserId(user.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.icon_button}
                          onClick={() => {
                            setShowDeleteUserModal(true);
                            setSelectedUserId(user.id);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td style={{ padding: "2rem" }} colSpan={5} align="center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      {showAddUserModal && (
        <section className={styles.modal_container}>
          <button
            className={`${styles.modal_close} ${styles.icon_button}`}
            onClick={handleAddUserModalClose}
          >
            <CloseIcon />
          </button>
          <div className={styles.modal_content}>
            <div className={styles.form_modal}>
              <h2>Add user</h2>
              <UserForm
                submitButtonText="Add"
                onSubmit={handleAddUserSubmit}
                onClose={handleAddUserModalClose}
              />
            </div>
          </div>
        </section>
      )}
      {showEditUserModal && selectedUserId && (
        <section className={styles.modal_container}>
          <button
            className={`${styles.modal_close} ${styles.icon_button}`}
            onClick={handleEditUserModalClose}
          >
            <CloseIcon />
          </button>
          <div className={styles.modal_content}>
            <div className={styles.form_modal}>
              <h2>Edit user</h2>
              <UserForm
                user={users.find((user) => user.id === selectedUserId)}
                submitButtonText="Save"
                onClose={handleEditUserModalClose}
                onSubmit={handleEditUserSubmit}
              />
            </div>
          </div>
        </section>
      )}
      {showDeleteUserModal && selectedUserId && (
        <section className={styles.modal_container}>
          <button
            className={`${styles.modal_close} ${styles.icon_button}`}
            onClick={handleDeleteUserModalClose}
          >
            <CloseIcon />
          </button>
          <div className={styles.modal_content}>
            <div className={styles.form_modal}>
              <h2 className={styles.title_emphasis}>
                Are you sure you want to delete user?
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={handleDeleteUserSubmit}
                  className="button_warning button_bold button_large"
                >
                  Delete
                </button>
                <button
                  onClick={handleDeleteUserModalClose}
                  className="button_secondary button_bold button_large"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserPage;
