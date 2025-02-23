import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((resp) => setCountry(resp.data[0]))
      .catch((err) => console.error(err));
  }, [code]);

  if (!country)
    return <p className="text-center mt-10 text-xl">Carregando...</p>;

  return (
    <section className="px-12">
      <Link to="/" className="h-20 w-20 flex items-center gap-2 font-bold">
        <IoMdArrowRoundBack />
        Back
      </Link>
      <div className="flex justify-center items-center gap-12">
        <div className="w-1/2">
          <img src={country.flags.svg} alt={country.flags.alt} />
        </div>
        <div className="w-1/2 flex flex-col gap-8">
          <h1 className="text-2xl font-bold">{country.name.common}</h1>
          <div className="flex gap-12">
            <ul>
              <li>
                <span className="font-semibold">Native Name: </span>
                {country.name.official}
              </li>
              <li>
                <span className="font-semibold">Population: </span>
                {country.population}
              </li>
              <li>
                <span className="font-semibold">Region: </span>
                {country.region}
              </li>
              <li>
                <span className="font-semibold">Sub Region: </span>
                {country.subregion || "Não disponível"}
              </li>
              <li>
                <span className="font-semibold">Capital: </span>{" "}
                {country.capital || "Não disponível"}
              </li>
            </ul>
            <ul>
              <li>
                <span className="font-semibold">Top Level Domain: </span>
                {country.tld ? country.tld.join(", ") : "Não informado"}
              </li>
              <li>
                <span className="font-semibold">Currencies: </span>
                {country.currencies
                  ? Object.values(country.currencies)[0].name
                  : "Não informado"}{" "}
              </li>
              <li>
                <span className="font-semibold">Languages: </span>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "Não informado"}
              </li>
              <li>
                <span className="font-semibold">Mapa:</span>{" "}
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Google Maps
                </a>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <span className="font-semibold">Border Countries:</span>{" "}
              {country.borders ? country.borders.join(", ") : "Nenhuma"}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
