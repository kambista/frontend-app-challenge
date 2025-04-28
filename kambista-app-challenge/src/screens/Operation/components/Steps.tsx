import { OperationForm } from "./OperationForm"
import { OperationProof } from "./OperationProof"
import { OperationTransfer } from "./OperationTransfer"

export type Step = {
  label: string,
  component?: React.ComponentType<any>,
  index: number,
}

export const operationSteps = [
  {
    label: "Completa",
    component: OperationForm,
    index: 0,
  },
  {
    label: "Transfiere",
    component: OperationTransfer,
    index: 1,
  },
  {
    label: "Constancia",
    component: OperationProof,
    index: 2,
  }
]