import { Refine } from "@refinedev/core";
import { Layout, notificationProvider, ErrorComponent } from "@refinedev/antd";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";
// AntdInferencer pass appropriate  values to resources 


import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerBindings}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                resources={[
                    {
                        name: "blog_posts",
                        list: "/blog-posts",
                        show: "/blog-posts/show/:id",
                        create: "/blog-posts/create",
                        edit: "/blog-posts/edit/:id",
                    },
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={
                                <NavigateToResource resource="blog_posts" />
                            }
                        />
                        <Route path="blog-posts">
                            <Route index element={<AntdInferencer />} />
                            <Route
                                path="show/:id"
                                element={<AntdInferencer />}
                            />
                            <Route
                                path="edit/:id"
                                element={<AntdInferencer />}
                            />
                            <Route path="create" element={<AntdInferencer />} />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

export default App;


//CRUD pages will be generated for the blog_posts resource based on the API response.