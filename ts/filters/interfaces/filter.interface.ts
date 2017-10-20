/**
 * Filter interface.
 */
export interface IFilter {

  /**
   * Extracts a query string from the url.
   *
   * @param {string} data
   * @returns {string[]}
   */
  extract: ( data: string ) => string[];

  /**
   * Tests a given URL.
   *
   * @param {string} url
   * @returns {boolean}
   */
  test: ( url: string ) => boolean;

}
