import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private amplifyService: AmplifyService) {}

  public pets;

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.amplifyService.auth().currentAuthenticatedUser().then(user => {
      const apiName = 'PetStore';
      const path = '/test/pets';
      const myInit = {
        // OPTIONAL
        headers: { Authorization: user.signInUserSession.idToken.jwtToken }, // OPTIONAL
        response: false // OPTIONAL (return the entire Axios response object instead of only response.data)
      };

      this.amplifyService.api().get(apiName, path, myInit)
        .then(data => {
          this.pets = data;
        })
        .catch(error => {
          console.log(error.response);
        });
    });
  }
}
