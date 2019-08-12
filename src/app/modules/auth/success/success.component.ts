import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-success',
  template: `<p>
    Authentication successfull, loading Civis Platform...
  </p>
`,
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.access_token) {
        const accessToken = params.access_token;
        console.log('access token is: ', accessToken);
        this.tokenService.storeToken({
          accessToken
        });
        this.tokenService.tokenHandler();
        this.userService.manageUserToken();
        this.userService.userLoaded$.subscribe(data => {
          if (data) {
            this.router.navigateByUrl('/profile');
          }
        });
      }
    });
  }

}
