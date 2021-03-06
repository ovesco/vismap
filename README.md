# Vismap

Disponible sur: https://vismap.guillaumehochet.now.sh/

## Contexte
Avec des transports de plus en plus nombreux et de moins en moins chers, le tourisme est en pleine expansion. De nombreuses régions basent leur économie sur le tourisme.

Cependant avec l'explosion d'offres, il est compliqué pour un touriste de savoir où aller et quoi chercher. Certains préfèrent se fier aux comparatifs offerts par des sites comme Trivago, mais d'autres préfèrent se balader et se fier à leurs envies.

Le problème étant que pour ces derniers, il peut être difficile de savoir où se promener.

## Objectif
Le but de se promener et de mettre en évidence des zones d'intérêts au niveau d'une ville ou d'une partie d'une ville.

Dans de nombreuses villes touristiques, des quartiers de magasins et de restaurants se forment. L'idée est de profiter de ces regroupements d'établissements pour définir des zones d'intérêts en fonction du nombre d'établissement, de leur prix et de leur note.

## Sources de données
L'application peut récupérer les données grâce à l'API Google Maps qui fournit les établissements près d'un point géographique. Ainsi les données sont intégrées et mises à jour par les utilisateurs eux-mêmes.

Cependant, en phase de développement, nous travaillons en local et il n'est donc pas possible de whitelister l'adresse du site web. Hors l'API refuse les requêtes d'adresses non-whitelistées. Ainsi nous avons téléchargé en local un jeu de données.

## Visualisation
Le site affiche une carte de la région avec les zones d'intérêts. Chaque établissement peut être désigné soit par un marqueur, soit au travers d'une heatmap en fonction du niveau de zoom.

Le marqueur a été choisi pour signaler précisément la position d'un établissement. C'est est une icone encrée dans la culture ce qui facilite la compréhension du touriste et il permet de voir aisément les regroupement de points.

Cependant il a quelques limites, si le niveau de zoom sur une carte est trop faible, le touriste n'arrive plus a interprété la distance réelle entre deux établissements en fonction de la distance sur la carte. Ainsi il ne sait pas si les deux établissements sont rapprochés. Il peut arriver qu'il y aie trop d'établissements pour qu'on puisse voir la différence de nombre entre deux regroupements. C'est le phénomène qu'a mis en évidence Shannon. Si un symbol est trop présent, il perd son information.

Pour palier ce problème d'interprétation, lorsque le niveau de zoom est faible, les marqueurs sont remplacé par une heatmap. Cela permet de visualiser plus facilement l'intérêt d'une région en se basant simplement sur une échelle d'intensité.

Ainsi le passage de l'un-à-l'autre permet au touriste de visualiser facilement le regroupement d'établissements avec la heatmap et de passer à des marqueurs pour visualiser plus précisément la position des établissements.

Nous avons choisis d'utiliser les couleurs pour indiquer si un établissement est ouvert ou non. Comme il y a trois états possibles : ouvert, inconnu ou fermé, nous nous sommes inspirés des feux de signalisations pour rester dans la culture des touristes. La couleur verte indique que l'établissement est ouvert, le rouge, fermé et l'orange, pour ceux dont nous n'avons pas l'information.

![VisMap](img/vismap.png)

### Interactivité
Pour plus de clarté nous avons sélectionné une liste d'interactivités qui sont les plus utilisées. Ces interactivités sont constamment visibles, les autres sont cachées dans un menu caché.

Les widgets constamment visibles :
- Filtre par type d'établissement
- Zoom / dézoon
- Gestion de l'affichage du menu

Menu caché :
- Filtre par ouverture
- Filtre par niveau d'étoile
- Affichage par heatmap
- Affichage par marqueur

![Filtre](img/filter.png)
#### Filtres

##### Type d'établissement
Le touriste peut modifier sa recherche en fonction de sa motivation. S'il souhaite plutôt manger, il peut filtrer par type d'établissement.

Les types des établissements sont définis par des listes de labels. Pour la méthode de sélection de labels nous nous sommes inspirés des méthodes classiques de recherche par tags. Une barre de recherche a été mise en place.

Un double-clic permet d'afficher une liste déroulante tous les labels possibles, le touriste peut taper du texte et la liste des labels sera filtrée en fonction de si le label contient les données ou non. Une fois qu'un label est sélectionné, il reste visible dans une bulle dans la barre de recherche.

Ainsi le touriste peut voir facilement quel type d'établissement il recherche. La liste déroulante lui permet de voir toutes les possibilités et le filtre du texte permet de trouver plus rapidement le type souhaité.

##### Ouverture
Si le touriste recherche un établissement dans l'immédiat, il peut filtrer pour n'afficher que ceux qui sont ouverts. Cela lui permet de ne garder que l'information utile.

##### Niveau d'étoiles
Dans Google, les utilisateurs peuvent évaluer les établissements avec des étoiles allant de 0 à 5. C'est une méthode établie dans de nombreux sites d'évaluation et qui permet d'évaluer globablement la qualité d'un établissement. Nous avons utilisé ces information pour filtrer la qualité minimale qu'accepte le touriste pour éviter les zones mal fréquentées avec de mauvais établissements.

#### Zoom
Le touriste peut adapter la taille de la région qu'il recherche en fonction de son moyen de locomotion grâce à une fonction de zoom / dézoom.

Suivant les habitudes des utilisateurs, il est possible de le faire à l'aide du scroll et de l'écartement de doigt sur le touchpad. Pour un utilisateur peu habitué à l'informatique de classiques boutons "+" et "-" ont été intégrés.

Cela permet au touriste facilement d'adapter la carte pour tout d'abord chercher une région globale avec un niveau de zoom faible et d'ensuite rechercher plus précisément un quartier et situer sa propre position sur la carte.

#### Affichage heatmap
Le touriste peut définir jusqu'à quel niveau de zoom la heatmap à l'aide d'un slider. Cela lui permet d'adapter son affichage en fonction du nombre de regroupement d'établissements visibles.

#### Affichage marqueur
Le touriste peut donc définir à partir de quel niveau de zoom les marqueurs à l'aide d'un slider. Celui permet d'adapter son affichage en fonction de la précision nécessaire.

## Critiques de l'outil
L'outil a le désavantage de se baser sur l'API Google. Suivant la région, elle peut manquer de données et les informations pour chaque établissement est assez aléatoire.

Nous avons choisi de nous baser au maximum sur des éléments de la culture ce qui nous a permis d'avoir un outil intuitif qui nécessite peu d'explications. L'interface en est allégé et va au coeur du message. Un touriste peut rapidement prendre l'outil en main.

Nous avons évitéun maximum de montrer les informations d'un établissement pour éviter que le touriste se perde dans des détails. S'il souhaite avoir des informations complètes et comparer les établissements, il se tournera vers un site d'évaluation ou de comparatif.

L'outil a une faible précision, mais il n'en a pas besoin. Il cherche à fournir une information primaire pour que le touriste puisse s'orienter rapidement vers une direction, une zone de la carte.

Nous avons suivi les préceptes de Schneiderman etmis en place un maximum actions possibles pour éviter d'écrire et ainsi avoir une utilisation plus fluide. Nous avons tout de même garder l'utilisation du langage pour palier au problème d'une liste d'informations (la liste de types d'établissements) trop longue.
