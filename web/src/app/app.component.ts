import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FightRoomComponent } from './fight-room/fight-room.component';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FightRoomComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private gameService: GameService) {}

  title = 'roguelike';
  showFightRoom = false;

  startFight(): void {
    this.showFightRoom = true;
    this.gameService.initializeEnemies();
  }
}