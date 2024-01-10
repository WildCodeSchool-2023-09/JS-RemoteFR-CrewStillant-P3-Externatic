import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import { jobType, jobPlace } from "../../assets/datas/filterDatas";
import formatString from "../../services/formatString";
import "./searchpage.scss";

export default function SearchPage() {
  // Mes différents états lier à mon GET & les potentiels filtres via les query.
  const [data, setData] = useState("");
  const [terms, setTerms] = useState("");
  const [city, setCity] = useState("");
  const [salary, setSalary] = useState(0);
  const [place, setPlace] = useState("none");
  const [type, setType] = useState("none");
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
    if (terms) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}search?${filters.toString()}`)
        .then((res) => setData(res.data))
        .then(setIsValidate(false));
    }
  }, [isValidate, terms]);

  const handleFilters = () => {
    if (terms != null && terms !== "") {
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
    }
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
    try {
      if (terms != null && terms !== "") {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}search?terms=${terms}`)
          .then((res) => setData(res.data));
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.info(data);

  return (
    <main>
      <SearchBar
        setTerms={setTerms}
        filters={filters}
        setFilters={setFilters}
      />
      <section className="results">
        <div className="filters">
          <h3>Filtres recherche</h3>
          <form>
            <label htmlFor="city">Ville</label>
            <br />
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(formatString(e.target.value));
              }}
            />
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
            <br />
            {salary > 0 && `Supérieur à ${salary} € / an`}
            <li>Lieu de travail</li>
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
            <li>Type de contrat</li>
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
            <button type="button" onClick={handleFilters}>
              Appliquer filtres
            </button>
            <button type="button" onClick={handleReset}>
              Réinitialiser
            </button>
          </form>
        </div>
        <div className="offers">
          <div className="listOffers">
            {data &&
              data.map((e) => (
                <span key={e.id}>
                  <p>{e.title}</p>
                </span>
              ))}
          </div>
          <div className="detailledOffer">
            <p>offre détaillée</p>
          </div>
        </div>
      </section>
    </main>
  );
}
