import './App.css';
import { fetchCountries } from "../../../Modules/API/Countries"
import { useEffect, useState } from 'react';
import _ from "lodash"
import Table from "react-bootstrap/Table"
import Dropdown from "react-bootstrap/Dropdown";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadCountries = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchCountries();

      let languagesSet = new Set();
      data.forEach(({ languages: countryLanguages }) => {
        countryLanguages.forEach(({ name }) => {
          languagesSet.add(name);
        });
      });
      setLanguages([...languagesSet])
      setCountries(data);
      setFilteredCountries(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Could not fetch the data please refresh the page")
    }
  }
  const filterCountries = (language) => {

    const newFilteredCountries = countries.filter(({ languages: countryLanguages }) => {
      const searchIndex = countryLanguages.findIndex((countryLanguage) => countryLanguage.name === language);
      return searchIndex >= 0;
    });
    setFilteredCountries(newFilteredCountries);
  }
  const countryRow = ({ name, population, languages, currencies, flag }) => (
    <tr>
      <td>{name}</td>
      <td>{population}</td>
      <td>
        {languages.map((language, i) => language.name + ((i !== (languages.length - 1)) ? ", " : ""))}
      </td>
      <td>
        {currencies.map((currency, i) => currency.name + ((i !== currencies.length) ? ", " : ""))}
      </td>
      <td>
        <img src={flag} alt="Girl in a jacket" width="200" height="150" />

      </td>
    </tr>
  )

  const languageddl = () => (
    <Dropdown style={{
      alignSelf: "flex-start"
    }} >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        languages
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: "300px", overflow: "scroll" }}>
        {languages.map(language => (
          <Dropdown.Item onClick={() => filterCountries(language)} >{language}</Dropdown.Item>
        ))}

      </Dropdown.Menu>
    </Dropdown>
  )
  const countriesTable = () => (
    <Table responsive striped bordered >
      <thead>
        <tr>
          <th>Name</th>
          <th>population density</th>
          <th>languages</th>
          <th>Currencies</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredCountries.map(countryRow)
        }
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>

      </tbody>
    </Table>
  )
  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <div className="App">
      {languageddl()}
      <div>
        {
          isLoading ?
            <text>Loading...</text>
            : errorMessage ?
              <text>{errorMessage}</text>
              : countriesTable()
        }
      </div>
    </div>
  );
}

export default App;
