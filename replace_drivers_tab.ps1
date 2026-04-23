$file = "c:\Users\DenishRixawala\Downloads\survey-company-analytics\src\Analytics.tsx"
$lines = Get-Content $file
$before = $lines[0..1015]
$after  = $lines[1132..($lines.Count - 1)]

$newTab = @'
const DriversTab = ({ onSelect, selIdx, benchmark }) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("score");
    const cq = QH[selIdx];
    const hist = trendSlice(selIdx);
    const filtered = DRIVERS.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).slice().sort((a, b) => sort === "score" ? b.score - a.score : sort === "delta" ? b.delta - a.delta : a.name.localeCompare(b.name));

    /* SVG arc score ring */
    const ScoreRing = ({ score, size = 54 }) => {
        const r = (size - 8) / 2;
        const circ = 2 * Math.PI * r;
        const fill = (score / 100) * circ;
        const color = scoreBar(score);
        return (
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0, display: "block" }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-background-tertiary)" strokeWidth={5} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5}
                    strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.6s ease" }} />
            </svg>
        );
    };

    const DRIVER_LINES = [
        ["recognition", "Recognition", T.green.bar],
        ["manager", "Manager Eff.", T.amber.bar],
        ["comp", "Comp & Ben.", T.red.bar],
        ["wellbeing", "Wellbeing", T.blue.bar],
        ["belonging", "Belonging", T.purple.bar],
        ["leadership", "Leadership", "#2c57b8"],
        ["enablement", "Enablement", T.teal.bar],
    ];

    const accentOf = (hk) =>
        hk === "recognition" ? T.green :
            hk === "manager" ? T.amber :
                hk === "comp" ? T.red :
                    hk === "wellbeing" ? T.blue :
                        hk === "belonging" ? T.purple :
                            hk === "enablement" ? T.teal : T.gray;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* section header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>
                        Driver Scores
                    </p>
                    <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>
                        {cq.q} · {DRIVERS.length} drivers · click any card to explore
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {[{ color: T.green.bar, label: "Healthy ≥75" }, { color: T.amber.bar, label: "Watch 65–74" }, { color: T.red.bar, label: "Alert <65" }].map(({ color, label }) => (
                        <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--color-text-tertiary)" }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* driver cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12 }}>
                {DRIVERS.map(d => {
                    const accent = accentOf(d.hk);
                    const sc = scoreT(d.score);
                    const isAlert = d.score < 65;
                    const isPartial = d.tier !== "full";
                    return (
                        <div key={d.id} onClick={() => onSelect(d)}
                            style={{
                                position: "relative", overflow: "hidden",
                                borderRadius: "var(--border-radius-lg)",
                                background: "var(--color-background-primary)",
                                border: `1px solid ${isAlert ? T.red.border : isPartial ? T.amber.border : "var(--color-border-tertiary)"}`,
                                boxShadow: isAlert ? `0 0 0 1px ${T.red.border} inset, 0 8px 20px -12px ${T.red.bar}40` : "var(--shadow-soft)",
                                cursor: "pointer",
                                padding: "16px",
                                display: "flex", flexDirection: "column", gap: 12,
                                transition: "transform 160ms ease, box-shadow 160ms ease",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = isAlert ? `0 0 0 1px ${T.red.border} inset, 0 16px 28px -12px ${T.red.bar}55` : "0 16px 32px -16px rgba(20,46,120,0.28)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = isAlert ? `0 0 0 1px ${T.red.border} inset, 0 8px 20px -12px ${T.red.bar}40` : "var(--shadow-soft)";
                            }}
                        >
                            {/* colored top accent strip */}
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                background: `linear-gradient(90deg, ${sc.bar}, ${sc.bar}77)`,
                                borderRadius: "var(--border-radius-lg) var(--border-radius-lg) 0 0",
                            }} />

                            {/* icon + name + delta */}
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: accent.bg, border: `1px solid ${accent.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <d.Icon size={14} color={accent.text} />
                                    </div>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.3, letterSpacing: ".01em" }}>{d.name}</p>
                                </div>
                                <Delta v={d.delta} />
                            </div>

                            {/* ring + score + fav */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ position: "relative", flexShrink: 0, width: 54, height: 54 }}>
                                    <ScoreRing score={d.score} size={54} />
                                    <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: sc.text, letterSpacing: "-.5px" }}>{d.score}</span>
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>out of 100</p>
                                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", margin: "3px 0 0" }}>
                                        {d.fav}% <span style={{ fontSize: 10, fontWeight: 400, color: "var(--color-text-tertiary)" }}>favorable</span>
                                    </p>
                                    <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>{d.responses.toLocaleString()} resp.</p>
                                </div>
                            </div>

                            {/* mini progress bar vs benchmark */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                                    <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>vs benchmark {benchmark.value}</span>
                                    {isAlert && <span style={{ ...pill(T.red), fontSize: 9, padding: "1px 6px" }}>⚠ Alert</span>}
                                </div>
                                <div style={{ position: "relative", height: 5, borderRadius: 3, background: "var(--color-background-tertiary)" }}>
                                    <div style={{ height: 5, borderRadius: 3, width: `${d.score}%`, background: `linear-gradient(90deg,${sc.bar}bb,${sc.bar})` }} />
                                    <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: `${benchmark.value}%`, width: 2, height: 9, background: T.purple.bar, borderRadius: 1 }} />
                                </div>
                            </div>

                            {/* coverage + confidence */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                {isPartial
                                    ? <CovPill tier={d.tier} covered={d.coveredDepts.length} total={TOTAL} />
                                    : <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: 3 }}>
                                        <span style={{ color: T.green.bar }}>✓</span> Full coverage
                                    </span>}
                                <span style={{ ...pill(d.conf.label === "High" ? T.blue : d.conf.label === "Medium" ? T.purple : T.red), fontSize: 9 }}>
                                    {d.conf.label} conf.
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* trend chart */}
            <div style={{ ...card, paddingBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                        <p style={h3s}>Driver score history</p>
                        <p style={{ ...subs, marginTop: 2 }}>Last {hist.length} quarters · dashed = {benchmark.label} ({benchmark.value})</p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", maxWidth: 360, justifyContent: "flex-end" }}>
                        {DRIVER_LINES.map(([, l, c]) => (
                            <span key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "var(--color-text-secondary)" }}>
                                <span style={{ display: "inline-block", width: 20, height: 2.5, borderRadius: 2, background: c }} />
                                {l}
                            </span>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={hist} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                        <XAxis dataKey="q" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[45, 90]} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 3" strokeWidth={1} />
                        <Tooltip content={<TT />} />
                        {DRIVER_LINES.map(([k, l, c]) => (
                            <Line key={k} type="monotone" dataKey={k} name={l} stroke={c}
                                strokeWidth={2} dot={{ r: 3, fill: c, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* search & sort bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, background: "var(--color-background-primary)", border: "1px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "8px 14px", boxShadow: "inset 0 1px 2px rgba(0,0,0,.04)" }}>
                    <Search size={13} color="var(--color-text-tertiary)" />
                    <input className="analytics-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drivers…"
                        style={{ fontSize: 13, flex: 1, fontFamily: "inherit", border: "none", background: "transparent", outline: "none", boxShadow: "none", padding: "2px 0" }} />
                    {search && (
                        <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--color-text-tertiary)", display: "flex", alignItems: "center" }}>
                            <X size={13} />
                        </button>
                    )}
                </div>
                <div style={{ display: "flex", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 3, gap: 2 }}>
                    {[["score", "Score ↓"], ["delta", "Change"], ["name", "A–Z"]].map(([k, l]) => (
                        <button key={k} onClick={() => setSort(k)} style={{ fontSize: 11, padding: "6px 12px", borderRadius: "var(--border-radius-md)", fontWeight: sort === k ? 600 : 400, border: "none", cursor: "pointer", fontFamily: "inherit", background: sort === k ? "var(--color-background-primary)" : "transparent", color: sort === k ? "var(--color-primary)" : "var(--color-text-secondary)", boxShadow: sort === k ? "0 0 0 1px var(--color-border-secondary), 0 2px 6px -2px rgba(0,22,137,.12)" : "none", transition: "all 150ms ease" }}>{l}</button>
                    ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", whiteSpace: "nowrap", margin: 0 }}>
                    {filtered.length} of {DRIVERS.length}
                </p>
            </div>

            {/* driver list table */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 96px 72px 100px 90px 1fr 20px", gap: 12, padding: "9px 20px", background: "linear-gradient(180deg,#f6f9ff,#eef4ff)", borderBottom: "1px solid var(--color-border-tertiary)" }}>
                    {["", "Driver", "Score", "Change", "Confidence", "Coverage", "Progress", ""].map((h, i) => (
                        <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: ".05em", textTransform: "uppercase" }}>{h}</span>
                    ))}
                </div>
                {filtered.map((d, i) => {
                    const sc = scoreT(d.score);
                    return (
                        <div key={d.id} onClick={() => onSelect(d)}
                            style={{ display: "grid", gridTemplateColumns: "32px 1fr 96px 72px 100px 90px 1fr 20px", gap: 12, alignItems: "center", padding: "13px 20px", cursor: "pointer", borderBottom: i < filtered.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none", borderLeft: `3px solid ${d.tier !== "full" ? (d.tier === "partial" ? T.amber.bar : T.red.bar) : d.score < 65 ? T.red.bar : "transparent"}`, transition: "background 140ms ease" }}
                            onMouseEnter={e => e.currentTarget.style.background = "var(--color-background-secondary)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: covColor(d.tier).bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <d.Icon size={14} color={covColor(d.tier).text} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</p>
                                <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 1 }}>{d.responses.toLocaleString()} responses</p>
                            </div>
                            <div>
                                <p style={{ fontSize: 15, fontWeight: 700, color: sc.text, margin: 0 }}>{d.score}<span style={{ fontSize: 10, fontWeight: 400, color: "var(--color-text-tertiary)" }}>/100</span></p>
                                <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 1 }}>{d.fav}% fav.</p>
                            </div>
                            <div><Delta v={d.delta} /></div>
                            <div><span style={pill(d.conf.label === "High" ? T.blue : d.conf.label === "Medium" ? T.purple : T.red)}>{d.conf.label} · {d.conf.total}/{d.conf.max}</span></div>
                            <div><CovPill tier={d.tier} covered={d.coveredDepts.length} total={TOTAL} /></div>
                            <div style={{ position: "relative", height: 5, borderRadius: 3, background: "var(--color-background-secondary)" }}>
                                <div style={{ height: 5, borderRadius: 3, width: `${d.score}%`, background: `linear-gradient(90deg,${sc.bar}cc,${sc.bar})` }} />
                                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: `${benchmark.value}%`, width: 1.5, height: 9, background: T.purple.bar, borderRadius: 1 }} />
                            </div>
                            <ChevronRight size={13} color="var(--color-text-tertiary)" style={{ flexShrink: 0 }} />
                        </div>
                    );
                })}
                {filtered.length === 0 && (
                    <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 13 }}>
                        No drivers match "{search}"
                    </div>
                )}
            </div>
        </div>
    );
};
'@

$newLines = $newTab -split "`n" | ForEach-Object { $_.TrimEnd("`r") }
$combined = $before + $newLines + $after
$combined | Set-Content $file -Encoding UTF8
Write-Host "Done. Total lines: $($combined.Count)"
