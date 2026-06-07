# Sistemi i Tiketave per IT Support

Ky eshte nje projekt full-stack i ndertuar me MERN stack (MongoDB, Express, React, Node.js) dhe Redux Toolkit (RTK Query) per menaxhimin e tiketave te suportit teknik ne menyre sa me te thjeshte.

## Si ta nisesh projektin ne kompjuter

Projektin e kemi ndare ne dy pjese kryesore: `backend` dhe `frontend`. Ndiqni keta hapa per ta ndezur:

### 1. Konfigurimi i Backend-it (API)
- Hap terminalin te folderi `backend`.
- Shkruaj komanden per te shkarkuar librarite:
  ```bash
  npm install
Krijoni nje skedar te ri me emrin .env.

Vendosni stringun tuaj te MongoDB Atlas te MONGO_URI dhe nje fjalekalim cfare do te JWT_SECRET.

Nisni serverin ne pune me komanden:

Bash
npm start
(Serveri do te nise ne porten 5000 automatikisht)

2. Konfigurimi i Frontend-it (React)
Hap nje terminal tjeter te ri te folderi frontend.

Shkarko librarite e nevojshme:

Bash
npm install
Nis aplikacionin ne mjedisin lokal:

Bash
npm run dev
(Klikoni mbi linkun e Vite ne terminal per ta hapur ne browser)

Cfare teknologjish jane perdorur?
Backend: Node.js dhe Express per ndertimin e API-t, MongoDB me Mongoose per menaxhimin e databazes, dhe JWT per autentikimin e sigurt.

Frontend: React (Vite) per nderfaqen, Redux Toolkit dhe RTK Query per menaxhimin e gjendjes globale dhe thirrjet e shpejta te API pa komplikime, si dhe React Router Dom per levizjen midis faqeve pa bere refresh.

Rolet ne Aplikacion
Client: Mund te hapi llogari te re, te shikoje tiketat e veta dhe te krijoje tiketa te reja per problemet qe ka (Hardware, Software, Network etj).

IT Support / Admin: Kane akses te shohin te gjitha tiketat e sistemit dhe mund te ndryshojne statusin e tyre (Open, In Progress, Resolved, Closed).