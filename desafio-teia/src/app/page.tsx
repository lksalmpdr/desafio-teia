'use client';


import { useEffect, useState } from 'react';
import { Registro } from './interfaces/registro';
import registrosRepository from './repository/registroRepository';

export default function Home() {

  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState<Registro[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  /*pesquisa*/
  const [termoPesquisa, setTermoPesquisa] = useState<string>('');
  /*paginação */
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [registrosPorPagina] = useState<number>(60);

  let indexUltimoRegistro = paginaAtual * registrosPorPagina;
  let indexPrimeiroRegistro = indexUltimoRegistro - registrosPorPagina;
  let registrosApresentar = registrosFiltrados.slice(indexPrimeiroRegistro, indexUltimoRegistro);

  const paginacao = (pagina: number) => setPaginaAtual(pagina);



  /*carregamento inicial da página*/
  useEffect(()=>{
    try{
      registrosRepository.fetchRegistros()
        .then((registrosRecuperados)=>{
        setRegistros(registrosRecuperados);
        setRegistrosFiltrados(registrosRecuperados);
        indexUltimoRegistro = paginaAtual * registrosPorPagina;
        indexPrimeiroRegistro = indexUltimoRegistro - registrosPorPagina;
        registrosApresentar = registrosFiltrados.slice(indexPrimeiroRegistro, indexUltimoRegistro);
      });
    }catch(error){
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    }finally{
      setIsLoading(false);
    }

  }, []);

  const debounce = <F extends (...args: any[]) => any>(func: F, delay: number): 
  ((...args: Parameters<F>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;
  
    return (...args: Parameters<F>): void => {
      const later = () => {
        timeoutId = null;
        func(...args);
      };
  
      clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
      timeoutId = setTimeout(later, delay);
    };
  };

  const filtraRegistros = (termo:string):void=> {
    let registrosFiltrados = registros.filter((registro)=>registro.title.includes(termo));
    setRegistrosFiltrados(registrosFiltrados);
    indexUltimoRegistro = paginaAtual * registrosPorPagina;
    indexPrimeiroRegistro = indexUltimoRegistro - registrosPorPagina;
    registrosApresentar = registrosFiltrados.slice(indexPrimeiroRegistro, indexUltimoRegistro);
  }

  const debouncedFiltraRegistros = debounce(filtraRegistros, 300);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setTermoPesquisa(event.target.value);
    if(termoPesquisa === '')
    {
      setRegistrosFiltrados(registros);
      indexUltimoRegistro = paginaAtual * registrosPorPagina;
      indexPrimeiroRegistro = indexUltimoRegistro - registrosPorPagina;
      registrosApresentar = registrosFiltrados.slice(indexPrimeiroRegistro, indexUltimoRegistro);
    }else
    {
      debouncedFiltraRegistros(termoPesquisa);
    }
  }

  /*tela carregando*/
  if (isLoading) {
    return <div className='loading'>Carregando...</div>;
  }
  /*tela erro ao carregar*/
  if (error) {
    return <div className='error'>Erro: {error}</div>;
  }
  
  return (
    <div className='container'>
      <header>
        <h1>desafio-teia.</h1>
        <input 
          type='text' 
          id='pesquisa' 
          className='text-dark'
          placeholder='Digite aqui a pesquisa'
          value={termoPesquisa} 
          onChange={handleChange}></input>
      </header>

      <div className='registros'>
        { registrosApresentar.length === 0 ? (
          <div><h2>Nenhum registro encontrado</h2></div>
          ) : (
          registrosApresentar.map((registro)=>(
            <div className='registro-card' key={registro.id}>
              <a href={`/detalhes/${registro}`}>
                <h2 className='text-dark'>{registro.title}</h2>
                <img src={registro.thumbnailUrl} alt={registro.title} />
              </a>
            </div>
          )))
        }
      </div>
      <div className="paginacao">
        {
          [...Array(Math.ceil(registrosFiltrados.length / registrosPorPagina)).keys()].map(numPagina => (
            <button 
              className={paginaAtual === numPagina + 1? 'paginacao ativo' : 'paginacao'}
              key={numPagina + 1} 
              onClick={() => paginacao(numPagina + 1)}>
              {numPagina + 1}
            </button>
        ))}
      </div>
    </div>
  );
}
