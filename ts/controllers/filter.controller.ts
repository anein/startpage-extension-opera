import { BaseFilter } from "@/filters/base.filter";
import { AvailableFilters } from "@/filters/filters";

export class FilterController {

  // active filters
  private __filters: BaseFilter[] = [];

  /**
   * Creates an instance of FilterController, and sets active filters.
   *
   * @param {string[]} filters
   */
  public constructor( filters: string[] ) {

    for (const filter of filters) {

      if (filter in AvailableFilters) {
        this.__filters.push( new AvailableFilters[filter]() );
      }

    }

  }

  /**
   * Get filters.
   *
   * @returns {BaseFilter[]}
   */
  public get filters() {
    return this.__filters;
  }

  public test( url: string ) {

    for (const filter of this.__filters) {
      if (filter.test( url )) {
        return true;
      }
    }

    return false;
  }

  /**
   * Processes data through active filters.
   *
   * @param {string} data
   * @returns {string|null} query string, otherwise null
   */
  public extract( data: string ): (string | null) {

    for (const filter of this.__filters) {

      const query = filter.extract( data );

      // found one!
      if (query.length === 3) {
        return query[1].split( "+" ).join( " " );
      }

    }

    return null;

  }

  /**
   * Checks if there are active filters.
   */
  public hasFilters(): boolean {

    return (this.__filters.length > 0);

  }

}
