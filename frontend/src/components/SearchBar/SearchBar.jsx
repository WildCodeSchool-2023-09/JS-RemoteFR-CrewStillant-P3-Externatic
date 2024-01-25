/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./searchbar.module.scss";

export default function SearchBar({
  setIsValidate,
  setTerms,
  filters,
  setFilters,
}) {
  const { register, handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    const params = new URLSearchParams(filters);
    if (data.search !== "") {
      setTerms(data.search);
      params.set("terms", data.search);
      setFilters(params);
      setIsValidate(true);
    }
  };

  return (
    <section className={`${styles.main}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          id="searchbar"
          className={`${styles.searchBar}`}
          placeholder="Votre recherche ici"
          {...register("search")}
        />
        <button
          type="submit"
          className="fa-solid fa-magnifying-glass"
          aria-label="submit"
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
