# SudocFiliation

Une extension (pour Firefox) qui interagit avec le [Sudoc](http://www.sudoc.abes.fr), le catalogue collectif national de l'ESR, en affichant le graphe dynamique des notices liées par des relations de type "Suite de", "Devient", "Fusionne avec" etc... pour les notices de périodiques. C'est donc une représentation graphique des filiations (quand elles existent) qui permet de naviguer dans les étapes du cycle de vie des revues et de visualiser dans le même temps la liste des bibliothèques localisées sous chaque notice.


## Comment ça marche

Chaque notice dans sa version web de données modélisée en rdf (par exemple [http://www.sudoc.fr/040338029.rdf](http://www.sudoc.fr/040338029.rdf) est ouverte pour être parsée et les propriétés correspondant aus zones de liens en sont extraites. Les localisations dynamiques sont obtenues sur la base du ppn avec le [web service multiwhere](http://documentation.abes.fr/sudoc/manuels/administration/aidewebservices/index.html#multiwhere:3).

## Utilisation

A partir du graphe de la notice courante, il faut cliquer sur un noeud représentant une notice liée pour déployer son propre graphe.
Les localisations s'affichent au srurvol des noeuds avec la souris.

## Installer l'add-on

Depuis le market place : []()

## Tester en local (sous Node)
* Installer l'utilitaire Web-ext : npm install --global web-ext
* Cloner le répertoire ou télécharger et dézipper l'archive
* dans la racine root du répertoire : web-ext run

