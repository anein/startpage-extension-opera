import { BaseFilter } from "@/filters/base.filter";

export class BaiduFilter extends BaseFilter {

  // https://www.baidu.com/baidu?wd={searchTerms}&tn=cnopera&ie=utf-8
  public readonly regexp = /(?:(?:https?:\/\/(?:www\.)?baidu\..*\/baidu).*(?:wd=([^&]+)).*)/;

}