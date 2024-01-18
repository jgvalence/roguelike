import { Component, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { EnemyComponent } from '../enemy/enemy.component';
import { DeckComponent } from '../deck/deck.component';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { playCard } from '../store/actions/game.actions';
import * as GameActions from '../store/actions/game.actions';

@Component({
  selector: 'app-fight-room',
  standalone: true,
  imports: [CharacterComponent, EnemyComponent, CommonModule, DeckComponent],
  templateUrl: './fight-room.component.html',
  styleUrls: ['./fight-room.component.scss'],
})
export class FightRoomComponent implements OnInit {
  constructor(public gameService: GameService, private store: Store) {}

  ngOnInit(): void {
    // ...
  }
  selectEnemy(enemyIndex: number): void {
    const selectedCard = this.gameService.getSelectedCard();
    if (selectedCard && selectedCard.type === 'attack') {  
      this.store.dispatch(playCard({ card: selectedCard, enemyIndex }));
      this.gameService.clearCardSelection(); 
    }
  }
  endTurn(): void {
    // Restaurer l'énergie du joueur à son maximum
    this.store.dispatch(GameActions.restorePlayerEnergy());
  
    // Faire attaquer chaque ennemi
    this.gameService.enemies.forEach(enemy => {
      this.store.dispatch(GameActions.applyEnemyAttack({ attackValue: enemy.attack }));
    });

  }
}
