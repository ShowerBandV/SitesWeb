import service from "./request"

export function login(username, password) {
    var user = {
        username: username,
        password: password
    }
    return service(
        {
            method: "POST",
            url: "/noAuth/login",
            data: JSON.stringify(user)
        }
    )
}

export function getFileList() {
    return service(
        {
            method: "GET",
            url: "/noAuth/fileList"
        }
    )
}

export function uploadFile(formdata) {
    var token = localStorage.getItem("token")
    if (token == "") {
        return {
            data: 403
        }
    }
    console.log(formdata);
    return service({
        method: 'POST',
        url: "/auth/upload",
        body: formdata,
        headers: {
            "Content-Type": "multipart/form-data;application/json;charset=UTF-8",
            "Authorization": token
        }
    })
}

export function downloadFile(fileName) {
    return service({
        method: 'GET',
        url: "/noAuth/download?fileName=" + fileName,
    })
}
