// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: `
//   <h1>
//     Angular Heroes
//   </h1>
//   <div class="header-bar"></div>
//   <app-nodes></app-nodes>
// `,
//   styles: []
// })
// export class AppComponent {
//   title = 'angular-cosmosdb';
// }
import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation,OnInit, Injectable } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import * as _ from 'lodash';
import { NodeService } from './node.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit{

  //private nodeService: NodeService;

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
  @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;

  public diagramNodeData:  Array<go.ObjectData> =[];
  public diagramLinkData:  Array<go.ObjectData> =[];

  //  diagramLinkData: any= [];
  //private cdr: ChangeDetectorRef;
  //private nodeService: NodeService;
  constructor(private cdr: ChangeDetectorRef) {}
  //constructor(private nodeService: NodeService) {}
  // this.getNodes();
  // this.getLinks() ;

 ngOnInit(){

  // this.getNodes();
  //  this.getLinks() ;





}

  // getNodes() {
  //   return this.nodeService.getNodes().subscribe(heroes => {
  //     this.diagramNodeData = heroes;
  //   });
  // }
  // getLinks() {
  //   return this.nodeService.getLinks().subscribe(heroes => {
  //     this.diagramLinkData = heroes;
  //   });
  // }

  parentmethod(x){
    this.diagramNodeData= x.x;
    this.diagramLinkData= x.y;
    console.log(x.x);
    console.log(this.diagramNodeData);
    console.log(x.y);
    console.log(this.diagramLinkData);
  }




 





  // initialize diagram / templates
  public initDiagram(): go.Diagram {

    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel,
        {
          linkToPortIdProperty: 'toPort',
          linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };


    const  itemTempl =
    $(go.Panel, "Horizontal",
      $(go.Shape,
        { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2 },
        new go.Binding("figure", "figure"),
        new go.Binding("fill", "color"),
        new go.Binding("stroke", "color")),
      $(go.TextBlock,
        {
          stroke: "#333333",
          font: "bold 14px sans-serif"
        },
        new go.Binding("text", "name"))
    );

    // define the Node template
    dia.nodeTemplate = 
    $(go.Node, "Auto",  // the whole node panel
          {
            selectionAdorned: true,
            resizable: true,
            layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides,
            isShadowed: true,
            shadowOffset: new go.Point(3, 3),
            shadowColor: "#C5C1AA"
          },
          new go.Binding("location", "location").makeTwoWay(),
          // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
          // clear out any desiredSize set by the ResizingTool.
          new go.Binding("desiredSize", "visible", function(v) { return new go.Size(NaN, NaN); }).ofObject("LIST"),
          // define the node's outer shape, which will surround the Table
          $(go.Shape, "RoundedRectangle",
            { fill: 'white', stroke: "#eeeeee", strokeWidth: 3 }),
          $(go.Panel, "Table",
            { margin: 8, stretch: go.GraphObject.Fill },
            $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
            // the table header
            $(go.TextBlock,
              {
                row: 0, alignment: go.Spot.Center,
                margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
                font: "bold 16px sans-serif"
              },
              new go.Binding("text", "key")),
            // the collapse/expand button
            $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
              { row: 0, alignment: go.Spot.TopRight }),
            // the list of Panels, each showing an attribute
            $(go.Panel, "Vertical",
              {
                name: "LIST",
                row: 1,
                padding: 3,
                alignment: go.Spot.TopLeft,
                defaultAlignment: go.Spot.Left,
                stretch: go.GraphObject.Horizontal,
                itemTemplate: itemTempl
              },
              new go.Binding("itemArray", "items"))
          )  // end Table Panel
        );  // end Node

    return dia;
  }



  public diagramNodeData1: Array<go.ObjectData> = [
    {
      key: "Products",
      items: [{ name: "ProductID", iskey: true, figure: "Decision", color: "red" },
      { name: "ProductName", iskey: false, figure: "Hexagon", color: "red" },
      { name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
      { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }]
    },
    {
      key: "Suppliers",
      items: [{ name: "SupplierID", iskey: true, figure: "Decision", color: "red" },
      { name: "CompanyName", iskey: false, figure: "Hexagon", color: "red" },
      { name: "ContactName", iskey: false, figure: "Hexagon", color: "red" },
      { name: "Address", iskey: false, figure: "Hexagon", color: "red" }]
    },
    {
      key: "Categories",
      items: [{ name: "CategoryID", iskey: true, figure: "Decision", color: "red" },
      { name: "CategoryName", iskey: false, figure: "Hexagon", color: "red" },
      { name: "Description", iskey: false, figure: "Hexagon", color: "red" },
      { name: "Picture", iskey: false, figure: "TriangleUp", color: "red" }]
    },
    {
      key: "Order Details",
      items: [{ name: "OrderID", iskey: true, figure: "Decision", color: "red" },
      { name: "ProductID", iskey: true, figure: "Decision", color: "red" },
      { name: "UnitPrice", iskey: false, figure: "Circle", color: "red" },
      { name: "Quantity", iskey: false, figure: "Circle", color: "red" },
      { name: "Discount", iskey: false, figure: "Circle", color: "red" }]
    },
  ];
  public diagramLinkData1: Array<go.ObjectData> = [
    { from: "Products", to: "Suppliers", text: "0..N", toText: "1" },
    { from: "Products", to: "Categories", text: "0..N", toText: "1" },
    { from: "Order Details", to: "Products", text: "0..N", toText: "1" }
  ];
  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;

  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange = function(changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = false;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  };



  public initPalette(): go.Palette {
    const $ = go.GraphObject.make;
    const palette = $(go.Palette);

    // define the Node template
    palette.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'RoundedRectangle',
          {
            stroke: null
          },
          new go.Binding('fill', 'color')
        ),
        $(go.TextBlock, { margin: 8 },
          new go.Binding('text', 'key'))
      );

    palette.model = $(go.GraphLinksModel,
      {
        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      });

    return palette;
  }
  public paletteNodeData: Array<go.ObjectData> = [
    { key: 'PaletteNode1', color: 'firebrick' },
    { key: 'PaletteNode2', color: 'blueviolet' }
  ];
  public paletteLinkData: Array<go.ObjectData> = [
    { from: 'PaletteNode1', to: 'PaletteNode2' }
  ];
  public paletteModelData = { prop: 'val' };
  public paletteDivClassName = 'myPaletteDiv';
  public paletteModelChange = function(changes: go.IncrementalData) {
    this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
    this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
    this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
  };

 // constructor(private cdr: ChangeDetectorRef) { }

  // Overview Component testing
  public oDivClassName = 'myOverviewDiv';
  public initOverview(): go.Overview {
    const $ = go.GraphObject.make;
    const overview = $(go.Overview);
    return overview;
  }
  public observedDiagram = null;

  // currently selected node; for inspector
  public selectedNode: go.Node | null = null;

  public ngAfterViewInit() {

    if (this.observedDiagram) return;
    this.observedDiagram = this.myDiagramComponent.diagram;
    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    const appComp: AppComponent = this;
    // listener for inspector
    this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function(e) {
      if (e.diagram.selection.count === 0) {
        appComp.selectedNode = null;
      }
      const node = e.diagram.selection.first();
      if (node instanceof go.Node) {
        appComp.selectedNode = node;
      } else {
        appComp.selectedNode = null;
      }
    });
  } // end ngAfterViewInit


  public handleInspectorChange(newNodeData) {
    const key = newNodeData.key;
    // find the entry in nodeDataArray with this key, replace it with newNodeData
    let index = null;
    for (let i = 0; i < this.diagramNodeData.length; i++) {
      const entry = this.diagramNodeData[i];
      if (entry.key && entry.key === key) {
        index = i;
      }
    }

    if (index >= 0) {
      // here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
      this.skipsDiagramUpdate = false;
      this.diagramNodeData[index] = _.cloneDeep(newNodeData);
    }
  }


}