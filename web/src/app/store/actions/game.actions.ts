// src/app/store/game.actions.ts
import { createAction, props } from '@ngrx/store';
import { Card } from '../../models/card.model';
import { GameState } from '../reducers/game.reducer';

export const playCard = createAction(
  '[Game] Play Card',
  props<{ card: Card; enemyIndex?: number }>() // 
);
export const initializeGameState = createAction(
  '[Game] Initialize State',
  props<{ gameState: GameState }>()
);
export const restorePlayerEnergy = createAction('[Game] Restore Player Energy');
export const applyEnemyAttack = createAction(
  '[Game] Apply Enemy Attack',
  props<{ attackValue: number }>()
);
