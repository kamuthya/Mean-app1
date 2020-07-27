import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Node } from './node';

import { Link } from './link';

const api = '/api';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getNodes() {
    return this.http.get<Array<Node>>(`${api}/heroes`);
  }

  getLinks() {
    return this.http.get<Array<Link>>(`${api}/links`);
  }

}
