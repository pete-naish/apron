"use client";

import { useState } from "react";

import styles from "./page.module.css";

import CloseIcon from "./close-icon";
import DeleteIcon from "./delete-icon";
import AddIcon from "./add-icon";

export default function Users() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Users</h1>
          <button
            className={styles.button_cta}
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
            <tr className={styles.tr}>
              <td>Male</td>
              <td>Eric</td>
              <td>Smith</td>
              <td>35</td>
              <td>
                <div className={styles.row_action_container}>
                  <button
                    className={`${styles.button} ${styles.button_secondary} ${styles.button_small}`}
                  >
                    Edit
                  </button>
                  <button className={styles.icon_button}>
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>Female</td>
              <td>Kate</td>
              <td>Johnson</td>
              <td>29</td>
              <td>
                <div className={styles.row_action_container}>
                  <button
                    className={`${styles.button} ${styles.button_secondary} ${styles.button_small}`}
                  >
                    Edit
                  </button>
                  <button className={styles.icon_button}>
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      {showAddUserModal && (
        <section className={styles.modal_container}>
          <button
            className={`${styles.modal_close} ${styles.icon_button}`}
            onClick={() => setShowAddUserModal(false)}
          >
            <CloseIcon />
          </button>
          <div className={styles.modal_content}>
            <div className={styles.form_modal}>
              <h2>Add user</h2>
              <form className={styles.form}>
                <label htmlFor="gender" className={styles.form_label}>
                  Gender
                  <select value="" id="gender" className={styles.form_input}>
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                <label htmlFor="first_name" className={styles.form_label}>
                  First name
                  <input
                    id="first_name"
                    type="text"
                    className={styles.form_input}
                  />
                </label>
                <label htmlFor="last_name" className={styles.form_label}>
                  Last name
                  <input
                    id="last_name"
                    type="text"
                    className={styles.form_input}
                  />
                </label>
                <label htmlFor="age" className={styles.form_label}>
                  Age
                  <input id="age" type="text" className={styles.form_input} />
                </label>
              </form>
              <div className={styles.form_actions}>
                <button
                  className={`${styles.button} ${styles.button_secondary} ${styles.button_medium}`}
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`${styles.button} ${styles.button_primary}  ${styles.button_medium} ${styles.button_expand}`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
