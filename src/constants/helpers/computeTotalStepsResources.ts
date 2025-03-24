import { FullStep } from '@constants';

export const computeTotalStepsResources = (
  fullCourseSteps: FullStep[]
): { steps: number; resources: number } => {
  let steps = 0;
  let resources = 0;

  for (let i = 0; i < fullCourseSteps?.length ?? 0; i += 1) {
    const fullStep = fullCourseSteps[i];

    steps += fullStep.subSteps?.length ?? 0;
    resources += fullStep.resources?.length ?? 0;

    const { steps: nestedSteps, resources: nestedResources } =
      computeTotalStepsResources(fullStep.subSteps);
    steps += nestedSteps;
    resources += nestedResources;
  }

  return { steps, resources };
};
