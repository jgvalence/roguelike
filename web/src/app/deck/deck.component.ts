import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Card } from '../models/card.model'; // Assurez-vous que le chemin est correct
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
  standalone: true,
  imports: [CardComponent, CommonModule],
})
export class DeckComponent implements OnInit {
  cards!: Card[];

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.cards = this.gameService.deck.cards;
  }
}
