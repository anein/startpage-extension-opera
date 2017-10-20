import { BaseFilter } from "@/filters/base.filter";

export class YahooFilter extends BaseFilter {

  public readonly regexp =  /(?:(?:https?:\/\/(?:.*\.)?search.yahoo\..*\/search).*(?:\?p=([^&]+)).*)/;

  public readonly filter =  /(?:(?:https?:\/\/(?:.*\.)?search.yahoo\..*\/search).*)/;

}