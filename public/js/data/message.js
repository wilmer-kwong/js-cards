export async function getMessages() {
    let res = null
    await fetch('http://localhost:3000/messages').then((data) => {
        res = data.json();
    })
    .catch((err) => console.log(err));
    return res;
}

export async function postMessage(msg) {
    let postBody = {
        name: 'wil',
        message: msg,
    }
    let res = await fetch('http://localhost:3000/messages', {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        method: 'POST',
        body: JSON.stringify(postBody),
    })
    console.log(res);
    return res;
}