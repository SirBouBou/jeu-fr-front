import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-tusmo',
  templateUrl: './tusmo.component.html',
  styleUrls: ['./tusmo.component.scss']
})
export class TusmoComponent implements OnInit {
  private httpClient: HttpClient;

  TAILLE_MOT= 7;
  ESPACE_USED= 500;
  WIDTH=650;
  HEIGHT=650;
  NB_TRY = 7;

  mot: string = "";
  guess: string = "";
  choix: string = "";
  cur = 0;
  dico: string[] = [];
  liste: string[][] = [[],[],[],[],[],[],[],[]]
  canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("main");

  constructor(http: HttpClient) {
    this.httpClient = http;
   }

  async ngOnInit() {
    this.cur = 0;

    this.createGraph();
    await this.getText().subscribe((data) => this.dico = data.split("\n"));;

  }

  start() {
    console.log(this.dico);
    (<HTMLButtonElement>document.getElementById("start"))!.disabled = true;
    for(var i = 0; i < this.dico.length; i++) {
      if((this.dico[i][0] >= 'a' && this.dico[i][0] <= 'z') && this.dico[i].length<8 && this.dico[i].indexOf("�") == -1) {
        this.liste[this.dico[i].length-1].push(this.dico[i]);
      }
    }
    this.mot = this.liste[this.TAILLE_MOT-1][Math.floor(Math.random()*(this.liste[this.TAILLE_MOT-1].length))]
    console.log(this.mot)
    var res = [];
    res.push(this.mot[0]);
    for(var i = 1; i < this.TAILLE_MOT; i++) {
      res.push(".");
    }
    this.guess = res.join("");

    this.afficheMot();
  }

  createGraph() {
    this.canvas = <HTMLCanvasElement>document.getElementById("main")
    this.canvas.height = this.HEIGHT;
    this.canvas.width = this.WIDTH;
    var ctx = this.canvas!.getContext('2d');
    ctx!.fillStyle = 'rgb(0, 0, 255)';
    ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    ctx!.fillStyle = 'rgb(255, 255, 255)';
    for(var i = 0; i < this.TAILLE_MOT; i++) {
      for(var j = 0; j < 7; j++) {
        ctx!.fillRect((this.WIDTH-this.ESPACE_USED)/2+(this.ESPACE_USED/this.TAILLE_MOT)*i, (this.ESPACE_USED/this.NB_TRY)*j, (this.ESPACE_USED/this.TAILLE_MOT), (this.ESPACE_USED/this.NB_TRY));
      }
    }
    /*ctx!.font = '48px serif';
    ctx!.fillText("e",150,150);*/

  }

  validate() {
    console.log("no");
    if(this.choix.length != this.TAILLE_MOT) {
      console.log("Taille")
    }
    else if(this.choix[0] != this.mot[0]) {
      console.log("Premiere lettre");
      this.cur++;
    }
    else if (this.liste[this.TAILLE_MOT-1].indexOf(this.choix) == -1) {
      console.log("Pad dico");
    }
    else {
      var ctx = this.canvas!.getContext('2d');
      var str = [];      
      for(var i = 0; i < this.TAILLE_MOT; i++) {
        if(this.choix[i] == this.mot[i]) {
          str.push(this.choix[i]);
          ctx!.fillStyle = 'rgb(0, 255, 0)';
          ctx!.fillRect((this.WIDTH-this.ESPACE_USED)/2+(this.ESPACE_USED/this.TAILLE_MOT)*i, (this.ESPACE_USED/this.NB_TRY)*this.cur, (this.ESPACE_USED/this.TAILLE_MOT), (this.ESPACE_USED/this.NB_TRY));
        } else if (this.mot.indexOf(this.choix[i]) != -1 && this.mot.split(this.choix[i]).length > 1) {
          ctx!.fillStyle = 'orange';
          ctx!.fillRect((this.WIDTH-this.ESPACE_USED)/2+(this.ESPACE_USED/this.TAILLE_MOT)*i, (this.ESPACE_USED/this.NB_TRY)*this.cur, (this.ESPACE_USED/this.TAILLE_MOT), (this.ESPACE_USED/this.NB_TRY));       
          str.push(".");
          
        } else {
          str.push(".");
        }
        ctx!.fillStyle = 'black';
        ctx!.fillText(this.choix[i],((this.WIDTH-this.ESPACE_USED)/2+(this.ESPACE_USED/this.TAILLE_MOT)*i + (this.ESPACE_USED/this.NB_TRY)/2), ((this.ESPACE_USED/this.NB_TRY)*this.cur) + (this.ESPACE_USED/this.NB_TRY)/2);
      }
      this.guess = str.join("");
      this.cur++;
      if (this.choix == this.mot) {
        alert("BRAVO");
      } else {
        this.choix = "";
        this.afficheMot();
      }
    }
  }

  afficheMot() {
    var ctx = this.canvas!.getContext('2d');
    ctx!.fillStyle = 'black';
    ctx!.font = '48px serif';
    for(var i = 0; i < this.mot.length; i++) {
      ctx!.fillText(this.guess[i],((this.WIDTH-this.ESPACE_USED)/2+(this.ESPACE_USED/this.TAILLE_MOT)*i + (this.ESPACE_USED/this.NB_TRY)/2), ((this.ESPACE_USED/this.NB_TRY)*this.cur) + (this.ESPACE_USED/this.NB_TRY)/2);
    }
  }

  getText(){
      return this.httpClient.get('././assets/liste_francais.txt', { responseType: 'text' });
  }

  newRow() {

  }
}
