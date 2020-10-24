// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Overview from "./views/Overview";
import FloodOverview from "./views/FloodOverview";
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
    path: "/flood",
    exact: true,
    layout: DefaultLayout,
    component: FloodOverview,
  }
];
