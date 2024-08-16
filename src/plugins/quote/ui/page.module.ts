import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@vendure/admin-ui/core";
import { QuoteComponent } from "./components/quote-component/page.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        pathMatch: "full",
        component: QuoteComponent,
        data: {
          breadcrumb: "Quotes",
          permissions: {
            allow: ["ReadQuotes", "DeleteQuotes", "UpdateQuotes"],
          },
        },
      },
    ]),
  ],
  declarations: [QuoteComponent],
})
export class PageModule {}
