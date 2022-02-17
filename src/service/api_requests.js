

export async function post_request(url, body, authenticate){
    const basicHeaders = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    };
    console.log("authenticate", authenticate);

    const postRequestOption = {
        method: 'POST',
        headers: authenticate ? {
            ...basicHeaders,
            'Authorization' : 'Bearer ' + localStorage.getItem('authToken')
            }: basicHeaders,
        body: JSON.stringify(body)
    };
    console.log("Post basic", postRequestOption);
    let response =  await fetch(url,postRequestOption)
    console.log("Post Status: "+ url,response.status)
    let responseJson =  await response.json();
    return {
        status: response.status,
        body: responseJson
    };
}

export async function put_request(url, body, authenticate){
    const basicHeaders = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    };
    console.log("authenticate", authenticate);

    const putRequestOption = {
        method: 'put',
        headers: authenticate ? {
            ...basicHeaders,
            'Authorization' : 'Bearer ' + localStorage.getItem('authToken')
        }: basicHeaders,
        body: JSON.stringify(body)
    };
    console.log("put Basic", putRequestOption);
    let response =  await fetch(url,putRequestOption)
    console.log("put Status: "+ url,response.status)
    return {
        status: response.status
    };
}

export async function get_request(url,authenticate,noBasicHeaders = false){
    const basicHeaders = {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    };
    const getRequestOption = {
        method: 'GET',
        headers: authenticate ? {
            ...basicHeaders,
            'Authorization' : 'Bearer ' + localStorage.getItem('authToken')
        }: basicHeaders,
    };
    let response =  await fetch(url,getRequestOption)
    console.log("Get Status: "+ url,response.status);
    let responseJson =  await response.json();
    console.log("Get Value: "+ url, responseJson);
    return {
        status: response.status,
        body: responseJson
    };
}

