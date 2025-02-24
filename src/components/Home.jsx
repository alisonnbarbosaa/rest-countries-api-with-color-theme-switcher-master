import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

export default function Home() {
  //testando a branch
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((resp) => {
        setCountries(resp.data);
        setFilteredCountries(resp.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filterByRegion = (selectedRegion) => {
    const filterCountries = countries.filter(
      (country) => country.region === selectedRegion
    );
    setFilteredCountries(filterCountries);
  };

  useEffect(() => {
    const filterCountry = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    setFilteredCountries(filterCountry);
  }, [searchTerm, countries]);

  if (!countries.length)
    return <p className="text-center mt-10 text-xl">Carregando...</p>;

  return (
    <div>
      <header className="h-20 flex flex-col justify-around">
        <div className="flex justify-between px-12">
          <label className="flex gap-2 items-center dark:bg-slate-800">
            <IoIosSearch />
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent"
            />
          </label>
          <select
            onChange={(e) => filterByRegion(e.target.value)}
            className="dark:bg-slate-800"
          >
            <option selected disabled>
              Filter by Region
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </header>
      <section className="flex flex-wrap justify-center gap-12">
        {filteredCountries.map((countries) => (
          <Link key={countries.cca3} to={`/country/${countries.cca3}`}>
            <div className="w-72 flex flex-col items-center gap-4 pb-4 rounded-sm dark:bg-slate-800">
              <img
                src={countries.flags.svg}
                alt={countries.flags.alt}
                className="rounded-t-sm"
              />
              <div>
                <h2 className="font-bold text-lg">{countries.name.common}</h2>
                <p>
                  <span className="font-semibold">Population: </span>
                  {countries.population}
                </p>
                <p>
                  <span className="font-semibold">Region: </span>
                  {countries.region}
                </p>
                <p>
                  <span className="font-semibold">Capital: </span>
                  {countries.capital}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
