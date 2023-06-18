import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor (private router: Router, private authService: AuthenticationService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(user=>{
      if(user[0]) {
        localStorage.setItem('userRole', user[0].role);
        localStorage.setItem('userId', user[0].id);
        this.router.navigate(['/dishes']);
      } else {
        alert('Invalid credentials');
      }
    })
  }
}
