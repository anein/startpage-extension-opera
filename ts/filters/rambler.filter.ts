import { BaseFilter } from "@/filters/base.filter";

export class RamblerFilter extends BaseFilter {

  // https://redir.opera.com/search/rambler/?q={searchTerm}
  public readonly regexp = /(?:(?:https?:\/\/(?:(?:nova\.)?rambler\..*|(?:redir.opera.com))\/search).*(?:query|q=([^&]+)).*)/;

  public readonly filter = /(?:(?:https?:\/\/(?:(?:nova\.)?rambler\..*|(?:redir.opera.com))\/search).*)/;

}
