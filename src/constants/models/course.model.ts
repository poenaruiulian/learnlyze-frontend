export type CourseModel = {
  id: number;
  title: string;
  description?: string;
  tag?: string;
  startedAt: string;
  postedDate?: string;
  completedSteps: number;
  steps: number[];
  lastAccessed: string;
};

export type StepModel = {
  id: number;
  parentStep?: number;
  priority: number;
  title: string;
  description: string;
  completed: boolean;
  generation?: number;
  hasChild?: boolean;
};

export type ResourceModel = {
  id: number;
  title: string;
  external: string;
};

export type FullStep = {
  details: StepModel;
  resources: ResourceModel[];
  subSteps: FullStep[];
};

export type FullCourseModel = {
  details: CourseModel;
  steps: FullStep[];
};
