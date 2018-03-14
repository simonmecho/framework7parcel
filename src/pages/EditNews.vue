<template>
    <f7-page name="news-edit" no-toolbar>
        <f7-navbar title="快讯编辑" back-link="   "></f7-navbar>
        <f7-list no-hairlines style="margin-top:10px">
            <f7-list-item>
                <f7-label style="font-size:17px">正文</f7-label>
                <f7-input id="contents" type="textarea" placeholder="请输入快讯内容" 
                    :value="news.contents" 
                    @input="contents = $event.target.value">
                </f7-input>
            </f7-list-item>
            <f7-list-item inline-label>
                <f7-label>置顶</f7-label>
                <!-- <f7-input type="password" placeholder="Your password" clear-button></f7-input> -->
                <f7-toggle :checked="isTop" 
                    @change="top = $event.target.checked"
                    color="blue">
                </f7-toggle>
            </f7-list-item>

            <f7-list-item inline-label>
                <f7-label>发布</f7-label>
                <!-- <f7-input type="password" placeholder="Your password" clear-button></f7-input> -->
                <f7-toggle :checked="isPublished" 
                    :disabled="isPublished" 
                    @change="published = $event.target.checked"
                    color="blue">
                </f7-toggle>
            </f7-list-item>

            <!-- <f7-list-item inline-label>
                <f7-label>推送到公众号</f7-label>
                <f7-toggle :checked="isPushed" 
                    :disabled="isPushed" 
                    @change="pushed = $event.target.checked">
                </f7-toggle>
            </f7-list-item> -->

            <!-- <f7-list-button style="height:50px;font-size:20px" color="blue">保存</f7-list-button> -->
        </f7-list>
        <f7-block>
            <div class="row">
                <div class="col-100">
                  <f7-button id="btnSearch" class="button button-big button-fill color-blue" @click="submit">保存</f7-button>
                </div>
              </div>
        </f7-block>
    </f7-page>
</template>

<script>
    import { fetch, post } from '../networking/axios'
    import API from '../networking/API'
    import * as utils from '../utils/filters'

    export default {
        data() {
            return {
                news: {},
                contents: '',
                pushed: false,
                published: false,
                top: false,
                app: null
            }
        },
        computed: {
            isPushed() {
                return utils.isNewsPushed(this.news.status)
            },
            isPublished() {
                return this.news.status === 10
            },
            isTop() {
                return this.news.top > 0
            },
            isStatusChanged() {
                return this.published || this.isTop != this.top
            },
            isContentChanged() {
                return this.news.contents.length != this.contents.length
            }
        },
        methods: {
            onF7Ready(f7) {
                this.app = f7
                this.loadData()
            },
            async loadData() {
                this.app.preloader.show()
                let resp = await fetch(API.fetchNews.path, this.$f7route.params)
                if (resp.data.results) {
                    this.news = resp.data.results[0]
                    this.contents = this.news.contents
                }
                this.app.preloader.hide()
            },
            async submit() {
                if (this.isContentChanged) {
                    let resp = await post(API.updateNews.path, API.updateNews.params(this.news.id, this.contents))
                    if (resp.data.code == "0") {
                        this.showToastCenter('保存失败')
                        return
                    }
                }
                if (this.isStatusChanged) {
                    let resp = await fetch(API.enableNews.path, API.enableNews.params(this.news.id, this.published, this.top))
                    if (resp.data.code == "0") {
                        this.showToastCenter('保存失败')
                        return
                    }
                }
                this.showToastCenter('保存成功', () => this.$f7router.back())
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
                // Destroy toasts when page removed
                if (self.toastCenter) self.toastCenter.destroy();
            },
        },
    }
</script>

<style scoped lang="less">
#contents {
    box-sizing: border-box;
    resize: none;
    line-height: 25px;
    overflow: visible;
    max-height: 15em;
    height: 10em;
    // min-height: 7em;
    color: gray;
    font-size: 16px;
    margin: 10px 5px;
    padding: 0px;
}
</style>