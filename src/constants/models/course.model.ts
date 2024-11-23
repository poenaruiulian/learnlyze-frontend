export type CourseModel = {
  id: number;
  title: string;
  description?: string;
  tag?: string;
  startedAt: string;
  postedDate?: string;
};

export type FullCourseModel = {
  details: CourseModel;
  steps: {
    details: {
      id: number;
      parentStep?: number;
      priority: number;
      title: string;
      description: string;
    };
    resources: {
      id: number;
      title: string;
      external: string;
    }[];
  }[];
};
