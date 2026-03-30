# URLastic — Frontend

React application for the URLastic URL shortener. Provides URL shortening, custom alias creation, QR code generation, and a user dashboard to manage links.

## Tech Stack

- **Core**: React 18, React Router DOM 6
- **Styling**: Tailwind CSS 3, Material Tailwind
- **HTTP**: Axios
- **Icons**: Heroicons
- **QR Codes**: react-qr-code
- **Build**: Create React App

## Getting Started

### Prerequisites

- Node.js 18+
- URLastic backend running on `http://localhost:3001`

### Install & Run

```bash
cd URLastic-frontend
npm install
npm start
```

The app runs on `http://localhost:3000`.

### Run with Docker

From the project root:

```bash
docker compose up --build
```

### Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001
```

## Project Structure

```
URLastic-frontend/
├── src/
│   ├── apiCalls/          # Axios API client functions
│   │   ├── urlApi.js
│   │   ├── loginApi.js
│   │   └── registerApi.js
│   ├── components/        # React components
│   │   ├── Home.jsx       # Landing page with URL shortener form
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── ShortenURL.jsx # URL shortening with QR code result
│   │   ├── CustomUrl.jsx  # Custom alias form
│   │   ├── Navbar/
│   │   └── User/
│   │       ├── Dashboard.jsx  # User's URL management table
│   │       └── Account.jsx
│   ├── context/           # React Context providers
│   │   ├── UserContext.jsx    # Auth state & JWT token
│   │   └── MessageContext.jsx # Toast notifications
│   ├── App.js             # Routes
│   └── index.js
├── public/
├── tailwind.config.js
└── Dockerfile
```

## Pages & Routes

| Route | Component | Auth |
|---|---|---|
| `/` | Home | No |
| `/login` | LoginForm | No |
| `/register` | RegisterForm | No |
| `/dashboard` | Dashboard | Required |
| `/account` | Account | Required |

## Color Palette

| Name | Hex |
|---|---|
| Beige (background) | `#FFFAF5` |
| Dark | `#1C1C1C` |
| Pink (accent) | `#F26076` |
| Green | `#458B73` |
| Yellow | `#FFD150` |
| Orange | `#FF9760` |

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
