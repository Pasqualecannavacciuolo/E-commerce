import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-success-subscription',
  templateUrl: './success-subscription.component.html',
  styleUrls: ['./success-subscription.component.css']
})
export class SuccessSubscriptionComponent implements OnInit {

  sessionID: any = '';

  constructor(
    private UserService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.sessionID = window.sessionStorage.getItem('id');
    this.addSubscription();
    setTimeout(() => {
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    }, 3500);
  }

  addSubscription() {
    if(this.sessionID != ''){
      this.UserService.getUserByID(this.sessionID).subscribe(response => {
        let tmp_user = response;
        tmp_user.subscription = true;
        this.UserService.addSubscription(this.sessionID, tmp_user).subscribe(res => console.log(res));
      });
    }
  }

}
