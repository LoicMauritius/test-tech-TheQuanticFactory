# Urban Fresh Next

## 1. Description du projet

**Urban Fresh Next** est une application web développée avec Next.js qui permet de visualiser les données urbaines de la ville de Paris, en se concentrant sur les **îlots de fraîcheur** et les **points d'eau**. L'objectif est d'offrir aux utilisateurs un moyen simple et rapide de trouver des espaces verts, des équipements sportifs ou des fontaines à boire, particulièrement utile lors des journées chaudes.

### Fonctionnalités principales

-   **Visualisation de données multiples** : Affiche les espaces verts, les équipements/activités, et les fontaines à boire.
-   **Filtrage avancé** : Permet de filtrer les données par arrondissement, par mot-clé (nom, type, adresse), par disponibilité (ouvert/fermé) ou par tarification (payant/gratuit).
-   **Vues multiples** : Les données peuvent être consultées sous forme de **tableau paginé**, sur une **carte interactive** (pour les fontaines), ou via un **graphique** synthétisant la répartition des îlots de fraîcheur par arrondissement.
-   **Interface réactive** : L'application est conçue pour être fluide et utilisable sur différentes tailles d'écran.
-   **Données centralisées** : L'application utilise une base de données MongoDB, interrogée via l'ORM Prisma, pour garantir la performance et la cohérence des données.

## 2. Installation et lancement

Pour lancer le projet en local, suivez ces étapes :

1.  **Cloner le repository**
    ```bash
    git clone <URL_DU_REPOSITORY>
    cd test-tech
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Configurer la base de données** ( optionnel )
    -   Assurez-vous d'avoir une instance MongoDB en cours d'exécution.
    -   Créez un fichier `.env` à la racine du projet sur modèle de env_exemple.
    -   Ajoutez votre chaîne de connexion MongoDB dans le fichier `.env` :
        ```
        DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>/?retryWrites=true&w=majority"
        ```
    -   Synchronisez votre base de données avec le schéma Prisma :
        ```bash
        npx prisma db push
        ```

    *Important !!!*: Vous pouvez charger les données depuis l'API publique opendata.paris.fr en allant dans le layout à la ligne 42-43
    -   ligne 42: const data = await getAPIData()                //Appel de l'API pour récupérer les données
    -   ligne 43: const data = await getPrismaData()                //Appel de la base de données pour récupérer les données
  
    Mettez l'un ou l'autre en commentaire en fonction de vos moyens et de vos besoins.
    Sachez que l'API de opendata.paris.fr est limité à 100 données contrairement à l'importation depuis vos propres bases de données

5.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```

L'application sera alors accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 3. Structure du projet

Le projet suit une architecture inspirée de l'Atomic Design pour une meilleure organisation et maintenabilité.

```
/
├── app/                # Pages et layouts principaux de Next.js 13+
│   └── page.tsx        # Point d'entrée de l'interface utilisateur
├── components/         # Composants React réutilisables
│   ├── atoms/          # Composants de base (Button, Input, etc.)
│   ├── molecules/      # Combinaisons d'atomes (FilterGroup, etc.)
│   ├── organisms/      # Sections complexes (Header, DataTable, Map)
│   └── templates/      # Structure des pages
├── context/            # Contexte React pour la gestion d'état global
├── libs/               # Librairies et clients externes (client Prisma)
├── prisma/             # Schéma de la base de données Prisma
├── services/           # Fonctions pour récupérer les données ( API et Base de donnée )
├── styles/             # Fichiers de style CSS (global, modules)
├── types/              # Définitions des types TypeScript
└── utils/              # Fonctions utilitaires (filtrage, etc.)
```

## 4. Comment utiliser l'application

L'interface se compose de deux parties principales : le panneau de filtres à gauche et la zone de contenu à droite.

### Panneau de filtres

1.  **Barre de recherche** : Tapez un mot-clé pour rechercher un lieu par son **nom**, son **type** ou son **adresse**. La recherche s'applique aux **Espaces Verts** et aux **Équipements**.

2.  **Filtre par arrondissement** : Cochez un ou plusieurs arrondissements pour n'afficher que les résultats situés dans ces zones. Ce filtre s'applique aux **Espaces Verts** et aux **Équipements**.

3.  **Filtres contextuels** :
    -   **Disponibilité** : Filtre les **Espaces Verts** en fonction de leur statut (Ouvert / Fermé).
    -   **Prix** : Filtre les **Équipements** pour n'afficher que les activités gratuites ou payantes.

### Zone de contenu

La zone de contenu est organisée en onglets :

-   **Espaces Verts** : Affiche un tableau paginé des parcs, jardins, etc. Vous pouvez cliquer sur "Voir horaires" pour afficher les détails dans une modale.
-   **Équipements** : Affiche un tableau paginé des piscines, terrains de sport, etc.
-   **Fontaines à boire** : Affiche une **carte interactive** avec des marqueurs pour chaque fontaine disponible.
-   **Carte** : Affiche une **carte interractive** avec l'ensemble des fontaines présentes à Paris.
-   **Îlots de Fraîcheur** : Affiche un **graphique à barres** représentant le nombre d'espaces verts par arrondissement, offrant une vue d'ensemble de la répartition de la fraîcheur à Paris.

## 5. Images démo

<img width="1915" height="892" alt="2" src="https://github.com/user-attachments/assets/be0e64f9-157f-4f4c-8ff4-0f6d3359a0cd" />
<img width="1898" height="898" alt="1" src="https://github.com/user-attachments/assets/62a9c737-a61d-4742-82fd-1eb37fd22ae5" />


