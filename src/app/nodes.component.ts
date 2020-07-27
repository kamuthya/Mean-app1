//import { Component, OnInit } from '@angular/core';
import { NodeService } from './node.service';

import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, Output, EventEmitter} from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html', 
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NodesComponent implements OnInit {
  

  @Output() nodes: EventEmitter<any> = new EventEmitter<any>();
  @Output() links: EventEmitter<any> = new EventEmitter<any>();

 nodelist:any=[];
 linklist:any=[];

  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    this.getNodes();
    this.getLinks() ;
  }


  getNodes() {
    return this.nodeService.getNodes().subscribe(heroes => {
      this.nodelist
      = heroes;
    });
  }

  getLinks() {
    return this.nodeService.getLinks().subscribe(heroes => {
      this.linklist = heroes;
    });


  }

  passdata(){
    this.nodes.emit({x:this.nodelist,y:this.linklist});
  }

 


    


}
