import { Component, inject, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private _authService = inject(AuthService);
  public isLoggedIn: WritableSignal<boolean> = this._authService.isLoggedIn;
  public logout(): void {
    console.log('logout heard!');
    this._authService.logout();
  }
}
