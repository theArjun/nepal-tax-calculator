interface TipProps {
  num: number;
  title: string;
  body: string;
}

export function Tip({ num, title, body }: TipProps) {
  return (
    <div className="tip">
      <span className="num">{num}</span>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
  );
}
