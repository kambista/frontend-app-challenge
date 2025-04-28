import { OnboardingForm } from '../../components/forms/OnboardingForm';
import { ScreenContainer } from '../../components/layout/ScreenContainer';

export const OnboardingScreen = () => {
  return (
    <ScreenContainer scrollable={true}>
      <OnboardingForm />
    </ScreenContainer>
  );
};
