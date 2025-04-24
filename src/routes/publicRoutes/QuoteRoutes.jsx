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
                <QuoteSelect from='C' next='/quoteProducts' />
            </Suspense>
        }
    />,

    <Route
        key="quoteProducts"
        path='/quoteProducts'
        element={
            <Suspense fallback={<Loader />}>
                <QuoteProductList from='C' ILnext='/quote' GLnext='/groupLifeQuote' />
            </Suspense>
        }
    />,

    <Route
        key="quote"
        path='/quote'
        element={
            <Suspense fallback={<Loader />}>
                <Quote from='C' next='/login' back='/quoteSelect' />
            </Suspense>
        }
    />,

    <Route
        key="groupLifeQuote"
        path='/groupLifeQuote'
        element={
            <Suspense fallback={<Loader />}>
                <GroupLifeQuote from='C' next='/login' back='/quoteSelect' />
            </Suspense>
        }
    />
]