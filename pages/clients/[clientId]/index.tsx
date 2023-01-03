import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import ClientDetails from '../../../components/ClientDetails';
import ClientProvider from '../../../providers/Client/Client.provider';

const ClientDetailsPage: NextPage = () => {
  const router = useRouter();

  const { clientId = '' } = router.query;

  return (
    <ClientProvider clientId={clientId as string}>
      <ClientDetails />
    </ClientProvider>
  );
};

export default ClientDetailsPage;
