import { BaseFilter } from "@/filters/base.filter";

export class RamblerFilter extends BaseFilter {

  public readonly regexp = /(?:(?:https?:\/\/(?:nova\.)?rambler\..*\/search).*(?:query=([^&]+)).*)/;

}
