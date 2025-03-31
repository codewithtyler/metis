export const APP_NAME = 'Metis';
export const APP_DESCRIPTION = 'Customer support and ticket management system';

// Helper function to generate page titles
export function getPageTitle(pageTitle?: string) {
  return pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
}