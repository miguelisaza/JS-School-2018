# Week 2 Challenge
##Consume Marvel API making requests with Postman

According to [Marvel API Auth documentation](https://developer.marvel.com/documentation/authorization), Postman is treated like a server-side application, hence I had to provide three parameters: Timestamp, Public Key and MD5 hash of the concatenation of the both keys and the timestam in order to make successful requests.

It was necesary to create a Pre-request script in postman for doing the timestamps and computing the hash. 

```JavaScript
var date = new Date();

var timestamp = date.getTime().toString();
pm.globals.set("ts", timestamp);

var publicKey = "MyPublicKey";
pm.globals.set("apiKey", publicKey);

var privateKey = "MyPrivateKey";

var dHash = timestamp + privateKey + publicKey;

var hash = CryptoJS.MD5(dHash).toString();
pm.globals.set("hash", hash);
```

Here is a screenshot of the first request at https://gateway.marvel.com:443/v1/public/characters and the script done: 

![Screenshot1](https://raw.githubusercontent.com/miguelisaza/JS-School-2018/develop/week2/request1.png)


#### First task:
> Get information related to the list of characters of Cable & Deadpool (2004) #46 (Zombie Variant)

Made a request at http://gateway.marvel.com/v1/public/comics/21845/characters which is the endpoind related to **Cable & Deadpool (2004) #46 (Zombie Variant)** comic (endpoint found in first request).

21845 is the id of the comic. 

Screenshot:

![Screenshot2](https://raw.githubusercontent.com/miguelisaza/JS-School-2018/develop/week2/request2.png)

#### Second task:
> Get a list of all stories when Agent X (Nijo) appears

Made a request at http://gateway.marvel.com/v1/public/characters/1011031/stories which is the endpoind related to **Agent X (Nijo)** stories (endpoint found in first request).

1011031 is the id of Agent X 

Screenshot: 

![Screenshot3](https://raw.githubusercontent.com/miguelisaza/JS-School-2018/develop/week2/request3.png)

#### Third task:
> Generate JSON document with this information and push to github repo

Those JSON documents (**deadpoolAndCableCharacters.json** and **agentXStories.json**)  are in this directory.

