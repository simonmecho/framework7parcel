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
    createThread: {
        path: `${HOST}/forum/postThreadInternal`,
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
        path: `${HOST}/forum/deleteThread`,
        params(id) {
            return {thread_id: id, openid: 123456}
        }
    },
    createNews: {
        path: `${HOST}/quant/postNews`,
        params(title, contents) {
            let data = {
                title: title,
                contents: contents
            }
            return {
                openid: 123456,
                news: JSON.stringify(data).replace(/"/g, "'")
            }
        }  
    },
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
        params(id, status, top) {
            let data = {
                id: id,
                openid: 123456,  
                status: (status ? 10 : 0), 
                top: (top ? 1 : 0),
                ispublish: 0
            }
            console.log(data)
            return data
        }
    },
    fetchSectionList: {
        path: `${HOST}/forum/getFavoriteCode`
    },
    fetchTheadList: {
        path: `${HOST}/forum/queryThreads`,
        params(section, page, page_size=20) {
            return {section: section, page: page, page_size: page_size}
        }
    },
    enableFilter: {
        path: `${HOST}/quant/setNewsFilter`,
        params(status) {
            return {filter: status}
        }
    },
}