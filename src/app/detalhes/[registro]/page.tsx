import { Registro } from '@/app/interfaces/registro';

export default function Detalhes({
    params: { registro },
  }: {
    params: { registro: Registro };
  }){
    return (
        <div className='container'>
          <h1>{registro.title}</h1>
          <img src={registro.url} alt={registro.title} />
        </div>
    )
}