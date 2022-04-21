import React, {Component} from "react";
import './home.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [{
                fileName: "xxx",
                url: "www.baidu.com"
            },
                {
                    fileName: "xxx",
                    url: "www.baidu.com"
                },
                {
                    fileName: "xxx",
                    url: "www.baidu.com"
                },
                {
                    fileName: "xxx",
                    url: "www.baidu.com"
                }]
        }
    }

    componentDidMount() {
        //TODO 请求后端 获取文件列表
    }

    download(url) {
        //TODO 选择下载的路径
    }

    render() {
        var list = this.state.fileList;
        return <div className={"home"}>
            <text className={"Header"}>Powered By ShowerBandV</text>
            <div className={"fileList"}>
                <div className={"fileBox"}>{list.map(item => {
                        return <li className={"file"} onClick={() => this.download(item.url)}>{item.fileName}</li>
                    }
                )}</div>
                <div className={"fileBox"}>{list.map(item => {
                        return <li className={"file"} onClick={() => this.download(item.url)}>{item.fileName}</li>
                    }
                )}</div>
                <div className={"fileBox"}>{list.map(item => {
                        return <li className={"file"} onClick={() => this.download(item.url)}>{item.fileName}</li>
                    }
                )}</div>
                <div className={"fileBox"}>{list.map(item => {
                        return <li className={"file"} onClick={() => this.download(item.url)}>{item.fileName}</li>
                    }
                )}</div>
            </div>


        </div>
    }

}

export default HomePage;
