import { fn } from "@storybook/test";
import Button from "./index";
const meta = {
    title: "GlobalComponent/Button", // title -> Storybook Directory
    component: Button, // Storybook props -> 컴포넌트 Props
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: { onClick: fn(), size: "Small" },
};
export default meta;
// Button 컴포넌트의 스토리북(Storybook) 종류 선언
export const Active = {
    args: {
        primary: true,
        label: "Button",
        btnType: "Active",
    },
};
export const Social = {
    args: {
        primary: true,
        label: "Button",
        btnType: "Social",
    },
};
export const More = {
    args: {
        btnType: "More",
        label: "Button",
    },
};