import { BaseFilter } from "@/filters/base.filter";

export class AmazonFilter extends BaseFilter {

  // https://redir.opera.com/amazon/?q={searchTerms}
  public readonly regexp = /(?:(?:https?:\/\/redir.opera\..*\/amazon\/).*(?:q=([^&]+)).*)/;

}