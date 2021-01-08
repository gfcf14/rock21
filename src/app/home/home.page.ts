import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as Phaser from 'phaser';
import { DIMENSION } from './constants';
import { GameScene } from './game';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  config: Phaser.Types.Core.GameConfig;
  game: Phaser.Game;

  constructor(private plt: Platform) {
    this.config = {
      // height: this.plt.height(),
      height: 11 * DIMENSION,
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          checkCollision: { up: true, down: true, left: true, right: true },
          debug: false,
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: GameScene,
      type: Phaser.AUTO,
      // width: this.plt.width()
      width: 20 * DIMENSION
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    this.game.destroy(true, false);
  }

}