import { Icon } from "../../../components/index";
import mahzonk from "../../../assets/mahzonk.jpg";

export function HomeHero({ addRecord }: { addRecord: () => void }) {
  return (
    <section className="relative mt-[18px] grid min-h-[350px] grid-cols-[1.15fr_1fr] items-center overflow-hidden border-b border-line min-[1400px]:min-h-[380px] max-[850px]:min-h-[330px] max-[700px]:mt-2 max-[700px]:min-h-[310px] max-[700px]:grid-cols-[1.3fr_1fr] max-[430px]:block max-[430px]:min-h-[300px] [&_h1]:mt-[19px] [&_h1]:text-[45px] [&_h1]:leading-[1.22] [&_h1]:font-[750] [&_h1]:tracking-[-2px] min-[1400px]:[&_h1]:text-[49px] max-[1050px]:[&_h1]:text-[39px] max-[850px]:[&_h1]:text-[35px] max-[700px]:[&_h1]:text-[33px] max-[430px]:[&_h1]:text-[31px] max-[430px]:[&_h1]:tracking-[-1.3px] max-[360px]:[&_h1]:text-[28px] [&_h1>span]:text-accent [&_p]:mt-[19px] [&_p]:text-sm [&_p]:leading-[1.9] [&_p]:text-muted max-[700px]:[&_p]:text-[13px] max-[430px]:[&_p]:relative max-[430px]:[&_p]:z-2 max-[430px]:[&_p]:w-[70%] max-[430px]:[&_p]:text-xs">
      <div className="relative z-2 pt-[30px] pb-[38px] max-[700px]:pb-[30px] max-[430px]:pt-[26px] max-[430px]:pb-[29px] max-[430px]:[&>div]:text-[8px] max-[430px]:[&>div]:tracking-[1px] max-[360px]:[&>div]:text-[7px]">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[1.8px] text-accent max-[700px]:tracking-[1px]"></div>
        <h1>
          Some hands happen
          <br />
          once in a <span>lifetime.</span>
        </h1>
        <p>
          A place to record your beautiful hands
          <br className="max-[700px]:hidden" /> Collect your yakuman. Celebrate
          them together.
        </p>
        <button
          className="mt-[23px] flex min-h-[34px] items-center gap-4 border-0 bg-transparent py-[7px] text-xs font-semibold text-accent hover:gap-[23px] max-[700px]:mt-[18px] max-[430px]:relative max-[430px]:z-2 max-[430px]:text-[11px]"
          onClick={addRecord}
        >
          Make this one a memory <Icon name="arrow" size={18} />
        </button>
      </div>
      <div
        className="relative isolate flex h-[330px] items-center justify-center before:absolute before:inset-10 before:-z-1 before:bg-[radial-gradient(ellipse,#a45f8230_0%,transparent_69%)] before:content-[''] light:before:bg-[radial-gradient(ellipse,#b86e9120_0%,transparent_69%)] min-[1400px]:h-[350px] max-[430px]:absolute max-[430px]:top-[135px] max-[430px]:right-0 max-[430px]:z-1 max-[430px]:h-auto max-[430px]:w-[29%]"
        aria-hidden="true"
      >
        <img
          src={mahzonk}
          alt=""
          width={225}
          height={225}
          className="aspect-square w-[225px] max-w-[85%] rounded-3xl object-cover shadow-xl max-[700px]:rounded-2xl max-[430px]:max-w-full"
        />
      </div>
    </section>
  );
}
