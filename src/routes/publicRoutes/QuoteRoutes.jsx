import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import QuoteSelect from '../../pages/quoteSelect/QuoteSelect'
import QuoteProductList from '../../components/quoteProdListing/QuoteProductList'
import GroupLifeQuote from '../../pages/groupLifeQuote/GroupLifeQuote'
import Quote from '../../pages/quote/Quote'

export const QuoteRoutes = [
    <Route
        key="quoteSelect"
        path='/quoteSelect'
        element={
            <Suspense fallback={<Loader />}>
                <QuoteSelect />
            </Suspense>
        }
    />,

    <Route
        key="quoteProducts"
        path='/quoteProducts'
        element={
            <Suspense fallback={<Loader />}>
                <QuoteProductList />
            </Suspense>
        }
    />,

    <Route
        key="quote"
        path='/quote'
        element={
            <Suspense fallback={<Loader />}>
                <Quote />
            </Suspense>
        }
    />,

    <Route
        key="groupLifeQuote"
        path='/groupLifeQuote'
        element={
            <Suspense fallback={<Loader />}>
                <GroupLifeQuote />
            </Suspense>
        }
    />
]