import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import { jobType, jobPlace } from "./datas/filterDatas";
import { formatString, replaceAll } from "../../services/formatting";
import styles from "./searchpage.module.scss";

export default function SearchPage() {
  // Mes différents états lier à mon GET & les potentiels filtres via les query.
  const [data, setData] = useState("");
  const [terms, setTerms] = useState("");
  const [city, setCity] = useState("");
  const [salary, setSalary] = useState(0);
  const [place, setPlace] = useState("none");
  const [type, setType] = useState("none");
  const [offer, setOffer] = useState(null);
  const [isValidate, setIsValidate] = useState(false);
  const [filters, setFilters] = useSearchParams();

  const handleSelectPlacesChange = (e) => {
    if (e.target.value !== "none") {
      setPlace(e.target.value);
    }
  };

  const handleSelectTypesChange = (e) => {
    if (e.target.value !== "none") {
      setType(e.target.value);
    }
  };

  useEffect(() => {
    if (isValidate) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/job/searchPage?${filters.toString()}`
        )
        .then((res) => setData(res.data))
        .then(setIsValidate(false));
    }
  }, [isValidate]);

  console.info(data);

  /**
   * Fonction qui vient appliquer les filtres.
   */
  const handleFilters = () => {
    const params = new URLSearchParams(filters);
    params.set("terms", terms);
    if (city !== "") {
      params.set("location", city);
    }
    if (salary !== 0) {
      params.set("salary", salary);
    }
    if (place !== "none") {
      params.set("place", place);
    }
    if (type !== "none") {
      params.set("type", type);
    }
    setFilters(params);
    setIsValidate(true);
  };

  /**
   * Fonction qui vient réinitialiser les filtres tout en gardant les termes de la recherche initiale.
   */
  const handleReset = () => {
    const params = new URLSearchParams(filters);
    params.delete("city");
    setCity("");
    params.delete("salary");
    setSalary(0);
    params.delete("place");
    setPlace("none");
    params.delete("type");
    setType("none");
    setFilters(params);
    setIsValidate(true);
    // try {
    //   if (terms != null && terms !== "") {
    //     axios
    //       .get(
    //         `${import.meta.env.VITE_BACKEND_URL}/job/searchPage?terms=${terms}`
    //       )
    //       .then((res) => setData(res.data));
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const clickOffer = (id) => {
    setOffer(data.find((e) => id === e.id));
  };

  return (
    <main>
      <SearchBar
        setIsValidate={setIsValidate}
        setTerms={setTerms}
        filters={filters}
        setFilters={setFilters}
      />
      <section className={`${styles.results}`}>
        <div className={`${styles.filters}`}>
          <div className={`${styles.title}`}>
            <h3>Filtres recherche</h3>
          </div>
          <div className={`${styles.form}`}>
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(formatString(e.target.value));
              }}
            />
            <div>
              <span>
                <label htmlFor="salary">Salaire</label>
              </span>
              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              />
              {salary > 0 && (
                <p className={`${styles.Rsalary}`}>
                  Supérieur à {salary} € / an
                </p>
              )}
            </div>
            <div className={`${styles.jobPlace}`}>
              <label htmlFor="jobPlaces">Lieu de travail</label>
              <select
                value={place}
                name="jobPlaces"
                id="jobPlaces"
                onChange={handleSelectPlacesChange}
              >
                <option value="none">---</option>
                {jobPlace.map((e) => (
                  <option key={e.id} value={e.value}>
                    {e.value}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${styles.jobTypes}`}>
              <label htmlFor="jobTypes">Type de contrat</label>
              <select
                value={type}
                name="jobTypes"
                id="jobTypes"
                onChange={handleSelectTypesChange}
              >
                <option value="none">---</option>
                {jobType.map((e) => (
                  <option key={e.id} value={e.value}>
                    {e.value}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${styles.buttons}`}>
              <button type="button" onClick={handleFilters}>
                Appliquer filtres
              </button>
              <button type="button" onClick={handleReset}>
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.offers}`}>
          <div className={`${styles.listOffers}`}>
            {data
              ? data.map((e) => (
                  <div key={e.id}>
                    <button type="button" onClick={() => clickOffer(e.id)}>
                      <h4>{e.title}</h4>
                    </button>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className={`${styles.detailledOffer}`}>
          {offer ? (
            <>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className={`${styles.smallInformations}`}>
                <p>
                  <b>Type de contrat :</b> {offer.type}
                </p>
                <p>
                  <b>Salaire annuel :</b> {offer.salary} €
                </p>
                <p>
                  <b>Heures hebdomadaires :</b> {offer.hours_worked}H
                </p>
                <p>
                  <b>Lieu de travail :</b> {offer.place}
                </p>
                <p>
                  <b>Adresse :</b> {replaceAll(offer.address)}
                </p>
                <p>
                  <b>Ville :</b> {offer.city}
                </p>
              </div>
              <iframe
                title="Maps Embed Location"
                width="450"
                height="350"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  import.meta.env.VITE_GOOGLE_API
                }&q=${offer.city}`}
              />
            </>
          ) : (
            <h2>Commencez à recherchez une offre</h2>
          )}
        </div>
      </section>
    </main>
  );
}
