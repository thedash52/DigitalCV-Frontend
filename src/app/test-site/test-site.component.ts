import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-site',
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0.0 })),
      transition('1 => 0', animate('1.3s ease-out'))
    ]),
    trigger('valueChanged', [
      state('null => *', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('* => null', style({
        opacity: 1,
        transform: 'translateX(100%)'
      })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ],
  templateUrl: './test-site.component.html',
  styleUrls: ['./test-site.component.css']
})
export class TestSiteComponent implements OnInit {
  @Input() isVisible: boolean = true;
  value: number = 0;
  @Input() status: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    let textInterval = setInterval(() => {
      this.isVisible = !this.isVisible;
    }, 1800);

    let gaugeInterval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;

      this.status = null;
      this.status = this.value.toString();

      if (this.value >= 100) {
        this.value = 100;

        clearInterval(gaugeInterval);
        clearInterval(textInterval);

        setTimeout(() => {
          this.router.navigate(['/details']);
        }, 2000);
      }
    }, 1000);
  }

}
