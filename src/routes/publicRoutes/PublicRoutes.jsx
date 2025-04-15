import { AuthRoutes } from './AuthRoutes';
import { QuoteRoutes } from './QuoteRoutes'
import { ReportBuilderRoutes } from './ReportBuilderRoutes';
import { TestingRoutes } from './TestingRoutes';

export const publicRoutes = [
    ...AuthRoutes,
    ...QuoteRoutes,
    ...TestingRoutes,
    ...ReportBuilderRoutes
];