import { IFilter } from "@/filters/interfaces/filter.interface";

export class BaseFilter implements IFilter {

  public regexp: RegExp = /\w/;

  public filter: RegExp;

  public extract( data: string ): string[] {

    return data.split( this.regexp );

  }

  public test( data: string ): boolean {
    const r = new RegExp( this.filter );
    return r.test( data );

  }

}
