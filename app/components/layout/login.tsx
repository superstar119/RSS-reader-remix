import { FC, HTMLAttributes } from "react";

type LoginProps = HTMLAttributes<HTMLDivElement>;

const Login: FC<LoginProps> = ({ className, ...props }) => {
  return (
    <div className="w-max-[400px] mt-[110px] mx-auto flex flex-col gap-[40px] items-start"></div>
  );
};

export default Login;
