import { BaseFilter } from "@/filters/base.filter";

export class GoogleFilter extends BaseFilter {

  public readonly regexp = /(?:(?:https?:\/\/(?:www\.)?google\..*\/search).*(?:q=([^&]+)).*)/;

}
