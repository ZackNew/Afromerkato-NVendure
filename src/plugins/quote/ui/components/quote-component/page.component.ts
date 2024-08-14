import { Component, OnInit, ChangeDetectorRef ,ElementRef,ViewChild} from "@angular/core";
import { Apollo } from "apollo-angular";
import { Router } from "@angular/router";
import { jsPDF } from "jspdf";
import { take } from "rxjs/operators";
import {DELETE_QUOTE} from "../quote-resolver.graphql";
import { NotificationService, TypedBaseListComponent } from "@vendure/admin-ui/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Quote, QuotesDocument } from "../../gql/graphql";
import writeXlsxFile from "write-excel-file";

@Component({
  selector: "page",
  templateUrl: "page.component.html",
  styleUrls: ["./page.component.scss"],
})
export class QuoteComponent extends TypedBaseListComponent<typeof QuotesDocument, 'quotes'> implements OnInit {
  isModalVisible: boolean = false;
  public tabsVal: boolean[] = [false, false, false];
  quotes: any[] = [];
  currentPage: number = 1;
  columns: string[] = [
    "Subject",
    "Customer Phone",
    "Customer Email",
    "Status",
    "Type",
    "Is read?",
    "Created At",
    "Actions",
  ];
  itemsPerPage: number = 10;
  localStorageService: any;
  isOpen=true;
  serverPath: string;

   quote:any[]=[];
   quoteList:any[]=[];

  readonly filters = this.createFilterCollection()
  .addDateFilters()
  .addFilter({
    name:"fullName",
    label:"Customer Name",
     type:{kind:"text"},
     filterField:"fullName"
  })
  .connectToRoute(this.route);

  @ViewChild('myInput') myInputRef: ElementRef;
  constructor(
    private apollo: Apollo,
    router: Router,
    private notificationService: NotificationService,
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {
    super();
    super.configure({
        document: QuotesDocument,
        getItems: data => data.quotes,
        setVariables: (skip, take) => ({
            options: {
                skip,
                take,
                filter: {
            
                    ...this.filters.createFilterInput(),
                },
            },
        }),
        refreshListOnChanges: [this.filters.valueChanges],
    });
}
 

setPageNumber(event: number) {
    this.currentPage = event;
  }

  setItemsPerPage(event: number) {
    this.itemsPerPage = event;
  }

 async openFile(result: any) {
    const token = `bearer ${localStorage
      .getItem("vendure-auth-token")
      ?.replace('"', "")
      .replace('"', "")}`;
     const headers=new HttpHeaders().set(
      "authorization",token);
      this.httpClient
      .get(result.assetUrl,
      { 
        headers, responseType: "blob" as "json" }
        )
      .pipe(take(1)).subscribe(async (response: any) => {
        let dataType = response.type;
        let binaryData: any[] = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("target", "_blank");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        console.log(downloadLink)
        document.body.appendChild(downloadLink);
    
        downloadLink.click();
      });
  }

  showDetail(review:any){
  this.quote=[];
  this.cdr.detectChanges();  
  this.quote.push(review);
  this.cdr.detectChanges();
  console.log(this.quote);

  }

  async delete(id: any) {
    const result: any = await this.apollo
      .mutate({ mutation: DELETE_QUOTE, variables: {id} })
      .pipe(take(1))
      .toPromise();
    if (result.data.deleteQuote) {
      this.notificationService.success(`Quote successfully deleted`);
      this.cdr.detectChanges();
      this.ngOnInit()
    } else {
      this.notificationService.error(`Could not delete quote`);
      this.cdr.detectChanges();
    }
  }



  async generateXl(sale:any) {
       this.getValue(sale);
       this.cdr.detectChanges();
       if(this.quoteList.length!=0){
        var colNames: string[] = [
          "id",
          "createdAt",
          "fullName",
          "userEmail",
          "fromPhone",
          "product name",
          "sku"
        ];
    
        var values: Object[][] = [];
        var cols: Object[] = [];
        for (var col of colNames) {
          cols.push({
            value: col,
          });
        }
        values.push(cols);
        for(var _customer of this.quoteList) {
           var row: Object[] = [];
           for (var colName of colNames) {
             if(colName=="product name" || colName=="sku"){
                if(colName=="product name"){
                  row.push({
                    value: _customer.forProducts[0].name,
                  });
                }
                else if(colName=="sku"){
                  row.push({
                    value: _customer.forProducts[0].sku,
                  });
                }
             }else{
               row.push({
               value: _customer[colName],
             });
             }
            
           }
           values.push(row);
         }
        await writeXlsxFile(values, {
          fileName: `${new Date().toDateString()} quote.xlsx`,
        });
        
        this.cdr.detectChanges();

       }
    }


    getValue(sale:any) {
    const inputValue = this.myInputRef.nativeElement.value;
    sale.subscribe((sale) => {
      this.quoteList=sale;
      this.cdr.detectChanges();
    })
  }


}
