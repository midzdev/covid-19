import _ from 'lodash';
import { useState } from 'react';

export async function getServerSideProps() {
  const data = await fetch('https://covid-193.p.rapidapi.com/statistics', {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': process.env.KEY,
    },
  });

  const res = await data.json();
  return { props: { data: res } };
}

export default function App({ data }) {
  function final(x) {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } catch {
      return;
    }
  }

  data = _.sortBy(data.response, ['country']);

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg w-[97.5%] lg:w-[1000px] mx-auto my-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-indigo-500 font-[Inter] font-semibold text-white">
            <tr>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Cases</th>
              <th className="px-4 py-2">Deaths</th>
              <th className="px-4 py-2">Recovered</th>
              <th className="px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ country, deaths, continent, time, cases }) => {
              return country === continent ||
                deaths.total <= 10 ||
                cases.recovered <= 10 ||
                time.substring(0, 4) == '2021' ? null : (
                <tr
                  key={country}
                  className="border-b bg-neutral-800 text-neutral-300 border-neutral-700 text-sm">
                  <td className="px-4 py-2 text-white whitespace-nowrap font-[Inter] font-semibold">
                    {country}
                  </td>
                  <td className="px-4 py-2 font-['Fira_Code']">
                    {final(cases.total)}
                    <span className="text-emerald-400">
                      {' '}
                      {final(cases.new)}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-['Fira_Code']">
                    {deaths.total && final(deaths.total)}
                    <span className="text-rose-400"> {final(deaths.new)}</span>
                  </td>
                  <td className="px-4 py-2 font-['Fira_Code']">
                    {cases.recovered && final(cases.recovered)}
                  </td>
                  <td className="px-4 py-2 font-['Fira_Code']">
                    {cases.active && final(cases.active)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
