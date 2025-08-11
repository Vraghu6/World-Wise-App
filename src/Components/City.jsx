import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import BackButton from "./BackButton";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  console.log(id);
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  if (!currentCity) return <p>Loading city details...</p>;
  if (isLoading) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;
  // return <h1>Hey {id}</h1>;
  // const { currentCity } = useCities;
  // console.log(currentCity);

  return (
    <div className={styles.city}>
      <div className={styles.rows}></div>
      <h6>cityName</h6>
      <h3>
        <span>{emoji}</span> {cityName}
      </h3>

      <div className={styles.rows}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.rows}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.rows}>
        <h6>Learn More</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="__blank"
          rel="noreferrer"
        >
          Check out {cityName} on wikipedia &rarr
        </a>
      </div>
      <BackButton />
    </div>
  );
}

export default City;
