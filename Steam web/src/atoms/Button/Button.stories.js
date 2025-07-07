import { Button } from './Button';
const meta = {
    title: 'Atoms/Button',
    component: Button,
    args: {
        children: 'Click me',
    },
};
export default meta;
export const Neutral = {};
export const Trust = {
    args: { variant: 'trust' },
};
export const Action = {
    args: { variant: 'action' },
};
