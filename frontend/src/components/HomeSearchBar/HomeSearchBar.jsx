/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./searchbar.module.scss";

export default function HomeSearchBar() {
  const { setSearch } = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    setSearch(data.search);
    navigate(`/recherche?terms=${data.search}`);
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
