import React, {Component} from "react";
import './home.css';
import {downloadFile, getFileList, login, uploadFile} from "../request/api";
import {Upload, message, Button} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            username: "",
            password: "",
            file: null
        }
        this.fileChange = this.fileChange.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentDidMount() {
        //TODO 请求后端 获取文件列表
        getFileList().then(res => {
            var list = JSON.parse(res.data.Data)
            this.setState({
                fileList: list
            })
        })
    }

    download(url) {
        //TODO 选择下载的路径
        downloadFile(url).then(res => {
            console.log(res)
            const blob = new Blob([res.data]);
            const fileName = url;
            const linkNode = document.createElement('a');
            linkNode.download = fileName; //a标签的download属性规定下载文件的名称
            linkNode.style.display = 'none';
            linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
            document.body.appendChild(linkNode);
            linkNode.click();  //模拟在按钮上的一次鼠标单击
            URL.revokeObjectURL(linkNode.href); // 释放URL 对象
            document.body.removeChild(linkNode);
        })
    }

    fileChange({target}) {
        console.log(target.files);
        console.log(target.files[0]);
        this.setState({
            file: target.files[0]
        });
    }

    upload() {
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('token', 'xxxxxxx');
        console.log(formData.get("file"));
        uploadFile(formData)
    }

    loginButton(username, password) {
        login(username, password).then(res => {
            localStorage.setItem("token", res.data.Data)
            alert("登录成功！")
        })
    }

    changeUsername(ev) {
        this.setState({
            username: ev.target.value
        }, () => {
            // console.log(this.state.username)
        });
    }

    changePassword(ev) {
        this.setState({
            password: ev.target.value
        }, () => {
            // console.log(this.state.password)
        });
    }

    render() {
        var list = this.state.fileList;
        const {Dragger} = Upload;
        var token = localStorage.getItem("token")
        const props = {
            name: 'file',
            multiple: true,
            // action: 'http://1.14.92.147:8091/auth/upload',
            headers: {"Authorization": token},
            onChange(info) {
                console.log(info.file.status)
                const {status} = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onDrop(e) {
                console.log('Dropped files', e.dataTransfer.files);
            },
            customRequest(options) {
                console.log(options);
                let params = new FormData();
                params.append("file", options.file);
                // this.props.ajax.post(`/admin/sys-file/upload`, params, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
                //
                //     options.onSuccess(res, options.file);
                // })
                uploadFile(params).then(res => {
                    console.log(res)
                })
            }

        };

        return <div className={"home"}>
            <text className={"Header"}>Powered By ShowerBandV</text>

            {/*<input id="uploadF" type="file" onChange={this.upload} name={""} value={""}/>*/}
            {/*<form encType="multipart/form-data" method="post">*/}
            {/*    <input type="file" name="uploadFile"/>*/}
            {/*</form>*/}
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
            <div>
                <div>
                    <text>用户名：</text>
                    <input type='text' onChange={(event) => this.changeUsername(event)}/>
                </div>
                <div>
                    <text>密码：</text>
                    <input type='text' onChange={(event) => this.changePassword(event)}/>
                </div>
                <button onClick={() => this.loginButton(this.state.username, this.state.password)}>登录</button>
            </div>
            <div className={"fileList"}>
                <div className={"fileBox"}>{list.map(item => {
                        return <li className={"file"} onClick={() => this.download(item)}>{item}</li>
                    }
                )}
                </div>
            </div>


        </div>
    }

}

export default HomePage;
