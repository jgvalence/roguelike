import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Enemy } from '../models/enemy.model';
import { Deck } from '../models/deck.models';
import { Card } from '../models/card.model';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  character: Character;
  enemies: Enemy[] = [];
  deck: Deck;
  isPlayerTurn: boolean = true;
  remainingEnergy: number;
  currentAttackName: string | null = null;
  currentDamage: number | null = null;
  constructor() {
    this.character = this.createPlayer();
    this.enemies = this.createEnemies();
    this.deck = this.createDeck();
    this.remainingEnergy = this.character.energy;
  }
  private selectedEnemyIndex: number | null = null;
  private selectedCard: Card | null = null;

  selectEnemy(index: number) {
    this.selectedEnemyIndex = index;
  }

  clearEnemySelection() {
    this.selectedEnemyIndex = null;
  }

  getSelectedEnemyIndex(): number | null {
    return this.selectedEnemyIndex;
  }
  private createPlayer(): Character {
    return new Character(1, 'Hero', 100, 10,10, 5, 0);
  }
  initializeEnemies(): void {
    const enemiesList = this.createEnemies();
    const numberOfEnemies = Math.floor(Math.random() * 3) + 1; 
    this.enemies = [];
    for (let i = 0; i < numberOfEnemies; i++) {
      const randomEnemyIndex = Math.floor(Math.random() * enemiesList.length);
      const randomEnemy = enemiesList[randomEnemyIndex];
      this.enemies.push(new Enemy(randomEnemy.id, randomEnemy.name, randomEnemy.healthPoints, randomEnemy.attack));
    }
  }
  private createEnemies(): Enemy[] {
    const enemies: Enemy[] = [
      new Enemy(1, 'Goblin', 30, 5),
      new Enemy(2, 'Orc', 100, 10),
      new Enemy(3, 'Troll', 200, 20),
    ];
    return enemies;
  }

  selectCard(card: Card) {
    this.selectedCard = card;
  }
  getSelectedCard(): Card | null {
    return this.selectedCard;
  }

  clearCardSelection() {
    this.selectedCard = null;
  }

  restorePlayerEnergy(): void {
    this.character.energy = this.character.maxEnergy;
  }
  
  applyEnemyAttack(attackValue: number): void {
    this.character.healthPoints = Math.max(0, this.character.healthPoints - attackValue);
  }
  private createDeck(): Deck {
    const initialCards: Card[] = [
      new Card(1, 'Attack', 1, 'Deals 5 damage', 'attack', 5),
      new Card(1, 'Attack', 1, 'Deals 5 damage', 'attack', 5),
      new Card(1, 'Attack', 1, 'Deals 5 damage', 'attack', 5),
      new Card(2, 'Defend', 1, 'Blocks 5 damage', 'defense', 5),
      new Card(2, 'Defend', 1, 'Blocks 5 damage', 'defense', 5),
      new Card(2, 'Defend', 1, 'Blocks 5 damage', 'defense', 5),
    ];
    return new Deck(initialCards);
  }
}
