# Catálogo de Livros

**React: Hooks (Catálogo de Livros)**. Implementa lista de livros, busca, cadastro, remoção, contadores e tema Claro/Escuro.

---

## Como rodar (dev)

Instale dependências e rode em modo dev:

npm install
npm run dev

---

# Funcionalidades

* Carregamento inicial dos livros de public/books.json (useEffect).

* Campo de busca controlado com foco automático (useRef).

* Formulário "Novo livro" (Título, Autor, Ano) com validação básica.

* Remoção individual de livros.

* Contadores em tempo real: Total e Filtrados.

* Tema Claro / Escuro via Context API.

* Persistência da busca e do tema via hook custom useLocalStorage.

* Mensagens de estado: Carregando..., Erro: ..., Nenhum livro encontrado.

---

# Hook(s) `useLocalStorage`

Persistir a busca (App.jsx):

* var [searchQuery, setSearchQuery] = useLocalStorage("books_app_search", "");

Mantém o texto do campo de busca entre recarregamentos da página, melhorando a experiência do usuário.


Persistir o tema (contexts/ThemeContext.jsx)

* var pair = useLocalStorage("books_app_theme", "light", { store: "local" });
* var theme = pair[0];
* var setTheme = pair[1];

Deixando assim a lógica de leitura/escrita no storage em um lugar só, os componentes não precisam repetir código.


---

# Grupo 

Gabriel Andrade de Aguiar - 01705441
Guilherme Rodrigues Lopes da Silva - 01711888
Ian Machado de Oliveira - 01698179
Iago de Oliveira Almeida - 01673357
José Roberto Reis Lins de Andrade - 01676432