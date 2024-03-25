import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((routes, index) => {
                        {
                            /* Kiểm tra có layout không Nếu routes.layout == true
                                thì sẽ lấy routes.layout được định nghĩa
                                không nó sẽ lấy DefaultLayout(Header và sidebar)
                                
                            */
                        }
                        const Page = routes.component;
                        let Layout = DefaultLayout;

                        if (routes.layout) {
                            Layout = routes.layout;
                        } else if (routes.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={routes.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
