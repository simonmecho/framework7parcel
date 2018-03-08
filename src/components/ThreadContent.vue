<template>
    <f7-card :title="thread.title">
        <f7-card-content>
            <p class="date">发表于 {{thread.created_datetime|datetime}}</p>
            <p class="content" :class="{collapse : !isExpanded}"
                @click="isExpanded = !isExpanded">
                {{thread.contents}}
            </p>
        </f7-card-content>
        <f7-card-footer>
            <f7-link @click="openConfirm">删除</f7-link>
            <f7-link @click="isExpanded = !isExpanded">阅读全文</f7-link>
        </f7-card-footer>
    </f7-card>
</template>

<script>
    import { post } from '../networking/axios'
    import API from '../networking/API'

    export default {
        props: ['thread'],
        data() {
            return {
                isExpanded: false
            }
        },
        methods: {
            openConfirm() {
                let self = this
                this.$f7.dialog.confirm('确定要删除吗？', '温馨提示', () => {
                    self.deleteThread()
                });
            },
            async deleteThread() {
                let resp = await post(API.deleteThread.path, API.deleteThread.params(this.thread.id))
                if(resp.data.code) {
                    this.$emit("deleteThread",this.thread.id)
                }
                else {
                    this.showToastCenter('操作失败')
                }
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