export const strings = {
  onboarding: {
    firstSlide: {
      title: 'Dive into your learning adventure',
      description:
        'Simply describe what you would like to learn and customize your experience along the way',
    },
    secondSlide: {
      title: 'Easy access and an ease to use',
      description:
        'Your courses and access to community courses are on a touch away',
    },
    thirdSlide: {
      title: 'Shall we start your journey?',
      buttonTitle: 'Let’s do it',
    },
  },
  auth: {
    title: 'First, you’ll need an account',
    description:
      'Having a place dedicated for you and your courses without fear of losing your progress',
    buttonTitle: 'Submit',
    login: {
      title: 'Login',
      redirect: 'Don’t have an account?',
    },
    register: {
      title: 'Register',
      redirect: 'Already have an account?',
    },
    confirmMail: {
      title: 'Check your email',
      description:
        'Confirm your email by writing the code you received. Don’t worry, this step is required just on creating the account ',
    },
  },
  inputPlaceholder: {
    email: 'Email',
    password: 'Password',
    lastName: 'Last name',
    firstName: 'First name',
  },
  inputWarnings: {
    invalidEmail: "The email doesn't look right.",
    invalidPassword:
      'Your password must contain at least 8 characters, one uppercase letter, one number and one of these symbols (!@#$%^&*)',
  },
  modal: {
    closeButton: 'Close',
  },
  addNewCourse: {
    title: 'Ready to learn something new?',
    firstCourseDescription:
      'Start learning your first skill by describing what you would like to learn',
    generalDescription:
      'Start learning a new skill by describing what you would like to learn',
  },
  course: {
    header: {
      date: 'started on ',
    },
    step: {
      resources: 'resources',
      subSteps: 'sub-steps',
      complete: 'Complete step',
      uncomplete: 'Uncomplete step',
      feedback: 'Give feedback',
    },
    resource: {
      useful: 'I find this useful',
      useless: "I don't find this useful",
    },
  },
  loading: {
    message: 'We are prepping your course. Take your time and pop some bubbles',
  },
  home: {
    courses: 'Courses',
    savedFromCommunity: 'Saved from community',
    ofXSteps: (x: number) => `of ${x} steps`,
    completed: 'completed',
    noCommunityTitle: 'Looks that there are no community courses saved',
    noCommunityDescription:
      'Check the Discover page to explore new things to learn from the community',
  },
};
