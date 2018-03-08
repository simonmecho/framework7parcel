import NewsManager from '../pages/NewsManager.vue'
import ThreadsManager from '../pages/ThreadsManager.vue'
import EditNews from '../pages/EditNews.vue'
import CreateThread from '../pages/CreateThreads.vue'
import CreateNews from '../pages/CreateNews.vue'
import App from '../App.vue'

export default [
    {
        path: '/',
        component: App,
    },
    // {
    //     path: '/news/',
    //     component: NewsManager,
    // },
    // {
    //     path: '/threads/',
    //     component: ThreadsManager,
    // },
    {
        path: '/news_edit/:id/',
        component: EditNews
    },
    {
        path: '/thread_create/',
        component: CreateThread
    },
    {
        path: '/news_create/',
        component: CreateNews
    }
]