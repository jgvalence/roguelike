import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../models/card.model';
import { GameService } from '../services/game.service';
import { select, Store } from '@ngrx/store';
import { playCard } from '../store/actions/game.actions';
import { selectPlayerEnergy } from '../store/selectors/game.selectors';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  playerEnergy$: Observable<number>;
  private actionTriggered = false;

  constructor(private gameService: GameService, private store: Store) {
    this.playerEnergy$ = this.store.pipe(select(selectPlayerEnergy));
  }

  ngOnInit(): void {}
  onCardClick(): void {
    this.playerEnergy$.pipe(take(1)).subscribe((energy: number) => {
      if (energy >= this.card.cost) {
        if (this.card.type === 'attack') {
          this.gameService.selectCard(this.card);
        } else if (this.card.type === 'defense' && !this.actionTriggered) {
          console.log('la carte est une carte de défense');
          this.store.dispatch(playCard({ card: this.card }));
          
        }
      }
    });
  }
}
