
export default function ToggleSwitch({ enabled, onChange }: {
  enabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-[44px] h-[24px] rounded-full transition-colors duration-300 flex items-center px-1 cursor-pointer
        ${enabled ? 'bg-[#9671FF]' : 'bg-[#3a3a3a]'}`}
    >
      <div
        className={`w-[16px] h-[16px] rounded-full bg-white transition-transform duration-300 
          transform ${enabled ? 'translate-x-[20px]' : 'translate-x-0'}`}
      />
    </button>
  );
}
