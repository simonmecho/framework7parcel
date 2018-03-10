import NewsManager from '../pages/NewsManager.vue'
import ThreadsManager from '../pages/ThreadsManager.vue'
import Settings from '../pages/Settings.vue'
import EditNews from '../pages/EditNews.vue'
import CreateThread from '../pages/CreateThreads.vue'
import CreateNews from '../pages/CreateNews.vue'
import App from '../App.vue'

export default [
    {
        path: '/',
        component: App,
        // tabs: [
        //     {
        //         path: '/',
        //         tab: '#tab-1',
        //         component: NewsManager
        //     },
        //     {
        //         path: '/news/',
        //         tab: '#tab-1',
        //         component: ThreadsManager
        //     },
        //     {
        //         path: '/threads/',
        //         tab: '#tab-2',
        //         component: NewsManager
        //     },
        //     {
        //         path: '/settings/',
        //         tab: '#tab-3',
        //         component: Settings
        //     }
        // ]
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