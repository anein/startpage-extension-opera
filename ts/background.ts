import { FilterController } from "@/controllers/filter.controller";
import { SP } from "./controllers/sp.controller";

/**
 * Get actual options, set listeners.
 */
SP.retrieveOptions().then( () => {

  // create helper
  const create = ( queryText: string ): void => {
    chrome.tabs.create( {
      url: SP.query( queryText )
    } );
  };

  // update helper
  const update = ( id: number, queryText: string ): void => {
    chrome.tabs.update( id, {
      url: SP.query( queryText ),
    } );
  };

  /**
   * Adds the suggestion listener
   */
  chrome.omnibox.onInputChanged.addListener( ( queryText: string, suggest ) => {

    // displays query suggestions if the appropriate flag was set
    if (SP.options.suggestions) {
      SP.suggest( queryText ).then( ( response ) => {
        suggest( response );
      } );
    }

  } );

  /**
   * Adds the OMNIBOX listener
   */
  chrome.omnibox.onInputEntered.addListener( ( queryText: string ) => {

    chrome.tabs.query( {
      active: true,
    }, ( tabs ) => {

      const { id, url } = tabs[0];

      // using the "post" request method, our pseudo-url doesn't work at chrome://<page>
      (!url && SP.options.post) ? create( queryText ) : update( id, queryText );

    } );

  } );

  /**
   * Adds the SP entity to the context menu.
   */
  chrome.contextMenus.create( {

    contexts: ["selection"],
    onclick : ( info ) => {

      const { selectionText } = info;

      // idiot proof
      if (selectionText.length > 0 && selectionText !== " ") {
        create( selectionText );
      }

    },
    title   : chrome.i18n.getMessage( "context_menu_search" )
  } );

  /**
   * Adds the Request listener.
   */
  chrome.webRequest.onBeforeRequest.addListener( ( details ) => {

    if (!SP.options.filter) {
      return { cancel: false };
    }

    const filter = new FilterController( SP.options.filter );
    const queryText = filter.execute( details.url );

    if (!queryText) {
      return { cancel: false };
    }

    return { redirectUrl: SP.query( decodeURIComponent( queryText ), true ) };

  }, { urls: ["<all_urls>"], types: ["main_frame"] }, ["blocking"] );
} );
