export type CourseModel = {
  id: number;
  title: string;
  description?: string;
  tag?: string;
  startedAt: string;
  postedDate?: string;
};

export type StepModel = {
  id: number;
  parentStep?: number;
  priority: number;
  title: string;
  description: string;
};

export type ResourceModel = {
  id: number;
  title: string;
  external: string;
};

export type FullStep = {
  details: StepModel;
  resources: ResourceModel[];
};

export type FullCourseModel = {
  details: CourseModel;
  steps: FullStep[];
};
