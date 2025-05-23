import { AuthRoutes } from './AuthRoutes';
import { ReportBuilderRoutes } from './ReportBuilderRoutes';
import { TestingRoutes } from './TestingRoutes';

export const publicRoutes = [
    ...AuthRoutes,
    ...TestingRoutes,
    ...ReportBuilderRoutes
];