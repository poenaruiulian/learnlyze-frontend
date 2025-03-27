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
      error: 'The codes are not the same. Check your email for the code.',
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
      date: 'Started on ',
      published: 'Published on ',
      fromCommunity: 'From community',
    },
    step: {
      title: 'Read lesson',
      description: 'Press to discover all the information towards this lesson',
      resources: 'resources',
      subSteps: 'sub-steps',
      complete: 'Complete step',
      uncomplete: 'Uncomplete step',
      feedback: 'Give feedback',
      feedbackExplanation:
        'Create a set of sub-steps based on the given feedback.',
      feedbackDeeperExplanation:
        'You can provide optional feedback on the selected step to help refine its sub-steps for better learning. Sub-steps will be created regardless.',
      giveFeedback: 'Give your feedback towards this step',
      createSubSteps: 'Create sub-steps',
    },
    resource: {
      useful: 'I find this useful',
      useless: "I don't find this useful",
    },
    modal: {
      description: '🥳 Congrats on finishing the course! Next steps:',
      completeDescription:
        'By completing the course you will still have access to the information, but the course will be un-changeable.',
      complete: 'Complete',
      publishDescription:
        'By publishing the course you will share this knowledge to the community. The course will be automatically completed and un-changeable.',
      publish: 'Publish',
    },
    complete: 'Complete',
    publish: 'Publish',
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
      'Check the Discover page to explore new things to learn from the community. All the enrolled courses will then appear here.',
    noCoursesTitle: 'No generated courses',
    noCoursesDescription:
      'There are no new courses generated from which you can learn. Generated a new course and it will appear here.',
    noCompletedTitle: 'No course completed',
    noCompletedDescription:
      'Continue learning and all your completed courses will appear here. You can disable this section from settings.',
    noTopTitle: 'No top courses',
    noTopDescription: "Users haven't enrolled to any of your courses yet.",
    studying: 'Studying',
    completedCourses: 'Completed',
    newCourseTitle: 'Ready for something new?',
    newCourseDescription: 'Generate a new course and master your desired skill',
  },
  courseDetails: {
    stepsTitle: 'Steps:',
    stepsDescription:
      'These are the main steps of the course, press to reveal the sub-steps of the course',
    descriptionTitle: 'Description:',
    tagsTitle: 'Tags:',
    enroll: 'Enroll',
    cantEnrollToPublished: "You can't enroll to a course you've published.",
    cantEnrollToEnrolled:
      "You can't enroll to a course you've already enrolled.",
  },
  publishCourse: {
    title: 'Publishing course',
    titleDescription:
      "Customize the course title using the above input. After publishing you won't be able to change it again.",
    stepsTitle: 'Steps:',
    stepsDescription:
      'These are the main steps of the course, the sub-steps are not included here',
    descriptionTitle: 'Description:',
    descriptionDescription:
      "Give a short description about the course. After publishing you won't be able to change it again.",
    tagsTitle: 'Tags:',
    tagsDescription:
      "Select at least one tag that suits this course. After publishing you won't be able to change it again.",
    publish: 'Publish',
    descriptionNeeded: ' You need to provide a description for the course',
    tagsNeeded: 'You need to select at least one tag suiting this course',
    titleNeeded: "You can't leave the title empty.",
  },
  discover: {
    card: {
      noDescription: 'No description provided.',
      steps: 'steps',
    },
  },
  profile: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    apply: 'Apply changes',
    finishedCourse: {
      title: 'Finished courses',
      description:
        'By default we present the finished course on the home page, but you can choose to hide them',
    },
    haptics: {
      title: 'Haptics',
      description:
        'By default the haptics are enabled in the app, you can disable them using the toggle button ',
    },
    topCourses: 'Top courses',
    topCoursesDescription:
      'Below will appear the top courses based on the number of enrollments.',
  },
};
