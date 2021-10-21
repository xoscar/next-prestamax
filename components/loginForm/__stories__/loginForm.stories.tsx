import LoginForm from '../index';
import { action } from '@storybook/addon-actions';

const Story = () => <LoginForm onSubmit={action('onSubmit')} />;

// Here we export a variant of the default template passing props
export const LoginFormStory = Story.bind({});

// Here we export the default component that
// will be used by Storybook to show it inside the sidebar
const LoginStoryTemplate = {
  title: 'LoginForm',
  component: LoginFormStory,
};

export default LoginStoryTemplate;
