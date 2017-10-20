import { AmazonFilter } from "@/filters/amazon.filter";
import { BaiduFilter } from "@/filters/baidu.filter";
import { BingFilter } from "@/filters/bing.filter";
import { DuckFilter } from "@/filters/duck.filter";
import { GoogleFilter } from "@/filters/google.filter";
import { RamblerFilter } from "@/filters/rambler.filter";
import { SeznamFilter } from "@/filters/seznam.filter";
import { YahooFilter } from "@/filters/yahoo.filter";
import { YandexFilter } from "@/filters/yandex.filter";

/**
 * List of available filters.
 */
export const AvailableFilters = {
  amazon  : AmazonFilter,
  baidu   : BaiduFilter,
  bing    : BingFilter,
  duckduck: DuckFilter,
  google  : GoogleFilter,
  rambler : RamblerFilter,
  seznam  : SeznamFilter,
  yahoo   : YahooFilter,
  yandex  : YandexFilter,
};
