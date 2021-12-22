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

export default function App({ data }) {
  const res = data.response.sort((a, b) => {
    if (a.country < b.country) return -1;
    if (a.country > b.country) return 1;
    return 0;
  });

  function final(x) {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch {
      return;
    }
  }

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
          </tr>
        </thead>
        <tbody>
          {res.map((country) => {
            return country.country === "All" ||
              country.time.substring(0, 4) == "2020" ? null : (
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
