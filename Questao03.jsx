import React, { useState, useEffect } from 'react';

function Questao03() {
  const [capitais, setCapitais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //buscar dados
        const response = await fetch("https://restcountries.com/v3.1/region/europe?fields=capital,population");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // calcular a população media
        const populações = data.map(country => country.population);
        const médiaPopulação = populações.reduce((acc, curr) => acc + curr, 0) / populações.length;

        // filtrar capitais com a população acima da media de população
        const capitaisAcimaDaMédia = data
          .filter(country => country.population > médiaPopulação)
          .map(country => country.capital[0]);

        setCapitais(capitaisAcimaDaMédia);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Capitais com População Acima da Média</h1>
      <ul>
        {capitais.map((capital, index) => (
          <li key={index}>{capital}</li>
        ))}
      </ul>
    </div>
  );
}

export default Questao03;
