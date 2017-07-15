//
import {SP} from "./services/sp.controller";

/**
 * Serves options.html
 */
class OptionsHandler {

    public static readonly OPTION_ID_PRF: string = "sp.prf";
    public static readonly OPTION_ID_POST: string = "sp.post";
    public static readonly OPTION_ID_SUGGESTIONS: string = "sp.suggestions";
    public static readonly OPTION_ID_SAVE: string = "sp.action.save";

    /**
     * Translates html files by yourself, because chrome.i18n doesn't support the same.
     */
    public static translate() {

        const elements = document.querySelectorAll("[data-translate]") as any;

        for (const element of elements) {
            element.textContent = chrome.i18n.getMessage(element.dataset.translate);
        }

    }

    /**
     * Loads and sets user options to the form.
     */
    public static load_handler(): void {

        SP.retrieveOptions().then((data) => {

            const [prfEl, postEl, sgEl] = OptionsHandler.getElements();

            prfEl.value = SP.options.prf;
            postEl.checked = SP.options.post;
            sgEl.checked = SP.options.suggestions;
        });
    }

    /**
     * Gets the form and saves its data.
     */
    public static save_handler(): void {

        const [prfEl, postEl, sgEl] = OptionsHandler.getElements();

        SP.saveOptions({prf: prfEl.value, post: (postEl.checked), suggestions: (sgEl.checked)});
    }

    /**
     * Sets necessary listeners for the options form.
     */
    public static setListeners() {

        document.addEventListener("DOMContentLoaded", OptionsHandler.load_handler);

        document.getElementById(OptionsHandler.OPTION_ID_SAVE).addEventListener("click",
            OptionsHandler.save_handler);

    }

    /**
     * Helper method taking all input elements of the form.
     *
     * @returns {[HTMLInputElement , HTMLInputElement , HTMLInputElement]}
     */
    public static getElements() {
        return [
            document.getElementById(OptionsHandler.OPTION_ID_PRF) as HTMLInputElement,
            document.getElementById(OptionsHandler.OPTION_ID_POST) as HTMLInputElement,
            document.getElementById(OptionsHandler.OPTION_ID_SUGGESTIONS) as HTMLInputElement
        ];
    }

}

// init!
(() => {
    OptionsHandler.translate();
    OptionsHandler.setListeners();
})();



