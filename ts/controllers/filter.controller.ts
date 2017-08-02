import { BaseFilter } from "@/filters/base.filter";
import { AvailableFilters } from "@/filters/filters";

export class FilterController {

  // active filters
  private filters: BaseFilter[] = [];

  /**
   * Creates an instance of FilterController, and sets active filters.
   *
   * @param {string[]} filters
   */
  public constructor( filters: string[] ) {

    for (const filter of filters) {

      if (filter in AvailableFilters) {
        this.filters.push( new AvailableFilters[filter]() );
      }

    }

  }

  /**
   * Processes data through active filters.
   *
   * @param {string} data
   * @returns {string|null} query string, otherwise null
   */
  public execute( data: string ): (string | null) {

    for (const filter of this.filters) {

      const query = filter.execute( data );

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

    return (this.filters.length > 0);

  }

}
