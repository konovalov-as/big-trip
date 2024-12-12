function LockIcon(): JSX.Element {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="-0.5 0 25 25">
        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M16.5 9.32h-9a4.27 4.27 0 0 0-4.5 4v5a4.27 4.27 0 0 0 4.5 4h9a4.27 4.27 0 0 0 4.5-4v-5a4.27 4.27 0 0 0-4.5-4Z"/>
        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M17 9.32v-2a5 5 0 0 0-10 0v2"/>
      </svg>
    </>
  );
}

export {
  LockIcon,
}