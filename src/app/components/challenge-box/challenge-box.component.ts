import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Challenge } from 'src/app/store/challenge/challenge.module';

import * as AppStore from '../../store/app.reducer';
import * as ChallengeActions from '../../store/challenge/challenge.actions';

const challenges = [
  {
    "type": "body",
    "description": "Extend one of your arms with your palm facing forward and pull your fingers upwards for 10 seconds per hand. ",
    "amount": 80
  },
  {
    "type": "body",
    "description": "Stretch your arm against your chest and pull it using your other arm for 10 seconds per arm. ",
    "amount": 60
  },
  {
    "type": "body",
    "description": "Pull your neck with your hand to the right and to the left, staying in position for a few seconds. ",
    "amount": 70
  },
  {
    "type": "body",
    "description": "With both hands on the back of your head, bring it down, stretching the back of the area. ",
    "amount": 60
  },
  {
    "type": "body",
    "description": "Cross your legs and descend with your hands straight towards the floor. Repeat the movement with the other leg in front. ",
    "amount": 100
  },
  {
    "type": "body",
    "description": "Sitting, open your legs and try to touch your palms to the floor, repeat 3 times for 5 seconds. ",
    "amount": 80
  },
  {
    "type": "body",
    "description": "Pull your knee against your chest and hold, switch legs after 10 seconds. ",
    "amount": 50
  },
  {
    "type": "body",
    "description": "Sitting, cross one leg and lean your torso forward, switch legs after 10 seconds. ",
    "amount": 80
  },
  {
    "type": "eye",
    "description": "Sitting, close your eyes and cover them with your palms for 2 minutes, then open normally. ",
    "amount": 90
  },
  {
    "type": "eye",
    "description": "In some open environment, look as far as you can in four directions for 3 seconds, just move your eyes. Repeat 3 times. ",
    "amount": 140
  },
  {
    "type": "eye",
    "description": "Using your thumbs, massage the area under the eyebrows in a circular motion for 15 seconds. ",
    "amount": 70
  },
  {
    "type": "body",
    "description": "Standing, rotate your waist as far as you can to the left, hold for five seconds. Repeat to the right. ",
    "amount": 90
  }
]


@Component({
  selector: 'app-challenge-box',
  templateUrl: './challenge-box.component.html',
  styleUrls: ['./challenge-box.component.scss']
})
export class ChallengeBoxComponent implements OnInit {

  hasFinished: boolean;
  isActive: boolean;
  randomChallengeIndex: number;
  challenge: Challenge;
  currentXp: number;
  hasChallenge: Challenge;


  constructor(
    private store: Store<AppStore.AppState>
  ) { }

  ngOnInit(): void {
    Notification.requestPermission();

    this.store.select('countdown').subscribe(data => {
      this.hasFinished = data.countdown.hasFinished;
      this.isActive = data.countdown.isActive;

      if (!this.hasChallenge) {
        if (this.hasFinished && !this.isActive) {
          this.randomChallengeIndex = Math.floor(Math.random() * challenges.length);
          this.challenge = challenges[this.randomChallengeIndex];

          // guardar challenge na store
          this.store.dispatch(ChallengeActions.storeActiveChallenge({ activeChallenge: this.challenge }))

          new Audio('/assets/notification.mp3').play();

          if (Notification.permission === 'granted') {
            new Notification('New challenge 🎉', {
              body: `Worth ${this.challenge.amount}xp!`
            })
          }
        }
      }


    })

    this.store.select('challenge').subscribe(data => {
      this.currentXp = data.challenge.currentExperience;
      this.hasChallenge = data.challenge.activeChallenge;
    })
  }

  handleFailedChallenge() {
    console.log('challenge failed');
    this.store.dispatch(ChallengeActions.isChallengeSucceeded({ challengeResponse: false, amount: 0 }));
    this.challenge = null;
  }

  handleSucceededChallenge() {
    console.log('challenge succeeded, amount: ', this.challenge.amount);
    this.store.dispatch(ChallengeActions.isChallengeSucceeded({ challengeResponse: true, amount: this.challenge.amount }))
    this.challenge = null;
    // get xp and sum to current xp on store

    // console.log('current: ', this.currentXp);

  }

}
