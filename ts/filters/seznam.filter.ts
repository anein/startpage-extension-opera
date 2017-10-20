import { BaseFilter } from "@/filters/base.filter";

export class SeznamFilter extends BaseFilter {

  // https://search.seznam.cz/?q={searchTerms}&sourceid=Opera_2
  public readonly regexp = /(?:(?:https?:\/\/search.seznam\..*\/).*(?:q=([^&]+)).*)/;

  public readonly filter = /(?:(?:https?:\/\/search.seznam\..*\/).*)/;
}