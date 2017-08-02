import { IFilter } from "@/filters/interfaces/filter.interface";

export class BaseFilter implements IFilter {

  public regexp: RegExp = /\w/;

  public execute( data: string ): string[] {

    return data.split( this.regexp );

  }

}
