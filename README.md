# 📖 Diário de Leituras - Aplicação Full-Stack

Bem-vindo ao Diário de Leituras! Esta é uma aplicação web completa construída para gerenciar sua biblioteca pessoal, acompanhar o progresso de leitura e registrar insights e reflexões sobre os livros que você leu, está lendo ou deseja ler.

Este projeto foi desenvolvido como um exercício prático para solidificar conceitos de desenvolvimento backend com **Quarkus (Java)** e frontend com **React (TypeScript)**.

**(Adicione um screenshot da sua aplicação aqui!)**
![Screenshot da Aplicação](https://via.placeholder.com/800x450.png?text=Insira+um+Screenshot+do+Seu+App+Aqui)

---

## ✨ Features

* **Gerenciamento Completo de Livros (CRUD):** Adicione, visualize, edite e delete livros da sua biblioteca.
* **Status de Leitura:** Acompanhe facilmente os livros em sua `Lista de Desejos`, os que está `Lendo` e os que já foram `Lidos`.
* **Filtros Dinâmicos:** Filtre sua biblioteca por status para encontrar rapidamente o que procura.
* **Capas de Livro:** Adicione a URL da capa do livro para uma experiência mais visual.
* **Diário de Insights:** Adicione múltiplas reflexões e anotações para cada livro lido.
* **Interface Moderna:** Construída com Material-UI, com layout responsivo e animações suaves para uma experiência de usuário agradável.
* **Backend Robusto:** API REST construída com Quarkus, garantindo alta performance e um desenvolvimento ágil.

---

## 🛠️ Tech Stack

A aplicação é dividida em duas partes principais:

### **Backend (Java)**

* **Framework:** [Quarkus](https://quarkus.io/)
* **Linguagem:** Java 17+
* **API:** REST com JAX-RS (RESTEasy Reactive)
* **Banco de Dados:** Hibernate ORM com Panache
* **Banco de Dados (Desenvolvimento):** H2 (Em memória)
* **Build Tool:** Maven

### **Frontend (TypeScript)**

* **Framework:** [React](https://react.dev/)
* **Linguagem:** TypeScript
* **Build Tool:** Vite
* **UI Library:** [Material-UI (MUI)](https://mui.com/)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)
* **Rotas:** React Router DOM
* **Cliente HTTP:** Axios

---

## 💡 Conceitos-Chave do React Aplicados no Projeto

Este projeto foi uma oportunidade para aplicar na prática os conceitos fundamentais do React.

### **Componentes**
* **O que é?** São os blocos de construção de uma aplicação React. Pense neles como peças de LEGO. Cada pedaço da interface (`ListaLivros`, `FormularioLivro`) é um componente que pode ser combinado para criar telas complexas.
* **Como usamos?** Criamos o `ListaLivros.tsx` para mostrar a biblioteca e o `FormularioLivro.tsx` para criar/editar, reutilizando-o em duas páginas diferentes, o que demonstra um design de componentes eficiente.

### **JSX (JavaScript XML)**
* **O que é?** Uma extensão de sintaxe para o JavaScript que nos permite escrever código parecido com HTML diretamente dentro dos arquivos de componente.
* **Como usamos?** Todo o `return(...)` dos nossos componentes, com as tags `<Container>`, `<Card>`, `<Button>`, etc., é JSX.

### **Props (Propriedades)**
* **O que é?** É a forma como os componentes "conversam" de cima para baixo (de pai para filho). São como os argumentos de uma função.
* **Como usamos?** Nosso `FormularioLivro` recebe as `props` `livroInicial` e `onSave` da página que o utiliza (`AdicionarLivroPage` ou `EditarLivroPage`), tornando-o reutilizável.

### **State (Estado) e o Hook `useState`**
* **O que é?** A memória interna de um componente. Usado para guardar informações que podem mudar e que, ao mudarem, devem atualizar a interface.
* **Como usamos?** Foi fundamental no hook `useLivros` para guardar a lista de livros, o estado de `loading` e o `filtroStatus`. A chamada `setFiltroStatus` atualiza o estado e causa a re-renderização do componente com a lista filtrada.

### **Hooks (Ganchos)**
* **O que é?** Funções especiais (`useState`, `useEffect`, `useMemo`) que nos permitem "enganchar" nos recursos e no ciclo de vida do React a partir de componentes de função.
* **Como usamos?** Além dos hooks nativos, criamos nosso próprio **Custom Hook** (`useLivros`) para encapsular e reutilizar a lógica de busca e filtragem de dados, uma prática avançada que limpa nossos componentes de UI.

### **`useEffect`**
* **O que é?** Hook para executar "efeitos colaterais" (side effects), como buscar dados de uma API.
* **Como usamos?** No hook `useLivros`, usamos `useEffect` com um array de dependências vazio (`[]`) para garantir que a nossa chamada à API `getAllLivros` seja executada apenas uma vez, quando o componente é montado pela primeira vez.

### **Renderização Condicional**
* **O que é?** A prática de exibir diferentes partes da interface com base em certas condições (ex: `if/else` ou ternários).
* **Como usamos?** Em `ListaLivros`, usamos para mostrar o `CircularProgress` enquanto `loading` é `true`, o `Alert` se `error` existir, e a lista de livros ou a mensagem "Nenhum livro encontrado" dependendo do tamanho do array.

### **Listas e Chaves (`key`)**
* **O que é?** Ao renderizar uma lista com `.map()`, o React exige uma propriedade `key` única para cada elemento. Isso ajuda o React a otimizar a renderização, identificando exatamente quais itens mudaram.
* **Como usamos?** No nosso `.map(livro => ...)` em `ListaLivros`, usamos `<... key={livro.id} ...>`. O `id` do livro é o candidato perfeito para a `key`.

---

## 🚀 Como Executar o Projeto

Para executar este projeto localmente, você precisará ter o **JDK 17+**, **Maven** e **Node.js (com npm)** instalados.

### **1. Backend (Quarkus API)**

```bash
# Navegue até a pasta da API
cd diario-de-leituras-api

# Execute o Quarkus em modo de desenvolvimento
./mvnw quarkus:dev
```
O backend estará rodando em `http://localhost:8080`.

### **2. Frontend (React App)**

```bash
# Em um novo terminal, navegue até a pasta da UI
cd diario-de-leituras-ui

# Instale as dependências (execute apenas na primeira vez)
npm install

# Execute o servidor de desenvolvimento do Vite
npm run dev
```
O frontend estará acessível em `http://localhost:5173` (ou a porta indicada no terminal).

---

## Autor

**[Seu Nome Aqui]**

* [LinkedIn](https://www.linkedin.com/in/mathsena/)
* [GitHub](https://github.com/mathsena)