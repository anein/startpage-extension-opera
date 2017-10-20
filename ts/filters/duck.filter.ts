import { BaseFilter } from "@/filters/base.filter";

export class DuckFilter extends BaseFilter {

  public readonly regexp = /(?:(?:https?:\/\/(?:www\.)?duckduckgo\..*).*(?:q=([^&]+)).*)/;

  public readonly filter =  /(?:https?:\/\/(?:www\.)?duckduckgo\..*)/;

}