<template>
    <f7-page hide-bars-on-scroll name="news" ptr @ptr:refresh="refresh" infinite :infinite-distance="50" :infinite-preloader="hasMore" @infinite="loadMore">
        <f7-navbar title="快讯管理">
            <f7-nav-right>
                <f7-link href="/news_create/">创建</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <!-- <f7-list media-list id="list-view">
            <f7-list-item media-item 
                v-for="news in results" 
                :key="news.id" :link="`/news_edit/${news.id}/`">
                <div slot="after-title"><p class="news-cell">{{news.contents}}</p></div>
            </f7-list-item>
        </f7-list> -->
        <news-content v-for="item in results" :key="item.id" :news="item"></news-content>
    </f7-page>
</template>

<script>
import { fetch } from '../networking/axios'
import API from '../networking/API'
import NewsContent from '../components/NewsContent.vue'

    export default {
        components: { NewsContent },
        data() {
            return {
                page: 1,
                total: 0,
                results: [],
                isLoading: false,
                app: null,
                intervalID: null
            }
        },
        mounted() {
            let self = this
            self.loadData()
            this.intervalID = setInterval(() => {
                self.loadData()
            }, 5000)
        },
        computed: {
            hasMore() {
                return this.page < this.total
            }
        },
        methods: {
            async loadData(page=1) {
                this.isLoading = true
                let resp = await fetch(API.fetchNewsList.path, API.fetchNewsList.params(page))
                if (resp.data.results) {
                    this.total = resp.data.page_Numbers
                    if (page == 1) {
                        this.results = resp.data.results
                    } else {
                        this.results = [...this.results, ...resp.data.results]
                    }  
                }
                this.isLoading = false
            },
            async refresh(_, done) {
                let self = this
                if(self.isLoading) return
                self.page = 1
                await self.loadData()
                done()
                
            },
            loadMore() {
                let self = this
                if(self.isLoading) return
                self.loadData(++self.page)
            }
        },
        on: {
            pageBeforeRemove() {
                const self = this;
                if (self.intervalID) clearInterval(self.intervalID)
            },
        }
    }
</script>

<style scoped lang="less">
.news-cell {
    margin: 2px 0px;
    color: gray;
    font-size: 15px;
    line-height: 21px;
    max-height: 63px;
    -webkit-line-clamp: 3;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis; 
}

#list-view {
    margin-top: 10px;
}



</style>