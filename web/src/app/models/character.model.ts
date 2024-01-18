export class Character {
    constructor(
      public id: number,
      public name: string,
      public healthPoints: number,
      public energy: number,
      public maxEnergy: number,
      public handSize: number,
      public temporaryHealthPoints: number
      // Ajoutez d'autres propriétés selon les besoins de votre jeu, comme l'inventaire
    ) {}
  
    // Méthodes supplémentaires pour la logique du personnage peuvent être ajoutées ici
  }