

export class RequestHandler {
    #myHeaders = new Headers();

    constructor() {
        this.#myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    request(Data){
        return fetch("/cmd/", {
            method: 'POST',
            headers: this.#myHeaders,
            mode: 'cors',
            cache: 'default',
            body: new URLSearchParams(Data)

        })
    }


    requestPage(page){
        return fetch("/", {
            method: 'POST',
            headers: this.#myHeaders,
            mode: 'cors',
            cache: 'default',
            body: new URLSearchParams({
                module: "getPage",
                page: page
            })

        })
    }

}