<template>
    <f7-page name="threads"
        hide-bars-on-scroll
        ptr @ptr:refresh="refresh" 
        infinite :infinite-distance="80"
        :infinite-preloader="hasMore" 
        @infinite="loadMore">
        <f7-navbar title="币吧管理">
            <f7-nav-right>
                <f7-link href="/thread_create/">创建</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list style="margin:0px 0px 10px" inline-labels no-hairlines>
            <f7-list-item>
                <f7-label>版块</f7-label>
                <f7-input type="select" :value="currentSection" placeholder="请选择..." @change="currentSection = $event.target.value">
                    <option v-for="section in sections" :key="section.id" :value="section.id">
                        {{ section.zh_name || section.name }}
                    </option>
                </f7-input>
            </f7-list-item>
        </f7-list>
        <thread-content v-for="item in results" :key="item.id" :thread="item" @deleteThread="refresh"></thread-content>
    </f7-page>
</template>

<script>
    import { fetch } from '../networking/axios'
    import API from '../networking/API'
    import ThreadContent from '../components/ThreadContent.vue'

    export default {
        data() {
            return {
                sections: [],
                currentSection: 0,
                page: 1,
                total: 0,
                results: [],
                isLoading: false,
            }
        },
        components: { ThreadContent },
        watch: {
            currentSection() {
                if(self.isLoading) return
                this.page = 1
                this.loadData()
            }
        },
        created() {
            this.loadSections()
            this.loadData()
        },
        computed: {
            hasMore() {
                return this.page < this.total
            }
        },
        methods: {
            async loadSections() {
                let resp = await fetch(API.fetchSectionList.path)
                if(resp.data.data) {
                    this.sections = [{id: 0, zh_name: "显示全部"}, ...resp.data.data]
                }
            },
            async loadData(page=1) {
                this.isLoading = true
                let resp = await fetch(API.fetchTheadList.path, API.fetchTheadList.params(this.currentSection, page))
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
                if(done) done()
            },
            loadMore() {
                let self = this
                if(self.isLoading) return
                self.loadData(++self.page)
            }
        }
    }
</script>

<style scoped>

</style>