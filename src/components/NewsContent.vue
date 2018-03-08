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
            <f7-link @click="toggleNews()">{{isTop ? '取消置顶' : '置顶'}}</f7-link>
            <f7-link @click="publishNews" :class="{disabled : isPublished}" :no-link-class="isPublished">{{isPublished ? '已发布' : '发布'}}</f7-link>
            <f7-link :href="`/news_edit/${news.id}/`">编辑</f7-link>
        </f7-card-footer>
    </f7-card>
</template>

<script>
    import { fetch, post } from '../networking/axios'
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
                    return this.news.status = 10
                }
            }
        },
        methods: {
            async toggleNews() {
                this.isTop = !this.isTop
                let resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, this.isPublished, this.isTop))
                this.showToastCenter(resp.data.code ? '操作成功' : '操作失败')
            },
            async publishNews() {
                if(this.isPublished) return
                this.isPublished = true
                let resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, true, this.isTop))
                this.showToastCenter(resp.data.code ? '发布成功' : '发布失败')
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