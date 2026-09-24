'use client';

import clsx from 'clsx';
import LoadingSkeleton from '@components/ui/loading-skeleton';
import { useStore } from '@store/useStore';
import { portfolioData } from '@utils/portfolio-data';
import { langSkillsImage, libFrameSkillsImage } from '@utils/skills-image';

/* Static stand-ins for the home sections. Each box repeats the real section's
   chrome - same paddings, borders, grid modes, and type heights - so the swap at
   hydration does not move anything below it. Counts are read from the same data
   the sections map over, so they stay in step when that data changes. */

const SKILL_GRID_CLASS =
  'grid grid-cols-4 gap-3 px-1 py-1 sm:grid-cols-6 sm:gap-4 md:grid-cols-6 lg:grid-cols-8';

// Body copy renders at leading-relaxed (1.625), so a line box is taller than its
// font size: 14px -> 23px, 16px -> 26px. Widths come from the call site.
const PARAGRAPH_LINE_CLASS = 'h-[23px] rounded-full md:h-[26px]';

// Card copy uses the plain M3 scale instead: description 12/18 -> 14/21, title
// 16/24 -> 22/33. Bars are line boxes, so they carry the same heights.
const CARD_DESCRIPTION_LINE_CLASS = 'h-[18px] rounded-full sm:h-[21px]';
const CARD_TITLE_CLASS = 'h-6 w-40 max-w-full rounded-full sm:h-[33px]';

const SKILL_GROUPS = [
  { id: 'main', titleWidth: 'w-16', skills: langSkillsImage },
  { id: 'lib-frame', titleWidth: 'w-44', skills: libFrameSkillsImage },
];

function SectionHeaderSkeleton({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <LoadingSkeleton
      className={clsx('ml-1 h-12 rounded-xl sm:ml-1.5', className)}
    />
  );
}

function ParagraphSkeleton({
  lines,
  narrowLines,
}: Readonly<{ lines: string[]; narrowLines?: number }>) {
  // Body copy wraps far more on narrow screens: the about paragraphs run to
  // seven lines at 390px and settle back to the three bars below by sm.
  // ponytail: 480-639px really wraps to five lines, so those widths carry two
  // bars of overshoot; split the tier if that band ever matters.
  const narrow = Math.max((narrowLines ?? lines.length) - lines.length, 0);

  return (
    <div className='flex flex-col'>
      {Array.from({ length: narrow }, (_, line) => (
        <LoadingSkeleton
          key={`narrow-${line}`}
          className={clsx(
            PARAGRAPH_LINE_CLASS,
            'sm:hidden',
            line === narrow - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
      {lines.map((width) => (
        <LoadingSkeleton
          key={width}
          className={clsx(PARAGRAPH_LINE_CLASS, width)}
        />
      ))}
    </div>
  );
}

function AboutSkeleton() {
  return (
    <section className='flex flex-col gap-y-6 border-y border-outline-variant py-8'>
      <SectionHeaderSkeleton className='w-28' />
      <div className='flex flex-col gap-y-4'>
        <ParagraphSkeleton
          lines={['w-full', 'w-11/12', 'w-3/4']}
          narrowLines={7}
        />
        <ParagraphSkeleton
          lines={['w-full', 'w-11/12', 'w-2/3']}
          narrowLines={7}
        />
      </div>
    </section>
  );
}

function SkillsSkeleton() {
  return (
    <section className='flex flex-col gap-y-8 border-b border-outline-variant py-8'>
      <SectionHeaderSkeleton className='w-32' />
      {SKILL_GROUPS.map((group) => (
        <div key={group.id} className='flex flex-col gap-y-4'>
          <LoadingSkeleton
            className={clsx('h-6 rounded-full', group.titleWidth)}
          />
          <div className={SKILL_GRID_CLASS}>
            {group.skills.map((skill) => (
              <LoadingSkeleton
                key={skill.id}
                className='h-14 w-14 rounded-2xl sm:h-16 sm:w-16 2xl:h-[4.5rem] 2xl:w-[4.5rem]'
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function PortfolioSkeleton() {
  return (
    <section className='flex flex-col gap-y-6 border-b border-outline-variant py-6'>
      <SectionHeaderSkeleton className='w-48' />
      <div className='mx-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {portfolioData.map((portfolio, index) => (
          <div
            key={portfolio.id}
            className={clsx(
              'overflow-hidden rounded-[24px] bg-surface-container',
              index === 0 && 'md:col-span-2'
            )}
          >
            <LoadingSkeleton className='aspect-[16/9] w-full' />
            <div className='p-6'>
              <LoadingSkeleton className={CARD_TITLE_CLASS} />
              <div className='mt-2 flex flex-col'>
                {Array.from(
                  // Descriptions wrap to four lines at 390px; from sm up the
                  // full-width card takes two and a half-width one takes three.
                  // The two shortest cards stop at three, which the one title
                  // that wraps to two lines offsets.
                  { length: 4 },
                  (_, line) => (
                    <LoadingSkeleton
                      key={line}
                      className={clsx(
                        CARD_DESCRIPTION_LINE_CLASS,
                        line === 0
                          ? 'w-full'
                          : line === 1
                            ? 'w-11/12'
                            : 'w-2/3',
                        line >= (index === 0 ? 2 : 3) && 'sm:hidden'
                      )}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <LoadingSkeleton className='mx-auto h-[63px] w-2/3 rounded-full md:h-6' />
    </section>
  );
}

function FooterSkeleton() {
  return (
    <footer className='flex w-full justify-end py-6'>
      <LoadingSkeleton className='h-5 w-52 max-w-full rounded-full md:h-6' />
    </footer>
  );
}

export default function HomeContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClient = useStore((state) => state.isClient);

  // Same hydration gate the hero uses: the server paints layout-matched
  // skeletons, and the client swaps in the real sections the moment the store
  // flips. The region stays busy-flagged for assistive tech until then.
  if (isClient) return <>{children}</>;

  return (
    <div aria-busy='true'>
      <AboutSkeleton />
      <SkillsSkeleton />
      <PortfolioSkeleton />
      <FooterSkeleton />
    </div>
  );
}
