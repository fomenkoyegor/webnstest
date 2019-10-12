export class Ajax {
    constructor(url) {
        this.url = url;
    }

    async get(url=this.url){
        try {
            const res = await fetch(url);
            return res.json();
        }catch (e) {
            throw new Error(e)
        }
    }

    async post(url=this.url,data={}){
        const formData = new FormData;
        for(let key in data){
            formData.append(key,data[key])
        }
        try {
            const res = await fetch(url,{
                method:'POST',
                body: formData
            });
            return res.json();
        }catch (e) {
            throw new Error(e)
        }
    }

}
