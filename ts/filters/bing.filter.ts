import { BaseFilter } from "@/filters/base.filter";

export class BingFilter extends BaseFilter {

  public readonly regexp = /(?:(?:https?:\/\/(?:www\.)?bing\..*\/search).*(?:q=([^&]+)).*)/;

  public readonly filter = /(?:(?:https?:\/\/(?:www\.)?bing\..*\/search).*)/;

}