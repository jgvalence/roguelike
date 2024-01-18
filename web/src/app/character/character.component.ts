import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service'; // Assurez-vous que le chemin est correct
import { MatCardModule } from '@angular/material/card';
import { Store, select } from '@ngrx/store';
import {
  selectPlayerEnergy,
  selectPlayerHealth,
} from '../store/selectors/game.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnInit {
  playerHealth$ = this.store.pipe(select(selectPlayerHealth));
  playerEnergy$ = this.store.pipe(select(selectPlayerEnergy));


  constructor(public gameService: GameService, private store: Store) {}
  ngOnInit(): void {
  }
}
