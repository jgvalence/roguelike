import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../services/game.service'; // Assurez-vous que le chemin est correct
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectEnemyHealth } from '../store/selectors/game.selectors';
import { Enemy } from '../models/enemy.model';

@Component({
  selector: 'app-enemy',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './enemy.component.html',
  styleUrl: './enemy.component.scss',
})
export class EnemyComponent implements OnInit {
  @Input() enemy!: Enemy;
  @Input() enemyIndex!: number;

  constructor(public gameService: GameService, private store: Store) {
  }
    
  enemyHealth$ = this.store.pipe(
    select(selectEnemyHealth(this.enemyIndex)) 
  );

  ngOnInit(): void {
    this.enemyHealth$ = this.store.pipe(
      select(selectEnemyHealth(this.enemyIndex))
    );
  }
}
