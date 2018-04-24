import { AlertifyService } from './../services/alertify.service';
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

  constructor(private authService: AuthService, private alertifyService: AlertifyService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertifyService.success('Register succesfully');
      },
      err => {
        this.alertifyService.error(err);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
