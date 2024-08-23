import LeftBar from "@/components/sheet/left-bar";
import { LayoutBaseProps } from "@/types/utils";

const LeftBarLayout: React.FC<any> = async ({ children }: LayoutBaseProps) => {
  return (
    <div className="flex w-full">
      <LeftBar />
      <main className="flex overflow-y-auto">{children}</main>
    </div>
  );
};

export default LeftBarLayout;
