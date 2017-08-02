import { ISPOptions } from "../interfaces/options.interface";

export class SPOptionsModel implements ISPOptions {

  public prf: string = "";
  public post: boolean = false;
  public suggestions: boolean = false;
  public filter: any[] = [];

  public constructor( item?: ISPOptions ) {

    if (Object.keys( item ).length !== 0) {
      this.prf = (item.prf.length >= 32) ? item.prf : "";
      this.post = item.post;
      this.suggestions = item.suggestions;
      this.filter = item.filter;
    }

  }

}