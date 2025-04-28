import ProgressSteps from "./components/StepsLine";
import { ScreenWrapper } from "../../components/Wrapper";
import { operationSteps } from "./components/Steps";
import { useStepOperationStore } from "../../store/StepOperationStore";

export function OperationScreen(){
  const {step} = useStepOperationStore();
  const currentStep = operationSteps[step];
  return(
    <ScreenWrapper style={{backgroundColor: '#F1F0F0FF'}}>
      <ProgressSteps currentStep={currentStep} />
      <currentStep.component/>
    </ScreenWrapper>
  );
}