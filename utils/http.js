const host = 'https://opssh.cn'; // 接口網址

const domain = '/os_wxapi/v1/'; // 接口同樣的路徑區域

// 接口地址拼接
const urls = {
  home: host + domain + 'home',
  // 获取首頁接口
  article: host + domain + 'article',
  // 获取文章详情接口
  search: host + domain + 'search',
  // 搜索
  navList: host + domain + 'list',
  // 查询分类的文章
  navPage: host + domain + 'page',
  // 查询分类的文章
};
// 接口输出
export default urls;