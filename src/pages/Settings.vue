<template>
    <f7-page name="settings">
        <f7-navbar title="设置"></f7-navbar>
        <f7-list style="margin:10px 0px" no-hairlines>
            <f7-list-item inline-label>
                <f7-label>快讯单一来源</f7-label>
                <f7-toggle :checked="filter" 
                    @change="filter = $event.target.checked"
                    color="blue">
                </f7-toggle>
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
    import { fetch } from '../networking/axios'
    import API from '../networking/API'

    export default {
        data() {
            return {
                filter: false,
                filterSync: false
            }
        },
        mounted() {
            this.loadSettings()
        },
        methods: {
            async loadSettings() {
                let resp = await fetch(API.fetchNewsFilterStatus.path, API.fetchNewsFilterStatus.params())
                this.filter = resp.data.filter == 'on'
            },
            async submit() {
                let resp = await fetch(API.enableNewsFilter.path, API.enableNewsFilter.params(this.filter))
                if(resp.data.code) {
                    this.showToastCenter('保存成功')
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
                    closeTimeout: 1500,
                    on: {
                        close: done ? done : null
                    }
                });
                self.toastCenter.open();
            },
        },
        // on: {
        //     pageBeforeOut() {
        //         const self = this;
        //         if (self.toastCenter) self.toastCenter.close();
        //     },
        //     pageBeforeRemove() {
        //         const self = this;
        //         if (self.toastCenter) self.toastCenter.destroy();
        //     },
        // }
    }
</script>

<style scoped>

</style>