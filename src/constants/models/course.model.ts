export type CourseModel = {
  details: {
    id: number;
    title: string;
    description?: string;
    tag?: string;
    startedAt: string;
    postedDate?: string;
  };
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
