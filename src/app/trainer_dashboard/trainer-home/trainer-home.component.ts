import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/common_service/auth-service.service';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css']
})
export class TrainerHomeComponent implements OnInit{

  isTrainer: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(private auth: AuthServiceService) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole() {
    const role = this.auth.getUserRole();
    console.log('User Role:', role);

    this.isAdmin = role === 'SUPER_ADMIN';
    this.isTrainer = role === 'TRAINER';
    this.isUser = role === 'USER' || role === 'TRAINER' || role === 'SUPER_ADMIN';

    console.log('isTrainer:', this.isTrainer, 'isUser:', this.isUser, 'isAdmin:', this.isAdmin);
  }
  

  

}
