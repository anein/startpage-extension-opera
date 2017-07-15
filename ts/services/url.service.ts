import {ISPOptions} from "./interfaces/options.interface";

export class SPUrl {

    private static _instance: SPUrl;

    // got from https://www.startpage.com/eng/download-startpage-plugin.html
    private readonly _url: string = "https://www.startpage.com/do/search";

    //
    private readonly _suggest_url: string = "https://www.startpage.com/do/suggest";

    // available params of request
    private readonly _params = {cat: "web", language: "english", limit: 5, format: "json"};

    private constructor() {
        // I have nothing to say you.
    }

    public static get Instance() {
        return this._instance || (this._instance = new SPUrl());
    }

    /**
     * Creates a string ulr based on the POST flag.
     * If the post flag is set it builds a fake form with set options, generates a pseudo-url with calling the submit
     * method of the generated form.
     *
     * @param {string} text - query
     * @param {ISPOptions} options  - the options object.
     * @returns {string} url
     */
    public create(text: string, options: ISPOptions): string {

        // simple destructuring. Rrrr!
        const {limit, format, ...restParams} = this._params;

        const params = {query: text, prf: options.prf, ...restParams};

        if (options.post) {

            const formCallback = this.buildPostForm.toString().replace("{}", JSON.stringify(params)).replace("[url]", this._url); // tslint:disable-line

            return `javascript: (${formCallback})();`;

        } else {
            return this.buildGetUrl(this._url, params);
        }
    }

    /**
     * Creates a suggest url.
     *
     * @param {string} text
     * @returns {{url: string; params: {}}} url and params (needed for POST)
     */
    public suggest(text: string): { url: string, params: {} } {

        const {cat, ...restParams} = this._params;
        const params = {query: text, ...restParams};

        return {
            url: this.buildGetUrl(this._suggest_url, params),
            params
        };

    }

    /**
     * Builds a fake form for adding to a page.
     */
    private buildPostForm(): void {

        const form = document.createElement("form");
        form.method = "POST";
        form.id = "sp-" + Math.random().toString(16).slice(2);
        form.action = "[url]";

        const params = {};

        for (const key in params) {

            if (!params.hasOwnProperty(key)) {
                continue;
            }

            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();

    }

    /**
     *  Builds a "get" url. Helper method.
     *
     * @param {string} url - basic url
     * @param {Object} params - params
     * @returns {string}
     */
    private buildGetUrl(url: string, params: object): string {
        return `${url}?${this.serialise(params)}`;
    }

    /**
     * Converts a parameters object to a query string.
     *
     * @param params - url params
     * @returns {string} - query string (param=value)
     */
    private serialise(params): string {

        return Object.entries(params).filter(([key, value]) => value).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&"); // tslint:disable-line

    }

}
