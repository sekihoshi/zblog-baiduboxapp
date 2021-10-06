// 详情页
const app = getApp();
import { getArticle } from '../../utils/request.js';
import { toDate } from '../../utils/tool.js';

Page({
    data: {
        id: '',
        // 地址
        result: {},
        // 内容
        followData: [{ type: 'primary' }],
        // 关注
        disabled: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // swan.login();
        this.data.id = options.id; // 接收id
        this.getArticle();
    },
    /**
     * 文章数据获取--数据调用加载
     */
    getArticle() {
        var _then = this;
        // 获取文章详情
        getArticle({
            id: _then.data.id
        }).then(res => {
            var article = res.result.Content;
            let result = res.result.Content
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, ' ')
                .replace(/&quot;/g, '"')
                .replace(/<section/g, '<div')
                .replace(/\/section>/g, '\div>')
                .replace(/pre class="prism-highlight/g, 'pre style="overflow: auto; padding-top: 22px; padding-bottom: 22px; color: #690; font-size: 14px; background-color: #f2f4fc; padding: 1em; margin: .5em 0;" class="prism-highlight" selectable="true" space="ensp"')
                .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;" ')

            res.result.PostTime = toDate(Number(res.result.PostTime) * 1000, 1);

            _then.setData({
                result: res.result,
                content: result
            });
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _then = this;
        getArticle({
            id: _then.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({ title: res.result.Title });
            res.result.PostTime = toDate(Number(res.result.PostTime) * 1000, 1);
            swan.setPageInfo({
                title: res.result.Title + ' - 彧繎博客',
                keywords: '彧繎博客，拿铁叔叔，前端狂魔',
                description: '彧繎博客（opssh.cn）创建于 2021年5月20日，博主：拿铁叔叔，九零后技术宅，前端狂魔',
                articleTitle: res.result.Title,
                releaseDate: res.result.PostTime,
                visit: {
                    pv: res.result.ViewNums
                }
            })
        })
    },

    oneTap: function (event) {
        swan.showToast({
            // 提示内容
            title: "百度认证：千粉作者，科技领域爱好者",
            icon: "none",
            duration: 2000,
            mask: false,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        requireDynamicLib('myDynamicLib').listenEvent();
    },

    clickComment(e) {
        swan.showToast({
            title: this.data.result.Title
        });
    },

    // bindfavorstatuschange 事件可能的应用场景：用户点击关注后，设置隐藏按钮
    favorstatuschange(e) {
        if (e.detail && e.detail.isFavor === true) {
            this.setData({ 'disabled': false });
        }
    },
    // 取消事件后提示信息
    statuschange(e) {
        if (e.detail && e.detail.isFavor === false) {
            setTimeout(() => {
                swan.showToast({
                    title: '我还他妈以为爱情来了！',
                    icon: 'none'
                });
            });
        }
    }
});