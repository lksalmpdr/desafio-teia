Esse projeto usa [Next.js](https://nextjs.org/) através do comando [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Como rodar?

No seu terminal ou console, acesse o diretório do projeto e digite a seguinte instrução:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

No seu navegador web, abra o endereço indicado no terminal ( por padrão é [http://localhost:3000] - http://localhost:3000, mas a porta pode variar com a que estiver disponível em seu sistema).

O arquivo inicial a ser editado é `app/page.tsx`. Toda alteração pode ser verificada automaticamente no navegador.


## Sobre a implementação

Este código implementa uma aplicação React que exibe registros em uma interface de usuário. Os registros são carregados inicialmente de um repositório e exibidos em uma lista paginada. Os usuários podem pesquisar registros por título e navegar entre as páginas de resultados.

### Dependências

Este código utiliza o framework React para construção da interface de usuário.
Utiliza hooks do React, como useState e useEffect, para gerenciar estado e efeitos colaterais.
Requer uma estrutura de diretórios específica, incluindo arquivos de interfaces (interfaces/registro.ts) e repositório (repository/registroRepository.ts).

## Componente Principal: Home

O componente principal é chamado Home, que representa a página principal da aplicação.

Estado
`registros`: Armazena todos os registros recuperados do repositório.
`registrosFiltrados`: Armazena os registros filtrados com base no termo de pesquisa.
`isLoading`: Indica se a página está carregando.
`error`: Armazena mensagens de erro durante o carregamento dos registros.
`termoPesquisa`: Armazena o termo de pesquisa inserido pelo usuário.
`paginaAtual`: Armazena o número da página atual exibida.
`registrosPorPagina`: Define o número de registros exibidos por página.
Funções Principais
`paginacao`: Atualiza o estado da página atual para exibição dos registros correspondentes.
`handleChange`: Manipula a alteração do termo de pesquisa e filtra os registros correspondentes.
`filtraRegistros`: Filtra os registros com base no termo de pesquisa inserido pelo usuário.
`debounce`: Função utilitária para limitar a frequência de chamadas à função de filtro durante a digitação.

## Efeitos Colaterais
Utiliza o hook `useEffect` para carregar os registros iniciais do repositório ao montar o componente.
## Renderização Condicional
Exibe um indicador de carregamento enquanto os registros estão sendo carregados.
Exibe mensagens de erro caso ocorra algum problema durante o carregamento.
Exibe os registros filtrados e paginados.

## Componentes de Interface

O componente Home renderiza um cabeçalho com um campo de pesquisa e uma lista de registros.
Cada registro é exibido como um card com título e imagem.
Exibe a paginação para navegar entre as páginas de resultados.

## Estrutura de Arquivos

`interfaces/registro.ts`: Define a estrutura de dados do registro.
`repository/registroRepository.ts`: Fornece métodos para recuperar registros do repositório.

## Observações

O código faz uso de técnicas de otimização, como debounce, para melhorar a experiência do usuário durante a pesquisa.
A paginação é implementada de forma dinâmica com base no número total de registros e no número de registros exibidos por página.
O código segue as melhores práticas de desenvolvimento React, incluindo a separação de responsabilidades e o uso de hooks para gerenciar estado e efeitos colaterais.
Esta documentação fornece uma visão geral do código e suas funcionalidades principais. Para detalhes adicionais sobre implementações específicas, consulte o código-fonte diretamente.
