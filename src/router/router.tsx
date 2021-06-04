import {
    BrowserRouter,
    Switch,
    Route
  } from 'react-router-dom'
import Layout from '../components/Layout'
import SingleUser from '../components/singleUser'

export const Router = () => {

    const getSingleUser = ({ match }:any) => {
        console.log('match ', match)
        return <SingleUser id={match.params.id} />
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                    <Layout />
                </Route>
                <Route path='/user/:id' component={getSingleUser} />
            </Switch>
        </BrowserRouter>  
    )
}
