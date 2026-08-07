# 🍺 StockBeer

Sistema de gerenciamento de estoque de bebidas desenvolvido como projeto acadêmico utilizando metodologia ágil (Scrum), Jira para gerenciamento das atividades e GitHub para versionamento de código.

---

## 📋 Sobre o Projeto

O StockBeer tem como objetivo auxiliar depósitos, distribuidoras e pequenos estabelecimentos no controle de estoque de bebidas, permitindo o acompanhamento das entradas, saídas e disponibilidade dos produtos de forma organizada e eficiente.

---

## 🎯 Objetivo

Desenvolver um sistema que permita:

* Cadastro de bebidas;
* Controle de estoque;
* Registro de entrada de produtos;
* Registro de saída de produtos;
* Atualização automática das quantidades;
* Alertas de estoque baixo;
* Dashboard com informações do estoque.

---

## 🚨 Problema que o Sistema Resolve

Muitos estabelecimentos realizam o controle de estoque de forma manual ou através de planilhas, o que pode gerar erros, perdas de produtos e dificuldade no acompanhamento das movimentações.

O StockBeer busca automatizar esse processo, oferecendo mais controle e organização.

---

## 👥 Equipe

| Integrante       |
| ---------------- |
| Monique da Silva |
| Júlio Soares     |
| Pedro Gabriel    |

> Os papéis(Gerente, Back-end e Front-end) podem ser alternados entre os integrantes ao longo das sprints, conforme a metodologia adotada pela disciplina.

---

## 📌 Funcionalidades

### Usuário

* Login no sistema;
* Visualização do estoque;
* Pesquisa de bebidas.

### Estoque

* Cadastro de bebidas;
* Edição de bebidas;
* Exclusão de bebidas;
* Registro de entrada;
* Registro de saída;
* Atualização automática do estoque.

### Gerenciamento

* Dashboard;
* Alertas de estoque baixo;
* Entrada e saída de mercadorias

---

## 📖 Metodologia

O projeto será desenvolvido utilizando Scrum.

### Sprints

| Sprint   | Objetivo                                                   |
| -------- | ---------------------------------------------------------- |
| Sprint 1 | Planejamento e estrutura do projeto                        |
| Sprint 2 | Início do desenvolvimento                                  |
| Sprint 3 | Desenvolvimento das funcionalidades de bebidas             |
| Sprint 4 | Desenvolvimento e integração das funcionalidades           |
| Sprint 5 | Funcionalidades complementares, acessibilidade e integração|
| Sprint 6 | Testes finais e apresentação                               |

---

## 📈 Gerenciamento do Projeto

As atividades são organizadas no Jira utilizando:

### Épicos

* Gestão do Projeto
* Front-end
* Back-end

### Fluxo Kanban

* Backlog
* A Fazer
* Em Desenvolvimento
* Concluído

---

# Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

* Git
* Docker
* Docker Compose
* Python 3.12 ou superior
* Node.js 18 ou superior
* npm

---

# Clonando o projeto

```bash
git clone https://github.com/devjulio02/StockBeer/tree/develop
cd StockBeer
```

---

# Executando o banco de dados

Na raiz do projeto execute:

```bash
docker compose up -d
```

Verifique se o container foi iniciado:

```bash
docker ps
```

O container deverá aparecer como:

```
stockbeer-db
```

---

# Configurando o Backend

Entre na pasta do backend:

```bash
cd backend
```

Crie um ambiente virtual:

```bash
python3 -m venv venv
```

Ative o ambiente virtual.

### Linux/macOS

```bash
source venv/bin/activate
```

### Windows

```powershell
venv\Scripts\activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute a aplicação:

```bash
python3 app.py
```

O backend ficará disponível em:

```
http://localhost:5000
```

---

# Configurando o Frontend

Abra outro terminal.

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O frontend ficará disponível em:

```
http://localhost:5173
```

# Encerrando

Após executar todos os passos:

* Banco: **PostgreSQL** em execução via Docker;
* Backend: disponível em `http://localhost:5000`;
* Frontend: disponível em `http://localhost:5173`.

O sistema estará pronto para uso.

