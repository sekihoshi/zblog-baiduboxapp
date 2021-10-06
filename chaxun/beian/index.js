var util = require('../../utils/txapi.js');

Page({
    data: {
        input: ''
    },

    onReady() { },

    InputInfo: function (e) {
        this.data.input = e.detail.value;
    },
    Tianapi: function () {
        var that = this;
        swan.request({
            url: util.TXAPI_BASE_URL + '/txapi/icp/',
            //天行数据备案信息查询接口
            data: {
                key: util.TXAPI_KEY,
                domain: this.data.input
            },
            success: function (res) {
                console.log(res.data);

                if (res.data.code == 200) {
                    that.setData({
                        title: res.data.newslist[0].main_name, //备案人
                        content: res.data.newslist[0].icp_number, //备案号
                        domain: res.data.newslist[0].domain, //备案域名
                        xingzhi: res.data.newslist[0].icp_type, //备案性质
                        name: res.data.newslist[0].icp_name, //备案名
                        time: res.data.newslist[0].update_time //备案通过时间
                    });
                } else {
                    console.error('错误码：' + res.data.code + '，错误提示：' + res.data.msg);
                    swan.showModal({
                        title: '备案信息查询',
                        content: res.data.msg,
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定');
                            }
                        }
                    });
                }
            },
            fail: function (err) {
                console.log(err);
            }
        });
    },

    onShow: function () {
        swan.setNavigationBarTitle({
            title: '备案信息查询'
        });

        swan.setPageInfo({
            title: '域名ICP备案信息查询',
            keywords: '域名ICP备案，域名备案查询，备案信息查询，ICP备案查询',
            description: '域名ICP备案查询工具，简单易用，直接输入域名即可查询到相应的备案号，备案单位，备案性质等相关信息，查询速度极速响应。',
            articleTitle: '域名ICP备案信息查询',
            releaseDate: '2021-09-14 19:52:04',
            image: 'https://opssh.cn/logo.png'

        })
    }
});