# CashWise

> Controle suas finanças de forma inteligente, simples e segura.

---

## Sobre o projeto

CashWise é uma aplicação web para gerenciamento financeiro pessoal, desenvolvida com Next.js, React, Clerk, TailwindCSS e i18next. Permite controlar orçamentos, categorias, metas, transações, relatórios e muito mais, com interface moderna e responsiva.

### Funcionalidades principais

- **Dashboard**: Visão geral do saldo, receitas, despesas, gráficos de evolução mensal e por categoria, lista de transações recentes.
- **Orçamentos**: Crie, edite e exclua orçamentos por categoria e período.
- **Categorias**: Gerencie categorias de receitas e despesas, personalize conforme sua necessidade.
- **Metas**: Defina e acompanhe metas financeiras.
- **Transações**: Adicione, edite, filtre e exclua transações. Suporte a múltiplas contas.
- **Relatórios**: Visualize relatórios detalhados por período, categoria, evolução de saldo e exporte dados.
- **Configurações**: Personalize tema (claro/escuro/sistema), moeda, idioma (pt-BR, en, es), notificações e preferências.
- **Perfil**: Gerencie informações pessoais, segurança e exclusão de conta.
- **Autenticação**: Login, registro, verificação de conta e recuperação de senha via Clerk.
- **Internacionalização**: Suporte a múltiplos idiomas.
- **Planos**: Gratuito, Pro e Business, com diferentes recursos e limitações.

---

## Instalação e uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/cash-wise.git
   cd cash-wise
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```
3. **Configure variáveis de ambiente:**
   - Renomeie `.env.example` para `.env.local` e preencha os dados necessários (Clerk, banco, etc).
4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
5. **Acesse:** [http://localhost:3000](http://localhost:3000)

---

## Estrutura de páginas

- `/` - Home
- `/login` - Login
- `/register` - Registro
- `/verify-account` - Verificação de conta
- `/dashboard` - Dashboard principal
- `/dashboard/budgets` - Orçamentos
- `/dashboard/categories` - Categorias
- `/dashboard/goals` - Metas
- `/dashboard/transactions` - Transações
- `/dashboard/reports` - Relatórios
- `/dashboard/settings` - Configurações
- `/dashboard/profile` - Perfil
- `/pricing` - Planos e preços

---

## Tecnologias utilizadas

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Clerk](https://clerk.com)
- [TailwindCSS](https://tailwindcss.com)
- [i18next](https://www.i18next.com)
- [Recharts](https://recharts.org)
- [Zod](https://zod.dev)
- [Lucide React](https://lucide.dev)
- [Sonner](https://sonner.dev)
- [Shinodalabs UI](https://shinodalabs.com)

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto e defina as variáveis abaixo conforme necessário:

```env
# Clerk (autenticação)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# API Base URL
NEXT_PUBLIC_BASE_URL_API=https://sua-api.com

# Outras variáveis
# Adicione aqui outras variáveis necessárias para integrações, banco de dados, etc.
```

> Consulte a documentação dos serviços utilizados para obter os valores corretos.

---

## Licença

Este projeto é open-source sob a licença MIT.
