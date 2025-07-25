const RecordingIcon = ({ color = 'currentColor', size = 18, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      style={{ color:color }}
      {...props}
    >
      <path
        d="M9 16.9999C13.4183 16.9999 17 13.4182 17 8.99994C17 4.58166 13.4183 0.999939 9 0.999939C4.58173 0.999939 1 4.58166 1 8.99994C1 13.4182 4.58173 16.9999 9 16.9999Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default RecordingIcon;
