"use client";

import { FC, useEffect, useState } from "react";

import { User } from "./types";
import styles from "./page.module.css";

import AddIcon from "./components/icons/add-icon";
import UserForm from "./components/user-form";
import Modal from "./components/modal";
import UserTable from "./components/user-table";
import CircularProgress from "./components/circular-progress";

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
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const getUsers = async () => {
    const users = await getUserData();
    setUsers(users);
    setLoading(false);
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

  const handleEditClick = (id: string) => {
    setShowEditUserModal(true);
    setSelectedUserId(id);
  };

  const handleDeleteClick = (id: string) => {
    setShowDeleteUserModal(true);
    setSelectedUserId(id);
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
        {!loading ? (
          <UserTable
            users={users}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ) : (
          <CircularProgress />
        )}
      </main>
      {showAddUserModal && (
        <Modal onClose={handleAddUserModalClose}>
          <h2>Add user</h2>
          <UserForm
            submitButtonText="Add"
            onSubmit={handleAddUserSubmit}
            onClose={handleAddUserModalClose}
          />
        </Modal>
      )}
      {showEditUserModal && selectedUserId && (
        <Modal onClose={handleEditUserModalClose}>
          <h2>Edit user</h2>
          <UserForm
            user={users.find((user) => user.id === selectedUserId)}
            submitButtonText="Save"
            onClose={handleEditUserModalClose}
            onSubmit={handleEditUserSubmit}
          />
        </Modal>
      )}
      {showDeleteUserModal && selectedUserId && (
        <Modal onClose={handleDeleteUserModalClose}>
          <h2 className={styles.title_emphasis}>
            Are you sure you want to delete user?
          </h2>
          <div className={styles.delete_actions}>
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
        </Modal>
      )}
    </>
  );
};

export default UserPage;
