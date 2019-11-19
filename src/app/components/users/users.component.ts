import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  rates: any[];
  loading = true;
  error: any;

  constructor(private _http: HttpClient, private apollo: Apollo) {
  }

  ngOnInit() {

    this.apollo.watchQuery({
      query: gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }`,
    }).valueChanges.subscribe( result => {
      console.log(result);
      this.rates = result.data && result.data.rates;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }
}
