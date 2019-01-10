import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AmplifyService } from 'aws-amplify-angular';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
  public loggedIn: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private amplifyService: AmplifyService
    ) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  /** signup */
  public signUp(email, password): Observable<any> {
    return fromPromise(this.amplifyService.auth().signUp(email, password));
  }

  /** confirm code */
  public confirmSignUp(email, code): Observable<any> {
    return fromPromise(this.amplifyService.auth().confirmSignUp(email, code));
  }

  /** signin */
  public signIn(email, password): Observable<any> {
    return fromPromise(this.amplifyService.auth().signIn(email, password)).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  /** get authenticat state */
  public isAuthenticated(): Observable<boolean> {
    return fromPromise(this.amplifyService.auth().currentAuthenticatedUser()).pipe(
      map(result => {
        this.loggedIn.next(true);
        return true;
      }),
      catchError(error => {
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  /** signout */
  public signOut() {
    fromPromise(this.amplifyService.auth().signOut()).subscribe(
      result => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }
}
