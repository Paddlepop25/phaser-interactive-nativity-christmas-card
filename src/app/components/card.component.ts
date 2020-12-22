import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private gameSvc: GameService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // get message from the url over to the card
    this.gameSvc.message = this.activatedRoute.snapshot.queryParams['message']
    console.info('message >>> ', this.gameSvc.message)
    this.gameSvc.createGame()
  }
}
