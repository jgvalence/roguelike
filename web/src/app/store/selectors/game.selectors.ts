import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameState } from '../reducers/game.reducer';


export const selectGameState = createFeatureSelector<GameState>('game');

export const selectPlayer = createSelector(
  selectGameState,
  (state: GameState) => state.player
);

export const selectPlayerHealth = createSelector(
  selectPlayer,
  (player) => player.healthPoints
);

export const selectPlayerEnergy = createSelector(
  selectPlayer,
  (player) => player.energy
);


export const selectEnemyHealth = (enemyIndex: number) => createSelector(
  selectGameState,
  (state: GameState) => {
    return state.enemies[enemyIndex]?.healthPoints;
  }
);


