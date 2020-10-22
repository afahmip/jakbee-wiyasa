// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Overview from "./views/Overview";
import ExampleData from './views/ExampleData';
import ExamplePosts from './views/ExamplePosts';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: Overview,
  },
  {
    path: "/payments",
    layout: DefaultLayout,
    component: ExampleData,
  },
  {
    path: '/example',
    layout: DefaultLayout,
    component: ExamplePosts,
  },
];
