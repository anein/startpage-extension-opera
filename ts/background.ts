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
  const update = ( id: number, queryText: string, get: boolean = false ) => {

    chrome.tabs.update( id, {
      url: SP.query( decodeURIComponent( queryText ), get ),
    } );

  };

  // process url - extract query parameters from a given url.
  const processQuery = ( url: string ) => {

    const filter = new FilterController( SP.options.filters );

    const isMatched = filter.test( url );
    const queryText = filter.extract( url );

    return { isMatched, queryText };

  };

  /**
   * Adds the suggestion listener
   */
  chrome.omnibox.onInputChanged.addListener( ( queryText: string, suggest ) => {

    // displays query suggestions if the appropriate flag was set
    if (SP.options.suggestions) {
      SP.suggest( queryText ).then( ( response ) => suggest( response ) );
    }

  } );

  /**
   * Adds the OMNIBOX listener
   */
  chrome.omnibox.onInputEntered.addListener( ( queryText: string ) => {

    chrome.tabs.query( {
      active: true,
    }, ( tabs ) => {
      // using the "post" request method, our pseudo-url doesn't work at chrome://<page>
      update( tabs[0].id, queryText );

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
   * Adds the navigation listener to filters blocked search engines.
   */
  chrome.webNavigation.onBeforeNavigate.addListener( ( details ) => {

    const query = processQuery( details.url );

    if (query.isMatched && query.queryText !== null && details.frameId === 0) {
      update( details.tabId, query.queryText, true );
      return;
    }

  }, { url: SP.filterMatches } );

} );

