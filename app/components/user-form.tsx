import { FC } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { EditableUser, Gender, User } from "../types";
import styles from "./user-form.module.css";

interface UserFormProps {
  user?: Omit<User, "id">;
  submitButtonText: string;
  onSubmit: (data: Omit<User, "id">) => void;
  onClose: () => void;
}

const EMPTY_USER: EditableUser = {
  gender: null,
  firstName: "",
  lastName: "",
  age: null,
};

const userSchema = yup
  .object()
  .shape({
    gender: yup
      .string()
      .oneOf(Object.values(Gender), "Please select a gender from the list")
      .required("Required"),
    firstName: yup
      .string()
      .required("Required")
      .min(5, "First name must be at least 5 characters")
      .max(20, "First name must be no more than 20 characters"),
    lastName: yup
      .string()
      .required("Required")
      .min(5, "Last name must be at least 5 characters")
      .max(20, "Last name must be no more than 20 characters"),
    age: yup
      .number()
      .when("gender", ([gender]) => {
        return gender === Gender.Male
          ? yup
              .number()
              .typeError("Required")
              .required("Required")
              .min(18, "Users must be at least 18 years old")
              .max(112, "The maximum age for male users is 112")
          : yup
              .number()
              .typeError("Required")
              .required("Required")
              .min(18, "Users must be at least 18 years old")
              .max(117, "The maximum age for female users is 117");
      })
      .required(),
  })
  .required();

const UserForm: FC<UserFormProps> = ({
  user,
  submitButtonText,
  onSubmit,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user || (EMPTY_USER as User),
    resolver: yupResolver(userSchema),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="gender" className={styles.form_label}>
        Gender
        <select
          id="gender"
          className={`${styles.form_input} ${
            errors.gender?.message ? styles.label_error : ""
          }`}
          {...register("gender")}
        >
          <option value=""></option>
          <option value={Gender.Male}>Male</option>
          <option value={Gender.Female}>Female</option>
        </select>
        <p className={styles.input_error}>{errors.gender?.message}</p>
      </label>
      <label htmlFor="firstName" className={styles.form_label}>
        First name
        <input
          id="firstName"
          type="text"
          className={`${styles.form_input} ${
            errors.firstName?.message ? styles.label_error : ""
          }`}
          {...register("firstName")}
        />
        <p className={styles.input_error}>{errors.firstName?.message}</p>
      </label>
      <label htmlFor="lastName" className={styles.form_label}>
        Last name
        <input
          id="lastName"
          type="text"
          className={`${styles.form_input} ${
            errors.lastName?.message ? styles.label_error : ""
          }`}
          {...register("lastName")}
        />
        <p className={styles.input_error}>{errors.lastName?.message}</p>
      </label>
      <label htmlFor="age" className={styles.form_label}>
        Age
        <input
          id="age"
          type="number"
          className={`${styles.form_input} ${
            errors.age?.message ? styles.label_error : ""
          }`}
          {...register("age")}
        />
        <p className={styles.input_error}>{errors.age?.message}</p>
      </label>
      <div className={styles.form_actions}>
        <button
          type="submit"
          className="button button_primary button_medium button_expand"
        >
          {submitButtonText}
        </button>
        <button
          className="button button_secondary button_medium"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
