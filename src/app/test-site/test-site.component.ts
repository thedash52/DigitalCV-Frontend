import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-site',
  templateUrl: './test-site.component.html',
  styleUrls: ['./test-site.component.css']
})
export class TestSiteComponent implements OnInit {
  value: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;

      if (this.value >= 100) {
        this.value = 100;

        clearInterval(interval);

        setTimeout(() => {
          this.router.navigate(['/details']);
        }, 2000);
      }
    }, 500);
  }

}
