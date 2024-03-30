import { BrowserRouter, Route, Routes } from "react-router-dom"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route exact path="" />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router