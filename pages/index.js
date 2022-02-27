import _ from "lodash"
import { useState } from "react";

export async function getServerSideProps() {
  const data = await fetch("https://covid-193.p.rapidapi.com/statistics", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": process.env.KEY,
    },
  });

  const res = await data.json();
  return { props: { data: res } };
}

export default function App({ data }) {
  const [filter, setFilter] = useState("country")

  function final(x) {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch {
      return;
    }
  }


  switch (filter) {
    case "cases":
      data = _.orderBy(data.response, ["cases.total"], ["desc"]);
      break;
    case "deaths":
      data = _.orderBy(data.response, ["deaths.total"], ["desc"]);
      break;
    case "recovered":
      data = _.orderBy(data.response, ["cases.recovered"], ["desc"]);
      break;
    case "active":
      data = _.orderBy(data.response, ["cases.active"], ["desc"]);
      break;
    default:
      data = _.sortBy(data.response, ["country"]);
      break;
  }

  return (
    <>
      <select name="sort" onChange={({ target }) => setFilter(target.value)} value={filter}>
        <option value="country">Country</option>
        <option value="cases">Total Cases</option>
        <option value="deaths">Total Deaths</option>
        <option value="recovered">Total Recovered</option>
        <option value="active">Active Cases</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {data.map((country) => {
            return country.country === country.continent || country.deaths.total <= 10 ||
            country.time.substring(0, 4) == "2021" ? null : (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td id="cases">
                  {final(country.cases.total)}
                  <span> {final(country.cases.new)}</span>
                </td>
                <td id="deaths">
                  {country.deaths.total && final(country.deaths.total)}
                  <span> {final(country.deaths.new)}</span>
                </td>
                <td id="recovered">
                  {country.cases.recovered && final(country.cases.recovered)}
                </td>
                <td id="active">
                  {country.cases.active && final(country.cases.active)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
