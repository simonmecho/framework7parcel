<template>
    <f7-card>
        <f7-card-content>
            <p class="date">发表于 {{news.created_datetime|datetime}}</p>
            <span style="color:gray">来源：{{news.source}}</span>
            <p class="content" :class="{collapse : !isExpanded}"
                @click="isExpanded = !isExpanded" v-html="news.contents">
            </p>
        </f7-card-content>
        <f7-card-footer>
            <f7-link @click="toggleNews()">{{isTop ? '取消置顶' : '置顶'}}</f7-link>
            <f7-link @click="publishNews">{{isPublished ? '取消发布' : '发布'}}</f7-link>
            <f7-link @click="pushNews" :class="{disabled : isPushed}" :no-link-class="isPushed">{{isPushed ? '已推送' : '推送'}}</f7-link>
            <f7-link :href="`/news_edit/${news.id}/`">编辑</f7-link>
        </f7-card-footer>
    </f7-card>
</template>

<script>
    import { fetch, post, put } from '../networking/axios'
    import API from '../networking/API'

    export default {
        props: ['news'],
        data() {
            return {
                isExpanded: false
            }
        },
        computed: {
            isTop: {
                get() {
                    return this.news.top > 0
                },
                set(value) {
                    this.news.top = value ? 1 : 0
                }
            },
            isPublished: {
                get() {
                    return this.news.status === 10
                },
                set(value) {
                    return this.news.status = value ? 10 : 0
                }
            },
            isPushed: {
                get() {
                    return this.news.isPublished > 0
                },
                set(value) {
                    this.news.isPublished = value ? 1 : 0
                }
            }
        },
        methods: {
            async toggleNews() {
                this.isTop = !this.isTop
                let resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, this.news.status, this.news.top))
                this.showToastCenter(resp.data.code ? '操作成功' : '操作失败')
            },
            async publishNews() {
                // if(this.isPublished) return
                this.isPublished = !this.isPublished
                let resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, this.news.status, this.news.top))
                this.showToastCenter(resp.data.code ? '操作成功' : '操作失败')
            },
            async pushNews() {
                if(this.isPushed) return
                if(this.$f7.preloader) this.$f7.preloader.show()
                // let start = this.news.contents.indexOf("【")
                // let end = this.news.contents.indexOf("】")
                // let title = '今日快讯'
                // let contents = this.news.contents
                // if(start >= 0 && end > 0) {
                //     title = this.news.contents.substring(start, end+1)
                //     contents = this.news.contents.substring(end+1)
                // }
                let resp = await put(API.pushToMP.path, API.pushToMP.params(this.news.contents))
                if(resp.status != 200) {
                    if(this.$f7.preloader) this.$f7.preloader.hide()
                    this.showToastCenter(resp.data)
                    return
                }
                this.isPushed = true
                resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, this.news.status, this.news.top, this.news.isPublished))
                if(this.$f7.preloader) this.$f7.preloader.hide()
                this.showToastCenter(resp.data.code ? '推送成功' : '推送失败')
            },
            showToastCenter(msg, done=null) {
                const self = this;
                if (self.toastCenter) {
                    self.toastCenter.close()
                    self.toastCenter.destroy()
                }
                self.toastCenter = this.$f7.toast.create({
                    text: msg,
                    position: 'center',
                    closeTimeout: 2000,
                    on: {
                        close: done ? done : null
                    }
                });
                self.toastCenter.open();
            },
        },
        on: {
            pageBeforeOut() {
                const self = this;
                if (self.toastCenter) self.toastCenter.close();
            },
            pageBeforeRemove() {
                const self = this;
                if (self.toastCenter) self.toastCenter.destroy();
            },
        },
    }
</script>

<style scoped lang="less">
    .content {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;   
        line-height:20px;   
        min-height:40px;
        font-size: 15px;
        margin: 5px 0px;
    }
    .date {
        font-size: 13px;
        color: gray;
    }
    .collapse {
        -webkit-line-clamp: 3;
    }
    .disabled {
        color: gray;
    }
</style>