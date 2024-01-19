import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GameService } from '../services/game.service'; // Assurez-vous que le chemin est correct
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectEnemyHealth } from '../store/selectors/game.selectors';
import { Enemy } from '../models/enemy.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  isTarget = false;
  isAttacking = false;
  private destroy$ = new Subject<void>();

  constructor(public gameService: GameService, private store: Store,  private cdRef: ChangeDetectorRef
    ) {
  }
    
  enemyHealth$ = this.store.pipe(
    select(selectEnemyHealth(this.enemyIndex)) 
  );

  ngOnInit(): void {
    this.enemyHealth$ = this.store.pipe(
      select(selectEnemyHealth(this.enemyIndex))
    );    
    this.gameService.targetIndex$.pipe(takeUntil(this.destroy$)).subscribe(index => {
      this.isTarget = index === this.enemyIndex;
    });

    // Souscription à attackingEnemyName
    this.gameService.attackingEnemyName$.pipe(takeUntil(this.destroy$)).subscribe(name => {
      this.isAttacking = name === this.enemy.name;
    });
  }
  updateTargetStatus(): void {
    this.isTarget = this.gameService.targetIndex === this.enemyIndex;
    this.cdRef.detectChanges(); 
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
