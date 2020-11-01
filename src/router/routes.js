import { LocalStorage } from "quasar";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/posters",
        name: "posters",
        component: () => import("pages/Posters.vue")
      },
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/albums",
        name: "albums",
        component: () => import("pages/Albums.vue")
      },
      {
        path: "/poster/:posterId",
        name: "edit-poster",
        component: () => import("components/PosterCreator.vue"),
        props: true,
        beforeEnter(to, from, next) {
          to.params.editPoster = JSON.parse(
            LocalStorage.getItem("posters")
          ).find(
            poster => Number(poster.posterId) === Number(to.params.posterId)
          );
          next();
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
