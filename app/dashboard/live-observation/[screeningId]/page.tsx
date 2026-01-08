import { ScreeningSessionView } from '@/components/templates/screening-session-view';

interface PageProps {
  params: Promise<{ screeningId: string }>;
}

export default async function LiveObservationPage({ params }: PageProps) {
  const { screeningId } = await params;
  return <ScreeningSessionView screeningId={screeningId} />;
}
