# Apunts Dades

Repositori d'apunts del Grau en Ciència i Enginyeria de Dades de la UPC.

![404shots_so](https://github.com/user-attachments/assets/e9fbcb66-0c98-46a1-8fe5-9b12271c95db)

Mira el Vídeo:

[![Watch the video](https://img.youtube.com/vi/rlvBrrhoito/maxresdefault.jpg)](https://www.youtube.com/watch?v=rlvBrrhoito)

Les suggerències i contribucions són benvingudes.

## Instal·lació i Execució en Local

1. **Instal·la Node.js i npm**

   Assegura't de tenir instal·lat [Node.js](https://nodejs.org/) i [npm](https://www.npmjs.com/).

2. **Fes un fork i clona el repositori**

   ```sh
   # Fes un fork del repositori a GitHub
   # Clona el teu fork
   git clone https://github.com/username/apunts-dades
   cd apunts-dades
   ```

3. **Instal·la les dependències**

   ```sh
   npm install
   ```

4. **Crea un arxiu `.env`:**

   ```sh
   PUBLIC_POCKETBASE_ENDPOINT=https://api.apuntsdades.com
   PUBLIC_POSTHOG_KEY=
   PUBLIC_POSTHOG_HOST=
   ```

5. **Executa l'aplicació**

   ```sh
   npm run dev
   ```

6. **Contribueix amb canvis**

   ```sh
   # Fes els canvis necessaris i després commit
   git add .
   git commit -m "tipus: descripció dels canvis"

   # Puja els canvis al teu fork
   git push origin main
   ```

   Segueix el format establert per [Conventional Commits](https://www.conventionalcommits.org/).

   Després, ves al teu fork a GitHub i crea una Pull Request cap al repositori original.

El deploy de l'aplicació amb els canvis es farà automàticament un cop s'accepti la teva Pull Request.
