# MyPhotoMatch

![Screenshot van de applicatie](https://github.com/tomnovistudentgithub/MyPhotoMatch/blob/main/src/assets/MyPhotoMatchHomepage.png)

Dit project is een foto-applicatie waar gebruikers foto's kunnen pinnen en hun favoriete tags kunnen bijhouden. Het is gebouwd met React en maakt gebruik van een externe API om foto's op te halen.

## Vereisten


Om deze applicatie lokaal te kunnen draaien, heb je het volgende nodig:

- Node.js en npm geïnstalleerd op je machine.
- Een API-sleutel van de externe foto-API Unsplash. Deze kun je gratis aanvragen op de website van [Unsplash Developers](https://unsplash.com/developers).
- Daarnaast is er gebruik gemaakt van een backend server die de data van de gebruikers en foto's kan opslaan. Er is gebruik gemaakt van de [Novi Datavortex](https://novi.datavortex.nl/).

## Aanmaken van het .env bestand

1. Open een terminal in de root directory van het project.
2. Indien je in src map bent ga dan een map terug naar de root directory van het project met het commando: `cd ..` 
3. Voer het volgende commando uit om een nieuw `.env` bestand aan te maken: `touch .env`
4. Open het `.env` bestand in de editor.
5. Voeg de volgende regels toe aan het bestand:

`VITE_UNSPLASH_ACCESS_KEY=<jouw_unsplash_api_key>` <br>
`VITE_PHOTOMATCH_ACCESS_KEY=<jouw_novi_datavortex_key>`

## Installatie

Volg deze stappen om dit project lokaal uit te voeren:

Ofwel open het project middels de bijgeleverd zip file of volg de volgende stappen:
1. Kloon de repository: `git clone git@github.com:tomnovistudentgithub/photo.git`
2. Navigeer naar de projectmap
3. Installeer afhankelijkheden: `npm install`
4. Start de server: `npm run dev`

De applicatie start doorgaans op `http://localhost:5173/`.

## Inloggen en Registreren

Er zijn al enkele accounts beschikbaar voor gebruik. Deze zijn uitsluitend beschikbaar via het aangeleverde .zip bestand en niet via de Git repository.
Onderstaand een verwijzing naar de bestanden waar de inloggegevens zijn opgeslagen:

Reguliere gebruikers
zie `readme_details.md`

Admin user
zie `readme_details.md`

Api sleutels
Zie `.env` of `readme_details.md`

Om zelf een nieuw account te registreren, klik op de "Registreren" knop op de inlogpagina en volg de instructies.

## Beschikbare npm commando's

Naast `npm run dev` om de server te starten, zijn er nog enkele andere npm-commando's beschikbaar:
debug: `npm run debug`: ik heb het zelf niet gebruikt maar het zit in mijn package.json scripts

## repository 
https://github.com/tomnovistudentgithub/MyPhotoMatch