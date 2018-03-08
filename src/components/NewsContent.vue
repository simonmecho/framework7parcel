<template>
    <f7-card>
        <f7-card-content>
            <p class="date">发表于 {{news.created_datetime|datetime}}</p>
            <p class="content" :class="{collapse : !isExpanded}"
                @click="isExpanded = !isExpanded">
                {{news.contents}}
            </p>
        </f7-card-content>
        <f7-card-footer>
            <f7-button @click="isTop = !isTop">{{isTop ? '取消置顶' : '置顶'}}</f7-button>
            <f7-button @click="publishNews" :active="!isPublished">{{isPublished ? '已发布' : '发布'}}</f7-button>
            <f7-button :href="`/news_edit/${news.id}/`">编辑</f7-button>
        </f7-card-footer>
    </f7-card>
</template>

<script>
    import { post } from '../networking/axios'
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
                    let top = value ? 1 : 0
                    if(top != this.news.top) {
                        this.news.top = top
                        this.topNews()
                    }
                }
            },
            isPublished() {
                return this.news.status == 10
            }
        },
        methods: {
            async topNews() {
                let resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, this.isPublished, this.isTop))
                this.showToastCenter(resp.data.code ? '置顶成功' : '置顶失败')
            },
            async publishNews() {
                if(this.isPublished) return
                console.log('hhhhh' + this.news.id)
                let resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, true, this.isTop))
                this.showToastCenter(resp.data.code ? '发布成功' : '发布失败')
            },
            showToastCenter(msg, done=null) {
                const self = this;
                if (!self.toastCenter) {
                    self.toastCenter = this.$f7.toast.create({
                        text: msg,
                        position: 'center',
                        closeTimeout: 2000,
                        on: {
                            close: done ? done : null
                        }
                    });
                }
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
    }
    .date {
        font-size: 13px;
        color: gray;
    }
    .collapse {
        -webkit-line-clamp: 3;
    }
</style>