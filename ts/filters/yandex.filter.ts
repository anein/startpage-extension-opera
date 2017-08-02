import { BaseFilter } from "@/filters/base.filter";

export class YandexFilter extends BaseFilter {

  public readonly regexp = /(?:(?:https?:\/\/(?:www\.)?yandex\..*\/yandsearch).*(?:text=([^&]+)).*)/;

}