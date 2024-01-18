import { createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
import { Enemy } from '../../models/enemy.model';
import { Character } from '../../models/character.model';

export interface GameState {
  player: Character;
  enemies: Enemy[]; // Un tableau pour gérer plusieurs ennemis
}

export const initialState: GameState = {
  player: new Character(1, 'Player', 100, 3, 5, 5, 0),
  enemies: [],
};
export const gameReducer = createReducer(
  initialState,
  on(GameActions.playCard, (state, { card, enemyIndex }) => {
    const updatedEnemies = state.enemies.map((enemy, index) => {
      if (index === enemyIndex && card.type === 'attack') {
        return {
          ...enemy,
          healthPoints: Math.max(0, enemy.healthPoints - card.value),
        };
      } 
      return enemy;
    });
    
    if (card.type === 'defense') {
      console.log('le game reducer a été appelé');
      
      return {
        ...state,
        player: {
          ...state.player,
          temporaryDefense: (state.player.temporaryHealthPoints || 0) + card.value,
          energy: Math.max(0, state.player.energy - card.cost),
        }
      };
    }
    return {
      ...state,
      player: {
        ...state.player,
        energy: Math.max(0, state.player.energy - card.cost),
      },
      enemies: updatedEnemies,
    };
  }),
  on(GameActions.initializeGameState, (_, { gameState }) => {
    return { ...gameState };
  }),
  on(GameActions.restorePlayerEnergy, (state) => {
    return {
      ...state,
      player: {
        ...state.player,
        energy: state.player.maxEnergy,
      },
    };
  }),
  on(GameActions.applyEnemyAttack, (state, { attackValue }) => {
    return {
      ...state,
      player: {
        ...state.player,
        healthPoints: Math.max(0, state.player.healthPoints - attackValue),
      },
    };
  }),
);
