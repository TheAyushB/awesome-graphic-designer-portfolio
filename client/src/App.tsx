import React, {useEffect, useState} from 'react';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Main} from "./components/Main/Main";
import {Router, Route, Switch,} from "react-router-dom";
import {About} from "./components/About/About";
import {WorkItemList} from "./components/WorkItemList/WorkItemList";
import NoMatch from "./components/NoMatch/NoMatch";
import {Helmet} from "react-helmet";
import {WorkItemModal} from "./components/WorkItemModal/WorkItemModal";
import {WorkItem} from "./components/WorkItemList/WorkItem/WorkItem";
import ReactGA from 'react-ga';
import {createBrowserHistory} from 'history';

export enum Category {
    ALL,
    VECTOR = 'vector',
    BITMAP = 'bitmap',
    LOGOTYPE = 'logo'
}

const history = createBrowserHistory();

history.listen(location => {
    ReactGA.set({page: location.pathname});
    ReactGA.pageview(location.pathname);
});

const App: React.FC = () => {
    const [workItems, setWorkItems] = useState<WorkItem[]>([]);

    useEffect(() => {
        fetch('/api/works')
            .then((response) => response.json())
            .then((data: WorkItem[]) => setWorkItems(data))
    }, []);

    useEffect(() => {
        initializeReactGA()
    }, []);

    const initializeReactGA = () => {
        ReactGA.initialize('UA-150290652-2');
    };

    const getWorkItemsByCategory = (currentCategory: Category) => {
        return workItems.filter(item => item.category === currentCategory);
    };

    return (
        <Router history={history}>
            <Helmet>
                <meta name="description" content="The work of Ukrainian artist, Vernal Bloom."/>
                <meta name="image" content="https://vernal-bloom.com/android-chrome-512x512.png"/>
            </Helmet>
            <Switch>
                <Route path={`/work/:fileName`}>
                    <WorkItemModal workItemList={workItems} currentCategory={Category.ALL}/>
                </Route>
                <Route path={`/vector/:fileName`}>
                    <WorkItemModal workItemList={getWorkItemsByCategory(Category.VECTOR)}
                                   currentCategory={Category.VECTOR}/>
                </Route>
                <Route path={`/bitmap/:fileName`}>
                    <WorkItemModal workItemList={getWorkItemsByCategory(Category.BITMAP)}
                                   currentCategory={Category.BITMAP}/>
                </Route>
                <Route path={`/logo/:fileName`}>
                    <WorkItemModal workItemList={getWorkItemsByCategory(Category.LOGOTYPE)}
                                   currentCategory={Category.LOGOTYPE}/>
                </Route>
                <Route>
                    <Header/>
                    <Main>
                        <Switch>
                            <Route exact path={`/`}>
                                <Helmet>
                                    <title>Vernal Bloom</title>
                                </Helmet>
                                <WorkItemList workItemList={workItems} currentCategory={Category.ALL}/>
                            </Route>
                            <Route exact path={`/vector-graphic`}>
                                <Helmet>
                                    <title>Vector Graphic ??? Vernal Bloom</title>
                                </Helmet>
                                <WorkItemList workItemList={getWorkItemsByCategory(Category.VECTOR)}
                                              currentCategory={Category.VECTOR}/>
                            </Route>
                            <Route exact path={`/bitmap-graphic`}>
                                <Helmet>
                                    <title>Bitmap Graphic ??? Vernal Bloom</title>
                                </Helmet>
                                <WorkItemList workItemList={getWorkItemsByCategory(Category.BITMAP)}
                                              currentCategory={Category.BITMAP}/>
                            </Route>
                            <Route exact path={`/logo`}>
                                <Helmet>
                                    <title>Logo ??? Vernal Bloom</title>
                                </Helmet>
                                <WorkItemList workItemList={getWorkItemsByCategory(Category.LOGOTYPE)}
                                              currentCategory={Category.LOGOTYPE}/>
                            </Route>
                            <Route path="/about">
                                <Helmet>
                                    <title>About ??? Vernal Bloom</title>
                                    <meta name="description" content="I am a Ukrainian artist based in Poland. I have been studying visual arts for 5 years and chose graphic
                design as my specialization. I started drawing in the early childhood as it was my biggest passion."/>
                                </Helmet>
                                <About/>
                            </Route>
                            <Route path="*">
                                <Helmet>
                                    <title>Page not found ??? Vernal Bloom</title>
                                </Helmet>
                                <NoMatch/>
                            </Route>
                        </Switch>
                    </Main>
                    <Footer/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
