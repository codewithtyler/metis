import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../config/app';

interface PageTitleProps {
  title?: string;
  description?: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <Helmet>
      <title>{getPageTitle(title)}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}