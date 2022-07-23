

export class RequestHandler {
    #myHeaders = new Headers();

    constructor() {
        this.#myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    request(Data){
        return fetch("/api/", {
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

    //new version returns a promise
    APIRequest(Data){

        return new Promise((resolve, reject) => {

            fetch("api.php", {
                method: 'POST',
                headers: this.#myHeaders,
                mode: 'cors',
                cache: 'default',
                body: new URLSearchParams(Data)

            }).then(e => e.json()).then(response => {

                resolve(response);

            }).catch(e => {
                reject(e);
            })
        });

    }

}