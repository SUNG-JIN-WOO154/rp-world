const scenarios = {
  intro: {
    id: 'intro',
    title: 'Réveil dans les vestiges de l’Aube',
    location: 'Aube du Monde',
    story: 'Tu te réveilles dans une capsule de survie, au milieu des ruines d’une mégalopole brisée. Le ciel est traversé par des faisceaux de lumière rouge, et le réseau central de la cité semble encore vivre en secret. Un signal parasite murmure ton nom.',
    context: 'Le monde n’a pas fini de mourir. La prochaine décision déterminera si tu seras un survivant… ou l’origine du prochain cataclysme.',
    image: 'linear-gradient(135deg, rgba(42,66,120,0.85), rgba(18,23,37,0.9))',
    choices: [
      {
        text: 'Suivre le signal dans les ruines',
        next: 'ruins',
        effect: { gold: 5, energy: -5, xp: 10, reputation: 1 },
        item: 'Carte gravée d’une ancienne route'
      },
      {
        text: 'Explorer le camp des survivants',
        next: 'camp',
        effect: { gold: 10, energy: -3, xp: 8 },
        item: 'Médicament de terrain'
      },
      {
        text: 'Rester immobile et écouter la ville',
        next: 'listen',
        effect: { energy: -2, xp: 6, reputation: 2 },
        item: 'Fragment de mémoire dorée'
      }
    ]
  },
  ruins: {
    id: 'ruins',
    title: 'L’ancienne route sous les décombres',
    location: 'Ruines du Réseau',
    story: 'Tu avances entre des murs fissurés et des rails électriques encore chargés. Une ancienne station de collecte émet un bourdonnement régulier. Tu trouves un drone cassé contenant une clé de navigation et un carnet de bord.',
    context: 'Les ruines portent encore la mémoire du monde ancien. Dans chaque pierre, une histoire peut devenir un danger.',
    image: 'linear-gradient(135deg, rgba(93,109,158,0.85), rgba(22,25,43,0.88))',
    choices: [
      {
        text: 'Réparer le drone et l’envoyer en reconnaissance',
        next: 'drone',
        effect: { gold: 12, energy: -6, xp: 15, reputation: 2 },
        item: 'Drone de détection'
      },
      {
        text: 'Prendre la clé et partir vers le marché souterrain',
        next: 'market',
        effect: { gold: 8, energy: -4, xp: 12 },
        item: 'Clé de marché'
      },
      {
        text: 'Sonder le carnet et tenter de déchiffrer le code',
        next: 'cipher',
        effect: { energy: -8, xp: 20, reputation: 4 },
        item: 'Fragment de code ancien'
      }
    ]
  },
  camp: {
    id: 'camp',
    title: 'Le camp du dernier feu',
    location: 'Camp de la Veille',
    story: 'Tu rencontres une petite communauté de survivants, des ingénieurs et des chasseurs, qui tentent de maintenir une forge dans les débris. Un chef de groupe te propose un pacte: aider la communauté, et tu gagneras un accès au système de récolte.',
    context: 'La survie est une question de loyauté. Le camp est faible, mais son réseau est précieux.',
    image: 'linear-gradient(135deg, rgba(36,99,92,0.82), rgba(12,20,25,0.9))',
    choices: [
      {
        text: 'Aider à renforcer la forge',
        next: 'forge',
        effect: { gold: 18, energy: -5, xp: 18, reputation: 5 },
        item: 'Lingot de fer pur'
      },
      {
        text: 'Partir chasser en forêt pour rapporter de la viande',
        next: 'forest',
        effect: { gold: 15, energy: -12, xp: 20 },
        item: 'Viande de bête mutante'
      },
      {
        text: 'Mener un raid sur le dépôt voisin',
        next: 'raid',
        effect: { gold: 30, energy: -16, xp: 25, reputation: -3 },
        item: 'Module de cachette'
      }
    ]
  },
  listen: {
    id: 'listen',
    title: 'La voix des machines',
    location: 'Silence de la Cité',
    story: 'Tu attends. Le silence se déchire. Une voix mécanique traverse les fenêtres brisées, semblant te parler en provenance du cœur de la ville. Elle évoque une “Renaissance du réseau” et la possibilité de reconstruire l’ordre.',
    context: 'Le monde ancien ne veut pas mourir. Il veut être réécrit.',
    image: 'linear-gradient(135deg, rgba(111,79,186,0.82), rgba(17,17,26,0.9))',
    choices: [
      {
        text: 'Répondre à la voix',
        next: 'voice',
        effect: { energy: -8, xp: 22, reputation: 7 },
        item: 'Sceau de connexion'
      },
      {
        text: 'Garder le silence et partir dans le désert',
        next: 'desert',
        effect: { gold: 10, energy: -6, xp: 14 },
        item: 'Couteau solaire'
      }
    ]
  },
  market: {
    id: 'market',
    title: 'Le marché caché sous la cité',
    location: 'Marché des Brumes',
    story: 'Sous les plaques de métal, un marché clandestin s’organise. Des marchands vendent des composants de drones, des potions, des artefacts, et des cartes de navigation. Le chaos y est précieux.',
    context: 'Ici, chacun cherche le bon objet pour la bonne route. La moindre confiance peut coûter la vie.',
    image: 'linear-gradient(135deg, rgba(89,70,124,0.82), rgba(18,16,31,0.9))',
    choices: [
      {
        text: 'Acheter des outils de forage',
        next: 'mine',
        effect: { gold: -20, energy: -4, xp: 16 },
        item: 'Outil de forage lourd'
      },
      {
        text: 'Vendre le fragment trouvé et obtenir des provisions',
        next: 'provisions',
        effect: { gold: 30, energy: -2, xp: 12 },
        item: 'Sac de provisions avancées'
      },
      {
        text: 'Prendre un contrat de chasse sur les chasseurs mutés',
        next: 'hunt',
        effect: { gold: 18, energy: -10, xp: 25, reputation: 4 },
        item: 'Boussole de piste'
      }
    ]
  },
  drone: {
    id: 'drone',
    title: 'Le drone des cendres',
    location: 'Antenne de surveillance',
    story: 'Le drone se réactive et révèle une route cachée vers une ville flottante au-delà d’une chaîne de montagnes. Il a aussi enregistré des images de soldats mutés dans la forêt de cristal.',
    context: 'L’univers s’étend. Le monde n’est pas vide: il est simplement caché.',
    image: 'linear-gradient(135deg, rgba(83,126,174,0.82), rgba(20,23,38,0.9))',
    choices: [
      {
        text: 'Marquer la route vers la forêt de cristal',
        next: 'forest',
        effect: { gold: 10, energy: -6, xp: 18 },
        item: 'Carte étoilée'
      },
      {
        text: 'Suivre les images et visiter la cité flottante',
        next: 'skybridge',
        effect: { gold: 20, energy: -10, xp: 24, reputation: 6 },
        item: 'Circuit de gravité'
      }
    ]
  },
  cipher: {
    id: 'cipher',
    title: 'Le code du premier réseau',
    location: 'Données oubliées',
    story: 'Tu déchiffres le carnet. Il contient un protocole de réactivation de l’ancien réseau. Les anciens bâtisseurs ont créé une clé pour une “ruine vivante” capable de redonner de l’énergie à la ville.',
    context: 'Le pouvoir du passé est encore actif. Le monde ancien n’est pas mort, il dort.',
    image: 'linear-gradient(135deg, rgba(69,95,110,0.8), rgba(19,23,31,0.9))',
    choices: [
      {
        text: 'Utiliser la clé pour réveiller la machine',
        next: 'powercore',
        effect: { gold: 15, energy: -12, xp: 30, reputation: 8 },
        item: 'Clé primaire du réseau'
      },
      {
        text: 'Conserver le secret pour créer ton propre système',
        next: 'forge',
        effect: { gold: 12, energy: -6, xp: 18 },
        item: 'Prototype de noyau'
      }
    ]
  },
  forge: {
    id: 'forge',
    title: 'La forge du dernier feu',
    location: 'Forge de la Veille',
    story: 'La forge humaine tient encore. Les survivants ont construit un noyau de fusion rudimentaire, capable de donner vie à des armures et des outils de haute précision. Tu chasses l’ennui et les périls pour assurer l’avenir.',
    context: 'Le futur ne se conquiert pas par la force seule, mais par la capacité à créer ce qui durera.',
    image: 'linear-gradient(135deg, rgba(78,112,89,0.8), rgba(17,23,20,0.9))',
    choices: [
      {
        text: 'Fabriquer une armure de combat',
        next: 'garrison',
        effect: { gold: -10, energy: -8, xp: 26, reputation: 6 },
        item: 'Armure de combat lourde'
      },
      {
        text: 'Créer un outil de récolte avancé',
        next: 'mine',
        effect: { gold: -8, energy: -5, xp: 22 },
        item: 'Outil de récolte ultra'
      },
      {
        text: 'Mener un groupe vers la forêt',
        next: 'forest',
        effect: { gold: 18, energy: -9, xp: 24, reputation: 4 },
        item: 'Androïde de terrain'
      }
    ]
  },
  forest: {
    id: 'forest',
    title: 'Forêt de cristal',
    location: 'Bois de sang et de lumière',
    story: 'Les arbres sont faits de verre, de lierre holographique et de poussière de soleil. Des créatures mutantes se déplacent entre les troncs. Tu as l’impression de marcher dans un jardin mécanique qui a été laissé à l’abandon.',
    context: 'La forêt ne veut pas te laisser partir. Elle observe et teste.',
    image: 'linear-gradient(135deg, rgba(64,131,119,0.82), rgba(12,22,22,0.9))',
    choices: [
      {
        text: 'Capter la source lumineuse au cœur de la forêt',
        next: 'source',
        effect: { gold: 22, energy: -12, xp: 32, reputation: 7 },
        item: 'Cristal de lueur vive'
      },
      {
        text: 'Tuer la bête mutante et récupérer sa peau',
        next: 'trade',
        effect: { gold: 30, energy: -15, xp: 28 },
        item: 'Peau durable de mutante'
      },
      {
        text: 'Poursuivre un bruit de machine vers les grottes',
        next: 'caverns',
        effect: { gold: 18, energy: -10, xp: 24 },
        item: 'Carte des cavernes'
      }
    ]
  },
  raid: {
    id: 'raid',
    title: 'Raid sur le dépôt',
    location: 'Dépôt de la Proie',
    story: 'Le dépôt est lourdement gardé. Tu franchis les barricades, repères les drones de sécurité, et remonte la piste vers des caisses de vivres et de munitions. Une faction hostile te laisse une chance: soit tu récupères, soit tu disparaîs.',
    context: 'Le courage est parfois un choix brut. Tu payes simplement ce que tu prends.',
    image: 'linear-gradient(135deg, rgba(109,66,66,0.8), rgba(24,15,15,0.9))',
    choices: [
      {
        text: 'Piller et fuir avant les renforts',
        next: 'market',
        effect: { gold: 40, energy: -18, xp: 35, reputation: -5 },
        item: 'Caisse de provisions en secret'
      },
      {
        text: 'Libérer les prisonniers et repartir avec la cargaison',
        next: 'garrison',
        effect: { gold: 28, energy: -12, xp: 38, reputation: 8 },
        item: 'Munitions accordées'
      }
    ]
  },
  skybridge: {
    id: 'skybridge',
    title: 'La cité suspendue',
    location: 'Pont du Ciel',
    story: 'Un réseau de ponts suspendus traverse les nuages et mène vers une cité flottante. Elle brille comme une lune artificielle. Sa population vit à l’écart du monde, dans la peur de la chute.',
    context: 'La ville du ciel n’a pas été sauvée par la technologie — elle a été sauvée par l’illusion du contrôle.',
    image: 'linear-gradient(135deg, rgba(102,130,182,0.8), rgba(16,20,34,0.9))',
    choices: [
      {
        text: 'Rencontrer la garde du ciel',
        next: 'garrison',
        effect: { gold: 15, energy: -8, xp: 26, reputation: 6 },
        item: 'Badge de l’Ascension'
      },
      {
        text: 'Entrer dans les niveaux souterrains',
        next: 'echo',
        effect: { gold: 12, energy: -10, xp: 30 },
        item: 'Matrice de gravité'
      }
    ]
  },
  garrison: {
    id: 'garrison',
    title: 'La garnison des derniers ordres',
    location: 'Citadelle de l’Ordre',
    story: 'Tu parviens sous les remparts d’une forteresse construite autour d’un ancien générateur. Les soldats qui la gardent refusent d’admettre que le monde change. Ils veulent un chef capable de redessiner la civilisation.',
    context: 'L’ordre protège, mais il peut aussi enfermer. L’avenir exige un nouveau pacte.',
    image: 'linear-gradient(135deg, rgba(132,101,68,0.82), rgba(24,19,14,0.9))',
    choices: [
      {
        text: 'Accepter le commandement de la garde',
        next: 'finale',
        effect: { gold: 25, energy: -12, xp: 34, reputation: 10 },
        item: 'Commandement de la citadelle'
      },
      {
        text: 'Briser l’Ordre et rejoindre la voie libre',
        next: 'echo',
        effect: { gold: 20, energy: -14, xp: 36, reputation: -4 },
        item: 'Lame du rébellionnaire'
      }
    ]
  },
  echo: {
    id: 'echo',
    title: 'La ville des échos',
    location: 'Écho-Cité',
    story: 'Tu descends dans les niveaux médians d’une ville enterrée où chaque corridor renvoie des voix. Ici, la mémoire du monde n’est plus un passage: c’est une architecture complète. Des fantômes de machine veillent encore.',
    context: 'Quand la ville parle, mieux vaut écouter avant d’entrer dans son cœur.',
    image: 'linear-gradient(135deg, rgba(69,86,136,0.78), rgba(20,22,31,0.9))',
    choices: [
      {
        text: 'Écouter le réseau jusqu’au cœur',
        next: 'finale',
        effect: { gold: 20, energy: -12, xp: 42, reputation: 12 },
        item: 'Matrice mémorielle'
      },
      {
        text: 'Saisir la mémoire et fuir avant qu’elle ne te transforme',
        next: 'finale',
        effect: { gold: 30, energy: -18, xp: 38, reputation: 5 },
        item: 'Souvenir vivant'
      }
    ]
  },
  finale: {
    id: 'finale',
    title: 'Le cœur du réseau',
    location: 'Noyau de Renaissance',
    story: 'Tu pénètres dans le cœur du réseau, un lieu de lumière blanche et d’échos infinis. Là, le monde ancien est encore vivant. Il te demande une seule chose: choisir la forme de la prochaine civilisation. Sois juge, bâtisseur ou destructeur.',
    context: 'Le jeu ne finit pas quand tu choisis. Il finit quand le monde décide de quoi tu es fait.',
    image: 'linear-gradient(135deg, rgba(130,106,213,0.8), rgba(14,15,24,0.92))',
    choices: [
      {
        text: 'Rebâtir le monde avec équilibre et mémoire',
        next: 'ending_good',
        effect: { gold: 50, energy: -8, xp: 60, reputation: 20 },
        item: 'Étoile de Renaissance'
      },
      {
        text: 'Transformer le monde par la puissance et la peur',
        next: 'ending_dark',
        effect: { gold: 45, energy: -10, xp: 58, reputation: 15 },
        item: 'Sceau du Dominion'
      },
      {
        text: 'Libérer le monde et laisser l’avenir se refaire seul',
        next: 'ending_free',
        effect: { gold: 35, energy: -6, xp: 62, reputation: 18 },
        item: 'Clé du vide'
      }
    ]
  },
  ending_good: {
    id: 'ending_good',
    title: 'L’Âge de la Renaissance',
    location: 'Royaume de lumière',
    story: 'Tu choisis de unir la mémoire du passé et la force des survivants. Les chemins se reconnectent. Les villes respirent de nouveau, les forêts de cristal reprennent du souffle, et les humains ne vivent plus dans la peur de la nuit: ils vivent dans la promesse du lendemain.',
    context: 'Tu as sauvé le monde de la répétition. L’avenir commence enfin.',
    image: 'linear-gradient(135deg, rgba(64,164,145,0.85), rgba(12,24,21,0.9))',
    choices: []
  },
  ending_dark: {
    id: 'ending_dark',
    title: 'L’Empire du silence',
    location: 'Règne de la volonté',
    story: 'Tu imposes l’ordre au monde. Les factions s’inclinent. Les villes se reforment dans la peur, les technologies se centralisent, et la paix acquiert le visage d’un empire. Ainsi naît une civilisation de fer, sans doute plus forte — mais plus dure.',
    context: 'Le monde vacille, mais il ne s’effondre plus. Il obéit.',
    image: 'linear-gradient(135deg, rgba(146,84,84,0.85), rgba(26,15,15,0.9))',
    choices: []
  },
  ending_free: {
    id: 'ending_free',
    title: 'Le monde libre',
    location: 'Le vide n’a pas de maître',
    story: 'Tu refuses les chaînes du passé et les promesses du pouvoir. Tu laisses la civilisation se redessiner seule, dans l’incertitude et la beauté. Ce monde n’appartient plus à l’ancien réseau, ni à toi, ni à aucune faction. Il appartient à tout ce qui sera construit après.',
    context: 'Tu n’as pas gagné le monde. Tu lui as rendu la liberté.',
    image: 'linear-gradient(135deg, rgba(123,104,183,0.85), rgba(16,16,30,0.9))',
    choices: []
  }
};

window.scenarios = scenarios;
