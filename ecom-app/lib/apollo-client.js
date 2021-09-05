 
import {ApolloClient, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {InMemoryCache} from "@apollo/client";

const apolloHttpLink = createHttpLink({
    uri: process.env.SITEADMIN_SERVER_URL || 'http://localhost:1337/graphql',
})

const apolloAuthContext = setContext(async (_, {headers}) => {
   // const jwt_token = localStorage.getItem('jwt_token')
   const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MTk5MjUzLCJleHAiOjE2MzE3OTEyNTN9.EXC6yqcQKKgUi4SZToCq3QfcajN_YsDax5BK927fACQ";
    return {
        headers: {
            ...headers,
            Authorization: jwt_token ? `Bearer ${jwt_token}` : ''
        },
    }
})

const client = new ApolloClient({
    link: apolloAuthContext.concat(apolloHttpLink),
    cache: new InMemoryCache(),
}) 

export default client;

