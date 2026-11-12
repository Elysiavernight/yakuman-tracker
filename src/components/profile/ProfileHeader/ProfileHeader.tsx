import type { User } from "../../../types";
import { Avatar, Icon } from "../../../components/index";

export function ProfileHeader({
  profile,
  own,
  onEdit,
  onLogout,
}: {
  profile: User;
  own: boolean;
  onEdit: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="rounded-[14px] border border-line bg-surface relative flex items-start justify-between gap-[30px] bg-[linear-gradient(110deg,#3b2c3d55,var(--color-surface))] p-[35px] light:bg-[linear-gradient(110deg,#e9d6e855,var(--color-surface))] max-[700px]:block max-[700px]:p-[25px] max-[430px]:px-5 max-[430px]:py-[23px]">
      <div className="grid min-w-0 flex-1 grid-cols-[100px_minmax(0,1fr)] items-center gap-x-[25px] gap-y-5 [&>[data-avatar]]:size-[100px] [&>[data-avatar]]:rounded-[28px] [&>[data-avatar]]:text-[30px] max-[700px]:grid-cols-[66px_minmax(0,1fr)] max-[700px]:gap-x-[17px] max-[700px]:[&>[data-avatar]]:size-[66px] max-[700px]:[&>[data-avatar]]:rounded-[21px] max-[700px]:[&>[data-avatar]]:text-xl max-[430px]:grid-cols-[53px_minmax(0,1fr)] max-[430px]:gap-x-[13px] max-[430px]:[&>[data-avatar]]:size-[53px] max-[430px]:[&>[data-avatar]]:rounded-[17px] max-[430px]:[&>[data-avatar]]:text-[17px]">
        <Avatar user={profile} large />
        <div className="w-fit min-w-0 max-w-full">
          <h1 className="text-[32px] leading-tight tracking-[-1px] [overflow-wrap:anywhere] max-[700px]:text-[25px] max-[430px]:text-[23px]">
            {profile.name}
          </h1>
          <span className="mt-2 block text-[13px] text-muted [overflow-wrap:anywhere]">
            @{profile.username}
            {profile.demo && (
              <span className="ml-[3px] rounded-[3px] border border-line bg-raised px-1 py-px text-[10px] font-normal text-muted">
                Sample player
              </span>
            )}
          </span>
          {profile.pronouns && (
            <p className="mt-1 text-sm leading-5 text-muted [overflow-wrap:anywhere]">
              {profile.pronouns}
            </p>
          )}
        </div>
        <div className="col-start-2 w-full max-w-[60ch] max-[700px]:col-span-2 max-[700px]:col-start-1">
          <h2 className="mb-3 text-lg font-semibold text-content">
            About Me :{" "}
          </h2>
          <div className="space-y-3 rounded-xl border border-line bg-surface/60 px-5 py-4 text-sm leading-7 text-muted [overflow-wrap:anywhere] max-[430px]:px-4 max-[430px]:py-3">
            {(profile.bio || "This user hasn't written their story")
              .trim()
              .split(/\n\s*\n/)
              .map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>
      {own && (
        <div className="grid shrink-0 grid-cols-1 gap-[7px] [&>button]:h-11 [&>button]:w-full max-[700px]:mt-[23px] max-[700px]:grid-cols-2 max-[700px]:gap-3">
          <button
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-line bg-raised text-content hover:bg-line"
            onClick={() => onEdit()}
          >
            <Icon name="edit" size={17} />
            Edit profile
          </button>
          <button
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-line bg-surface/60 px-[17px] py-2.5 text-xs text-accent hover:bg-raised max-[700px]:min-h-11"
            onClick={onLogout}
          >
            <Icon name="logout" size={16} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
