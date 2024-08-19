import React, { useState, useEffect } from 'react';

// Componente Questao01B usando função clássica
function Questao01B({ alunos, setMedias }) {
  useEffect(() => {
    // Calcular a média de cada aluno
    const medias = alunos.map(aluno => {
      const { ap1, ap2 } = aluno.notas;
      return (ap1 + ap2) / 2;
    });

    // Passar as médias para o componente pai através do setMedias
    setMedias(medias);
  }, [alunos, setMedias]);

  return null; // Este componente não renderiza nada
}

// Componente Questao01A usando função arrow
const Questao01A = () => {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  const alunos = [
    { nome: "Sicrano", notas: { ap1: 8.4, ap2: 5.4 } },
    { nome: "Beltrano", notas: { ap1: 6.7, ap2: 3.5 } },
    { nome: "Fulano", notas: { ap1: 7.3, ap2: 9.2 } }
  ];

  useEffect(() => {
    if (medias.length > 0) {
      setLoading(false);
    }
  }, [medias]);

  const renderAlunosAcimaMedia = () => {
    return alunos
      .map((aluno, index) => ({
        nome: aluno.nome,
        media: medias[index]
      }))
      .filter(aluno => aluno.media >= 5.0)
      .map((aluno, index) => (
        <li key={index}>{aluno.nome}</li>
      ));
  };

  return (
    <div>
      <Questao01B alunos={alunos} setMedias={setMedias} />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {renderAlunosAcimaMedia()}
        </ul>
      )}
    </div>
  );
};

export default Questao01A;
