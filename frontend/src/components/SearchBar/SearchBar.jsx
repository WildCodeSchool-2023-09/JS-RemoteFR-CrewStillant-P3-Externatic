/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PropTypes from "prop-types";
import styles from "./searchbar.module.scss";

export default function SearchBar({
  setIsValidate,
  setTerms,
  filters,
  setFilters,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    console.info(data.search);
    setTerms(data.search);
    const params = new URLSearchParams(filters);
    params.set("terms", data.search);
    setFilters(params);
    setIsValidate(true);
  };

  return (
    <section className={`${styles.main}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          id="searchbar"
          className={`${styles.searchBar}`}
          placeholder="Votre recherche ici"
          {...register("search", {
            // required: "Veuillez entrer votre recherche.",
            minLength: {
              value: 2,
              message: "Veuillez entrer au moins 2 caractères.",
            },
          })}
        />
        <button
          type="submit"
          className="fa-solid fa-magnifying-glass"
          aria-label="submit"
        />
        <ErrorMessage
          errors={errors}
          name="search"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type} role="alert">
                {message}
              </p>
            ))
          }
        />
      </form>
    </section>
  );
}

SearchBar.propTypes = {
  setIsValidate: PropTypes.func.isRequired,
  setTerms: PropTypes.func.isRequired,
  filters: PropTypes.shape.isRequired,
  setFilters: PropTypes.func.isRequired,
};
