import { ISPOptions } from "@/services/interfaces/options.interface";
import { SPOptionsModel } from "@/services/models/options.model";
import { SPOptions } from "@/services/options.service";
import { SPUrl } from "@/services/url.service";

export class SP {

  /**
   * Create a query url. If the flag "POST" was set it returns a link in form of javascript.
   *
   * @param {string} text - search text
   * @param {boolean} fget - create a get request by force
   * @returns {string} query link with the search query attributes.
   */
  public static query( text: string, fget: boolean = false ): string {
    const options = SPOptions.Instance.options;
    return SPUrl.Instance.create( text, options, fget );

  }

  /**
   * Fetches search suggestions.
   *
   * @param {string} text - query text
   * @returns {Promise<SuggestResult[]>} array of suggestions if suggestions were found.
   */
  public static suggest( text: string ): Promise<any> {
    // params needed for the post request.
    const { url, params } = SPUrl.Instance.suggest( text );

    return new Promise( ( resolve ) => {

      fetch( url ).then( ( response ) => {

        // get ReadableStream reader
        const reader = response.body.getReader();

        const decoder = new TextDecoder();

        reader.read().then( ( result: { done: boolean, value: Uint8Array } ) => {

          const spSuggests: string[] = JSON.parse( decoder.decode( result.value, { stream: !result.done } ) )[1];

          if (spSuggests.length > 0) {

            // cast the received array to an array of SuggestResult
            const suggests = [...spSuggests.map( ( value ) => ({ content: value, description: value }) )];

            resolve( suggests );

          }
        } );

      } ).catch( ( error ) => {
        // console.error(error);
      } );

    } );

  }

  /**
   * Retrieves actual user options from the storage.
   *
   * @returns {Promise<ISPOptions>} a user options.
   */
  public static retrieveOptions() {
    return SPOptions.Instance.load();
  }

  /**
   * Get the latest saved user options.
   *
   * @returns {ISPOptions} a user options.
   */
  public static get options() {
    return SPOptions.Instance.options;
  }

  /**
   * Saves a user options object.
   *
   * @param {ISPOptions} item - options object.
   */
  public static saveOptions( item: ISPOptions ): void {

    const options = new SPOptionsModel( item );

    SPOptions.Instance.save( options );
  }

}
