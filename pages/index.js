import { useState } from "react";

export async function getServerSideProps() {
  const data = await fetch("https://covid-193.p.rapidapi.com/statistics", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "8f69039690mshb800b9adea48eb9p197941jsn5718e6fdd55a",
    },
  });

  const res = await data.json();

  return { props: { data: res } };
}

function compare(a, b) {
  if (a.country < b.country) return -1;
  if (a.country > b.country) return 1;
  return 0;
}

export default function App({ data }) {
  const res = data.response.sort(compare);
  console.log(res);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
            <th>Active</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {res.map((total) => {
            return total.country !== "All" ? null : (
              <tr key="Total">
                <td>Total</td>
                <td id="cases">
                  {total.cases.total
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  <span>{total.cases.new}</span>
                </td>
                <td id="deaths">
                  {(total.deaths.total &&
                    total.deaths.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")) ||
                    "0"}{" "}
                  <span>{total.deaths.new}</span>
                </td>
                <td>
                  {total.cases.recovered
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {total.cases.active
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              </tr>
            );
          })}
          {res.map((country) => {
            return country.country === "All" ||
              country.time.substring(0, 4) == "2020" ? null : (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td id="cases">
                  {country.cases.total
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  <span>{country.cases.new}</span>
                </td>
                <td id="deaths">
                  {(country.deaths.total &&
                    country.deaths.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")) ||
                    "0"}{" "}
                  <span>{country.deaths.new}</span>
                </td>
                <td>
                  {(country.cases.recovered &&
                    country.cases.recovered
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")) ||
                    "N/A"}
                </td>
                <td>
                  {(country.cases.active &&
                    country.cases.active
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")) ||
                    "0"}
                </td>
                <td id="time">
                  {country.time.substring(0, 16).replace("T", " ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
