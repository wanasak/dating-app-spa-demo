import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('Register succesfully');
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
