import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-gameboard",
  templateUrl: "./gameboard.component.html",
  styleUrls: ["./gameboard.component.css"]
})
export class GameboardComponent implements OnInit {
  @ViewChild("removeLiClass") questions: any;
  constructor() {}

  easyArray = new Array(9);
  mediumArray = new Array(36);
  hardArray = new Array(81);
  subscribeTimer: any;
  timeLeft: number = 30;
  randomNo: any;
  classBind: any;
  score: any = 0;
  abc: any;
  interval: any;
  scoreUpdatedValue: any;
  localStScore: any;
  currentScore: any;
  clicked: any;

  // oberserableTimer() {
  //   const source = timer(1000, 1000);
  //   this. abc = source.subscribe(val => {
  //     this.subscribeTimer = this.timeLeft - val;
  //     this.randomNo = Math.floor(Math.random() * 8) + 1;
  //   });
  //   const timer$ = timer(600000);
  //    this.abc = source.pipe(takeUntil(timer$));
  // }

  startTimer() {
    this.cleartest();
    this.clicked = "false";
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.randomNo = Math.floor(Math.random() * 8) + 1;
        this.timeLeft--;
      } else {
        this.cleartest();
        this.pauseTimer();
        this.timeLeft = 30;
        this.score = 0;
      }
    }, 1000);
  }

  cleartest() {
    clearInterval(this.interval);

    this.questions.nativeElement.querySelectorAll("li").forEach(function(el) {
      el.classList.remove("classBind");
    });
  }

  pauseTimer() {
    this.scoreUpdatedValue = this.score;

    if (this.score > parseInt(this.localStScore)) {
      this.localStScore = this.score;
      localStorage.setItem("Score", JSON.stringify(this.scoreUpdatedValue));
    } else {
      this.localStScore = localStorage.getItem("Score");
    }
  }

  myFunction(evt) {
    var target = evt.target.className;
    if (target !== "blink-red") {
      if (target.indexOf("classBind") > -1) {
        this.score++;
      } else {
        this.score--;
      }
      this.currentScore = this.score;
    }
  }
  ngOnInit() {
    this.localStScore = localStorage.getItem("Score");
  }
}
