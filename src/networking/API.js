const HOST = 'https://YOUR_HOST/'
const openid = 000000

export default {
    fetchNewsList: {
        path: `${HOST}/YOUR_API_PATH`,
        params(page, size=30) {
            return {
                page: page, 
                page_size: size, 
                openid: openid
            }
        }
    },
    fetchNews: {
        path: `${HOST}/${HOST}/YOUR_API_PATH`,
        params(id) {
            return {id: id}
        }
    },
    createThread: {
        path: `${HOST}/YOUR_API_PATH`,
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
        path: `${HOST}/YOUR_API_PATH`,
        params(id) {
            return {thread_id: id, openid: openid}
        }
    },
    createNews: {
        path: `${HOST}/YOUR_API_PATH`,
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
        path: `${HOST}/YOUR_API_PATH`,
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
        path: `${HOST}/YOUR_API_PATH`,
        params(id, status, top, push=0) {
            return {
                id: id,
                openid: openid,  
                status: (status ? 10 : 0), 
                top: (top ? 1 : 0),
                ispublish: push,
            }
        },
        paramsQQ(id, top, push) {
            return {
                id: id,
                openid: openid,  
                status: 20, 
                top: (top ? 1 : 0),
                ispublish: push,
            }
        }
    },
    fetchSectionList: {
        path: `${HOST}/YOUR_API_PATH`
    },
    fetchTheadList: {
        path: `${HOST}/YOUR_API_PATH`,
        params(section, page, page_size=20) {
            return {section: section, page: page, page_size: page_size}
        }
    },
    enableNewsFilter: {
        path: `${HOST}/YOUR_API_PATH`,
        params(status) {
            return {
                filter: status ? 'on' : 'off',
                openid: openid
            }
        }
    },
    fetchNewsFilterStatus: {
        path: `${HOST}/YOUR_API_PATH`,
        params() {
            return { openid: openid }
        }
    },
    pushToMP: {
        path: `${HOST}/YOUR_API_PATH`,
        // path: `http://127.0.0.1:7778/push`,
        params(msg) {
            return {
                message: msg
            }
        }
    }
}