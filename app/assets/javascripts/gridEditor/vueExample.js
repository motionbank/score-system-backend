//= require vue/dist/vue

// http://youmightnotneedjquery.com/#ready
const domready = (fn) => {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

domready(() => {
    let vueTest = new Vue({
        el: '#vueExample',
        template: `
        <div>{{message}}</div>
    `,
        data : {
            message: 'My Message'
        },
        mounted () {
            console.log('mounted')
        }
    })
})