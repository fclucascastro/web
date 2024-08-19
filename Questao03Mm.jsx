import React, { useState, useEffect } from 'react';

function Questao03() {
  const [capitais, setCapitais] = useState({ maior: '', menor: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("https://restcountries.com/v3.1/region/europe?fields=capital,population");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Find the country with the highest and lowest population
        const maiorPopulação = Math.max(...data.map(country => country.population));
        const menorPopulação = Math.min(...data.map(country => country.population));

        const capitalMaior = data.find(country => country.population === maiorPopulação)?.capital[0] || 'Não disponível';
        const capitalMenor = data.find(country => country.population === menorPopulação)?.capital[0] || 'Não disponível';

        setCapitais({ maior: capitalMaior, menor: capitalMenor });
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
      <h1>Capitais com a Maior e Menor População</h1>
      <p><strong>Capital com a maior população:</strong> {capitais.maior}</p>
      <p><strong>Capital com a menor população:</strong> {capitais.menor}</p>
    </div>
  );
}

export default Questao03;
