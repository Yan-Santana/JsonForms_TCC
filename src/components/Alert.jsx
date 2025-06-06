export const Alert = ({ type, messages, onClose }) => {
  if (!messages || messages.length === 0) return null;

  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';
  const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';

  return (
    <div className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded relative mb-4`} role="alert">
      {messages.map((message, index) => (
        <p key={index} className="text-sm">{message}</p>
      ))}
      {onClose && (
        <button
          className="absolute top-0 right-0 px-4 py-3"
          onClick={onClose}
        >
          <span className="text-xl">&times;</span>
        </button>
      )}
    </div>
  );
}; 