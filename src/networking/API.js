const HOST = 'https://ico.91tianmi.com/tm_services'

export default {
    fetchNewsList: {
        path: `${HOST}/quant/queryNews`,
        params(page, size=30, openid='123456') {
            return {page: page, page_size: size, openid: openid}
        }
    },
    fetchNews: {
        path: `${HOST}/quant/queryNewsById`,
        params(id) {
            return {id: id}
        }
    },
    createThread: `${HOST}/forum/postThreadInternal`,
    createNews: `${HOST}/quant/postNews`,
    updateNews: {
        path: `${HOST}/quant/editNews`,
        params(id, contents) {
            let data = {
                title: '',
                contents: contents,
                id: id
            }
            return {openid: 123456, news: JSON.stringify(data).replace(/"/g, "'")}
        }
    },
    enableNews: {
        path: `${HOST}/quant/setNewsStatus`,
        params(id, flags) {
            return {openid: 123456, id: id, status: flags}
        }
    },
    enableFilter: `${HOST}/quant/setNewsFilter`
}