<template>
    <f7-page name="create_thread" no-toolbar>
        <f7-navbar title="创建帖子" back-link="  "></f7-navbar>
        <f7-list style="margin:0px 0px 10px" no-hairlines>
            <f7-list-item inline-label smart-select :smart-select-params="{openIn: $theme.ios ? 'sheet' : 'page'}">
                <f7-label>版块</f7-label>
                <select name="版块" placeholder="请选择..." @change="currentSection = $event.target.value">
                    <option v-for="section in sections" :key="section.id" :value="section.id" :selected="currentSection == section.id">
                        {{ section.zh_name || section.name }}
                    </option>
                </select>
            </f7-list-item>
            <f7-list-item>
                <f7-label>标题</f7-label>
                <f7-input type="text" placeholder="请输入标题" 
                    :value="title" 
                    @input="title = $event.target.value">
                </f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>昵称</f7-label>
                <f7-input type="text" placeholder="请输入昵称" 
                    :value="name" 
                    @input="name = $event.target.value">
                </f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>正文</f7-label>
                <f7-input id="contents" type="textarea" placeholder="请输入正文内容" 
                    :value="contents" 
                    @input="contents = $event.target.value">
                </f7-input>
            </f7-list-item>
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

    export default {
        data() {
            return {
                title: '',
                contents: '',
                name: '',
                currentSection: 1,
                sections: []
            }
        },
        mounted() {
            this.loadSections()
        },
        methods: {
            async loadSections() {
                let resp = await fetch(API.fetchSectionList.path)
                if(resp.data.data) {
                    this.sections = [...resp.data.data]
                }
            },
            async submit() {
                if(this.title.length == 0) {
                    this.showToastCenter("标题不能为空")
                    return
                }
                if(this.name.length == 0) {
                    this.showToastCenter("昵称不能为空")
                    return
                }
                if(this.contents.length == 0) {
                    this.showToastCenter("正文不能为空")
                    return
                }
                let resp = await post(API.createThread.path, 
                    API.createThread.params(this.currentSection, this.title, this.contents, this.name))
                if(resp.data.code) {
                    this.showToastCenter('创建成功', () => this.$f7router.back())
                }
                else {
                    this.showToastCenter('保存失败')
                }
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
        }
    }
</script>

<style scoped lang="less">
#contents {
    box-sizing: border-box;
    resize: none;
    line-height: 25px;
    overflow: visible;
    height: 10em;
    max-height: 15em;
    color: gray;
    font-size: 16px;
    margin: 10px 0px;
    padding: 0px;
}
</style>