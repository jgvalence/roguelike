import { Component, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { EnemyComponent } from '../enemy/enemy.component';
import { DeckComponent } from '../deck/deck.component';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { playCard } from '../store/actions/game.actions';
import * as GameActions from '../store/actions/game.actions';
import { of } from 'rxjs';
import { delay, concatMap, tap } from 'rxjs/operators';

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
      this.gameService.setAttack(selectedCard.name, selectedCard.value, enemyIndex);
      this.store.dispatch(playCard({ card: selectedCard, enemyIndex }));
      this.gameService.clearCardSelection();
  
      setTimeout(() => {
        this.gameService.clearAttack();
      }, 2000); // Réinitialise après 2 secondes
    }
  }
  
  endTurn(): void {
    // Restaurer l'énergie du joueur à son maximum
    this.store.dispatch(GameActions.restorePlayerEnergy());
  
    // Créer un flux observable pour chaque ennemi avec un délai
    of(...this.gameService.enemies).pipe(
      concatMap(enemy => 
        of(enemy).pipe(
          tap(() => {
            // Mettre à jour les informations d'attaque avant de dispatcher l'attaque
            this.gameService.setEnemyAttack(enemy.name, enemy.attack);
          }),
          delay(2000) // Introduit un délai de 2 secondes entre chaque ennemi
        )
      )
    ).subscribe(enemy => {
      // Dispatcher l'attaque de l'ennemi après le délai
      this.store.dispatch(GameActions.applyEnemyAttack({ attackValue: enemy.attack }));
  
      // Réinitialiser les informations d'attaque
      setTimeout(() => {
        this.gameService.clearEnemyAttack();
      }, 2000);
    });
  }
  
}
