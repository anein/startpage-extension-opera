import {ISPOptions} from "./interfaces/options.interface";
import {SPOptionsModel} from "./models/options.model";

export class SPOptions {

    private static instance: SPOptions;

    // todo: As a variant,the options should be stored in the local storage, but probably some guys would gain access to it.
    // stores actual user's options to have access to them without using callbacks.
    private _options: ISPOptions = null;

    private constructor() {

        // init storage listener
        chrome.storage.onChanged.addListener((item) => {

            if (item.post) {
                this._options.post = item.post.newValue;
            }

            if (item.prf) {
                this._options.prf = item.prf.newValue;
            }

            if (item.suggestions) {
                this._options.suggestions = item.suggestions.newValue;
            }

        });

    }

    public static get Instance(): SPOptions {
        return this.instance || (this.instance = new SPOptions());
    }

    /**
     * Gets the saved options object.
     *
     * @returns {ISPOptions} options
     */
    public get options(): ISPOptions {
        return this._options;
    }

    /**
     * Retrieves th options from the chrome storage.
     *
     * @returns {Promise<ISPOptions>}
     */
    public load(): Promise<ISPOptions> {

        return new Promise((resolve) => {

            chrome.storage.sync.get((item: ISPOptions) => {

                this._options = new SPOptionsModel(item);
                resolve(this._options);
            });

        });
    }

    /**
     * Puts the options object to the chrome storage, and updates the local object.
     *
     * @param {ISPOptions} item
     */
    public save(item: ISPOptions): void {

        this._options = item;

        chrome.storage.sync.set(item);

    }

}
