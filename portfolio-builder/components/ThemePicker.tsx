type Theme = {
  colorScheme: string;
  font: string;
};

export const COLOR_SCHEMES = [
  { id: "light", label: "Light", bg: "#ffffff", text: "#111111" },
  { id: "dark", label: "Dark", bg: "#111111", text: "#ffffff" },
  { id: "warm", label: "Warm", bg: "#fdf6ec", text: "#5c3a21" },
  { id: "cool", label: "Cool", bg: "#eef4fb", text: "#1c3d5a" },
];

export function getColorScheme(id: string) {
  return COLOR_SCHEMES.find((s) => s.id === id) ?? COLOR_SCHEMES[0];
}

const FONTS = [
  { id: "sans-serif", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "monospace", label: "Mono" },
];

export default function ThemePicker({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {COLOR_SCHEMES.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange({ ...theme, colorScheme: scheme.id })}
            title={scheme.label}
            style={{ backgroundColor: scheme.bg, color: scheme.text }}
            className={`h-7 w-7 rounded-full border-2 ${
              theme.colorScheme === scheme.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>
      <select
        value={theme.font}
        onChange={(e) => onChange({ ...theme, font: e.target.value })}
        className="rounded border p-1 text-sm"
      >
        {FONTS.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}