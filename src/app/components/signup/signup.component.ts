import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string;
  password: string;
  role: string;
  roles = [
    { roleType : "admin" },
    { roleType : "client"}
  ]
  
  constructor (private router: Router, private authService: AuthenticationService) { }

  signup () {
    this.authService.signup(this.username, this.password, this.role).subscribe(user=>{
      this.router.navigate(['/login']);
    })
  }
}
