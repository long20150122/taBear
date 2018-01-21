import App from "views/index/App.vue";
import homePage from "views/homePage/homePage";

// const homePage = r => require.ensure([], () => r(require("views/homePage/homePage")), "homePage")

export default [
    {
        path: "/",
        component: App,
        children: [
            {
                path: "",
                redirect: "/homePage"
            },

            {
                path: "/homePage",
                component: homePage
            }
        ]
    }
]