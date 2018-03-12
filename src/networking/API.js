const HOST = 'https://ico.91tianmi.com'
const openid = 123456

export default {
    fetchNewsList: {
        path: `${HOST}/tm_services/quant/queryNews`,
        params(page, size=30) {
            return {
                page: page, 
                page_size: size, 
                openid: openid
            }
        }
    },
    fetchNews: {
        path: `${HOST}/tm_services/quant/queryNewsById`,
        params(id) {
            return {id: id}
        }
    },
    createThread: {
        path: `${HOST}/tm_services/forum/postThreadInternal`,
        params(section, title, contents, name) {
            let data = {
                title: title,
                contents: contents,
                section: section
            }
            return { 
                name: name,
                thread: JSON.stringify(data).replace(/"/g, "'")
             }
        }
    },
    deleteThread: {
        path: `${HOST}/tm_services/forum/deleteThread`,
        params(id) {
            return {thread_id: id, openid: openid}
        }
    },
    createNews: {
        path: `${HOST}/tm_services/quant/postNews`,
        params(title, contents) {
            let data = {
                title: title,
                contents: contents
            }
            return {
                openid: openid,
                news: JSON.stringify(data).replace(/"/g, "'")
            }
        }  
    },
    updateNews: {
        path: `${HOST}/tm_services/quant/editNews`,
        params(id, contents) {
            let data = {
                title: '',
                contents: contents,
                id: id
            }
            return {
                openid: openid, 
                news: JSON.stringify(data).replace(/"/g, "'")
            }
        }
    },
    enableNews: {
        path: `${HOST}/tm_services/quant/setNewsStatus`,
        params(id, status, top, push=0) {
            return {
                id: id,
                openid: openid,  
                status: (status ? 10 : 0), 
                top: (top ? 1 : 0),
                ispublish: push,
            }
        }
    },
    fetchSectionList: {
        path: `${HOST}/tm_services/forum/getFavoriteCode`
    },
    fetchTheadList: {
        path: `${HOST}/tm_services/forum/queryThreads`,
        params(section, page, page_size=20) {
            return {section: section, page: page, page_size: page_size}
        }
    },
    enableNewsFilter: {
        path: `${HOST}/tm_services/quant/setNewsFilter`,
        params(status) {
            return {
                filter: status ? 'on' : 'off',
                openid: openid
            }
        }
    },
    fetchNewsFilterStatus: {
        path: `${HOST}/tm_services/quant/getNewsFilter`,
        params() {
            return { openid: openid }
        }
    },
    pushToMP: {
        path: `${HOST}/mp/push`,
        // path: `http://192.168.1.64:7777/push`,
        params(title, msg) {
            return {
                title: title,
                message: msg
            }
        }
    }
}