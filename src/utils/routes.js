import NewsManager from '../pages/NewsManager.vue'
import ThreadsManager from '../pages/ThreadsManager.vue'
import EditNews from '../pages/EditNews.vue'
import App from '../App.vue'

export default [
    {
        path: '/',
        component: App,
    },
    {
        path: '/news/',
        component: NewsManager,
    },
    {
        path: '/threads/',
        component: ThreadsManager,
    },
    {
        path: '/news_edit/:id/',
        component: EditNews
    }
]