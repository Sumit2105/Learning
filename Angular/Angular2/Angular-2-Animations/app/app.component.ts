import { Component,
        trigger,
        state,style,transition,animate,keyframes,group 
} from '@angular/core';
@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>
             <button (click)="toggleDiv()">ToggleDiv</button>
             <div *ngIf="showDiv" [@flyInOut]>
              FLYINOUT
             </div>
             `,
  animations: [
    trigger('flyInOut',[
      transition('void => *',[
       style({transform: 'translateX(-100%)'}),
       animate(1000, keyframes([
         style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
         style([{opacity: 1, transform: 'translateX(15px)', offset: 0.3}]),
         style([{opacity: 1, transform: 'translateX(0)', offset: 1.0}])
       ]))
      ]),
      transition('* => void',[
       animate(1000, keyframes([
        style({opacity: 1, transform: 'translateX(0)', offset: 0}),
        style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
       ]))
      ])
    ])
  ]
})
export class AppComponent { 
  title = 'Angular Animations';
  showDiv : boolean = true;
  toggleDiv(){
    this.showDiv = this.showDiv ? false : true;
  }
}
