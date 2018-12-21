export class Ajax{
    static request(method, url, headers, query, data){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            if(query){
                url += Ajax.queryString(query);
            }

            xhr.open(method, url, true);
            
            xhr.addEventListener("load", () => resolve(xhr));

            xhr.addEventListener("error", () => reject(new Error("HTTP error")));

            if(headers){
                for(let header in headers){
                    xhr.setRequestHeader(header, headers[header]);
                }
            }

            if(data){
                xhr.send(typeof data === "string" ? data : JSON.stringify(data));
            }
            else{
                xhr.send();
            }
        });
    }

    static get(url, headers, query){
       return Ajax.request("GET", url, headers, query, null);
    }

    static post(url, headers, data){
        return Ajax.request("POST", url, headers, null, data);
    }

    static queryString(dict){
        let qs = [];

        for(let param in dict){
            qs.push(`${param}=${dict[param]}`);
        }

        return `?${qs.join("&")}`;
    }
}