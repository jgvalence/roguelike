import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Store, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { gameReducer } from './app/store/reducers/game.reducer';
import { GameService } from './app/services/game.service'; // Assurez-vous que le chemin est correct
import { initializeGameState } from './app/store/actions/game.actions';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ game: gameReducer }),
    provideEffects([]),
    GameService,
  ],
}).then((ref) => {
  const gameService = ref.injector.get(GameService);
  const store = ref.injector.get(Store);

  store.dispatch(initializeGameState({
    gameState: {
      player: gameService.character, 
      enemies: gameService.enemies, 
    },
  }));
}).catch((err) => console.error(err));