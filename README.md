# FinTechX Text2SQL Application

Este projeto é uma aplicação baseada em Node.js usando o framework NestJS para melhorar a eficiência operacional e a tomada de decisão na empresa FinTechX. A aplicação utiliza tecnologia text-to-SQL para extrair insights valiosos dos dados disponíveis, permitindo uma análise mais rápida e precisa.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/ianmateusES/fintechx-text2sql.git
    cd fintechx-text2sql
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Instale o Prisma CLI globalmente (se ainda não estiver instalado):

    ```bash
    npm install -g prisma
    ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto. Você pode usar o arquivo `.env.example` como base:

    ```plaintext
    DB_TYPE=
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=

    DATABASE_URL="${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}"

    OPENAI_API_KEY=
    TEXT2SQL_API_KEY=
    ```

2. Inicialize o Prisma:

    ```bash
    npx prisma generate
    ```

## Uso

Para iniciar a aplicação, execute:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3333`.

### Exemplos de Uso

- Para obter as perguntas e respostas, envie uma requisição para:

    ```http
    POST /questions
    Content-Type: application/json

    {
        "type_ia": "provider_name",
        "question": "What are the top 5 selling products?"
    }
    ```

## Estrutura do Projeto

### libs/text2sql

Biblioteca responsável pela conversão de texto para SQL utilizando diferentes provedores de IA.

- **dto/**: Define os DTOs (Data Transfer Objects) usados na biblioteca.
  - `generateSql-text2sql.dto.ts`: Define a estrutura dos dados para a geração de SQL.
- **providers/**: Contém a implementação dos provedores de IA.
  - **enum/**: Enumera os tipos de provedores disponíveis.
  - **implementations/**: Implementações específicas dos provedores de IA.
    - `openai.provider.ts`: Implementação do provedor OpenAI.
    - `text2sql.provider.ts`: Implementação do provedor Text2SQL.
  - **models/**: Define os modelos para os provedores.
    - `text2sql.provider.ts`: Interface para os provedores de text2sql.
  - `text2sql.provider.factory.ts`: Fábrica para criar instâncias dos provedores de text2sql.
- `text2sql.service.ts`: Serviço principal para interação com os provedores de text2sql.
- `text2sql.module.ts`: Módulo do NestJS para a biblioteca text2sql.

### src/questions

Módulo responsável por lidar com as perguntas e interagir com a biblioteca text2sql.

- `questions.controller.ts`: Controlador para lidar com as requisições HTTP relacionadas a perguntas.
- `questions.module.ts`: Módulo do NestJS para o serviço de perguntas.
- `questions.service.ts`: Serviço que utiliza a biblioteca text2sql para converter perguntas em SQL e consultar o banco de dados.

### Outras pastas e arquivos

- **prisma/**: Contém o serviço Prisma para interação com o banco de dados e o arquivo de esquema do Prisma.
  - `prisma.service.ts`: Serviço Prisma.
  - `schema.prisma`: Esquema do banco de dados Prisma.
- `app.module.ts`: Módulo raiz da aplicação.
- `api.http`: Arquivo para fazer requisições usando a extensão Rest Client no VSCode. Pode ser usado para testar endpoints diretamente do editor.
- **Docker e Dev-Container**
  - **Dockerfile** e **docker-compose.yml**: Configura o ambiente Docker para execução do projeto.
  - **Dev Containers**: Use a extensão Dev Containers no VSCode para abrir o projeto em um ambiente de desenvolvimento pré-configurado.

## Documentação

A documentação da API é gerada usando Swagger e pode ser acessada em:

```plaintext
http://localhost:3333/docs
```

O arquivo `src/swagger.setup.ts` é responsável por configurar a documentação Swagger.

## Testes

Para executar os testes, use o comando:

```bash
npm run test
```

Os testes incluem:

- Testes unitários para serviços e módulos.
- Testes de integração para assegurar a correta comunicação com o banco de dados e APIs.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
