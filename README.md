# Apunts Dades

Repositori d'apunts del Grau en Ciència i Enginyeria de Dades de la UPC.

![404shots_so](https://github.com/user-attachments/assets/e9fbcb66-0c98-46a1-8fe5-9b12271c95db)

Les suggerències i contribucions són benvingudes.

## Instal·lació i Execució en Local

1. **Instal·la Node.js i npm**

   Assegura't de tenir instal·lat [Node.js](https://nodejs.org/) i [npm](https://www.npmjs.com/).

2. **Clona el repositori**
   ```sh
   git clone https://github.com/data-students/apunts-dades
   cd apunts-dades
    ```

3. **Instal·la les dependències**
   ```sh
   npm install
    ```

4. **Crea un arxiu ```.env```:**
   ```sh
    PUBLIC_POCKETBASE_ENDPOINT=https://api.apuntsdades.com
    PUBLIC_POSTHOG_KEY=
    PUBLIC_POSTHOG_HOST=
    ```

5. **Executa l'aplicació**
   ```sh
   npm run dev
    ```

6. **Fes commit dels canvis**

    Segueix el format establert per [Conventional Commits](https://www.conventionalcommits.org/):

   ```sh
   git add .
   git commit -m "Descripció dels canvis"
    ```

El deploy de l'aplicació amb els canvis es farà automaticament.
