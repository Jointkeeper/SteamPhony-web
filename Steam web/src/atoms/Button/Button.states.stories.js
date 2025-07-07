import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './Button';
const meta = {
    title: 'Atoms/Button/StatesMatrix',
    parameters: {
        percy: { skip: false },
        a11y: { disable: true },
    },
};
export default meta;
const variants = [
    'trust',
    'action',
    'neutral',
];
export const Matrix = () => (_jsx("div", { className: "grid grid-cols-5 gap-4", children: variants.map((variant) => (_jsxs("div", { className: "flex flex-col items-start gap-2", children: [_jsx(Button, { variant: variant, children: "Default" }), _jsx(Button, { variant: variant, className: "hover:-translate-y-0.5", children: "Hover" }), _jsx(Button, { variant: variant, className: "active:scale-95", children: "Active" }), _jsx(Button, { variant: variant, disabled: true, children: "Disabled" }), _jsx(Button, { variant: variant, loading: true, children: "Loading" })] }, variant))) }));
