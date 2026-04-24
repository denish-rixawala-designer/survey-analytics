const fs = require('fs');
let content = fs.readFileSync('c:\\\\Users\\\\DenishRixawala\\\\Downloads\\\\survey-company-analytics\\\\src\\\\Analytics.tsx', 'utf-8');

const reps = [
    {
        search: /<div style=\{\{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 \}\}>\s*<div>\s*<p style=\{\{ \.\.\.h3s, marginBottom: 4 \}\}>Quarter over quarter ” \{cq\.q\} vs \{pq\.q\}<\/p>\s*<p style=\{\{ \.\.\.subs, marginBottom: 0 \}\}>Current quarter vs previous quarter<\/p>\s*<\/div>\s*<span style=\{\{ \.\.\.pill\(T\.blue\), fontSize: 10, fontWeight: 700, padding: "4px 9px" \}\}>Performance Delta<\/span>\s*<\/div>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(59,130,246,0.25)" }}>
                            <Activity size={16} color="#ffffff" />
                        </div>
                        <div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Quarter over quarter ” {cq.q} vs {pq.q}</p>
                            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Current quarter vs previous quarter</p>
                        </div>
                    </div>
                    <span style={{ ...pill(T.blue), fontSize: 10, fontWeight: 700, padding: "4px 9px" }}>Performance Delta</span>
                </div>`
    },
    {
        search: /<p style=\{h3s\}>EXI history · last \{hist\.length\} quarters<\/p>\s*<p style=\{\{ \.\.\.subs, marginBottom: 14 \}\}>Dashed = \{benchmark\.label\} \(\{benchmark\.value\}\)<\/p>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(59,130,246,0.25)" }}>
                        <TrendingUp size={16} color="#ffffff" />
                    </div>
                    <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>EXI history · last {hist.length} quarters</p>
                        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                    </div>
                </div>`
    },
    {
        search: /<div style=\{\{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 \}\}>\s*<p style=\{h3s\}>Retention risk<\/p>\s*<span style=\{\{ \.\.\.pill\(T\.blue\), fontSize: 9, fontWeight: 700 \}\}>Dept deep dive<\/span>\s*<\/div>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(239,68,68,0.25)" }}>
                                <Users size={16} color="#ffffff" />
                            </div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Retention risk</p>
                        </div>
                        <span style={{ ...pill(T.blue), fontSize: 9, fontWeight: 700 }}>Dept deep dive</span>
                    </div>`
    },
    {
        search: /<div style=\{\{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 \}\}>\s*<p style=\{\{ \.\.\.h3s, marginBottom: 0 \}\}>Hotspot watch<\/p>\s*<span style=\{\{ \.\.\.pill\(T\.teal\), fontSize: 9, fontWeight: 700 \}\}>Live patterns<\/span>\s*<\/div>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(14,165,233,0.25)" }}>
                                <Target size={16} color="#ffffff" />
                            </div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Hotspot watch</p>
                        </div>
                        <span style={{ ...pill(T.teal), fontSize: 9, fontWeight: 700 }}>Live patterns</span>
                    </div>`
    },
    {
        search: /<div style=\{\{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 \}\}>\s*<p style=\{\{ \.\.\.h3s, marginBottom: 0 \}\}>Signal mix<\/p>\s*<span style=\{\{ \.\.\.pill\(T\.purple\), fontSize: 9, fontWeight: 700 \}\}>Source balance<\/span>\s*<\/div>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(168,85,247,0.25)" }}>
                                <Layers size={16} color="#ffffff" />
                            </div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Signal mix</p>
                        </div>
                        <span style={{ ...pill(T.purple), fontSize: 9, fontWeight: 700 }}>Source balance</span>
                    </div>`
    },
    {
        search: /<div style=\{\{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" \}\}>\s*<div>\s*<p style=\{\{ fontSize: 14, fontWeight: 700, color: "var\(--color-text-primary\)", margin: "0 0 2px", letterSpacing: "-\.01em" \}\}>\s*Score comparison · \{seg === "tenure" \? "Tenure bands" : "Role levels"\}\s*<\/p>\s*<p style=\{\{ fontSize: 12, color: "var\(--color-text-secondary\)", margin: 0 \}\}>\s*EXI, Comp & Benefits, and Wellbeing · dashed line = benchmark 72\s*<\/p>\s*<\/div>/g,
        replace: `<div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "18px 20px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(244,63,94,0.25)" }}>
                            <Layers size={16} color="#ffffff" />
                        </div>
                        <div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>
                                Score comparison · {seg === "tenure" ? "Tenure bands" : "Role levels"}
                            </p>
                            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>
                                EXI, Comp & Benefits, and Wellbeing · dashed line = benchmark 72
                            </p>
                        </div>
                    </div>`
    },
    {
        search: /<p style=\{h3s\}>Driver score trends · last \{hist\.length\} quarters<\/p>\s*<p style=\{\{ \.\.\.subs, marginBottom: 14 \}\}>Dashed = \{benchmark\.label\} \(\{benchmark\.value\}\)<\/p>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "none" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(245,158,11,0.25)" }}>
                            <Activity size={16} color="#ffffff" />
                        </div>
                        <div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Driver score trends · last {hist.length} quarters</p>
                            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                        </div>
                    </div>`
    },
    {
        search: /<p style=\{\{ \.\.\.h3s, marginBottom: 12 \}\}>Department EXI · \{cq\.q\}<\/p>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "none" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(6,182,212,0.25)" }}>
                            <Building2 size={16} color="#ffffff" />
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Department EXI · {cq.q}</p>
                    </div>`
    },
    {
        search: /<div style=\{\{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 \}\}>\s*<div><p style=\{\{ \.\.\.h3s, margin: 0 \}\}>Dept EXI trend<\/p><p style=\{subs\}>Last \{deptData\.length\} quarters<\/p><\/div>\s*<select/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(236,72,153,0.25)" }}>
                                    <TrendingUp size={16} color="#ffffff" />
                                </div>
                                <div>
                                    <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Dept EXI trend</p>
                                    <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Last {deptData.length} quarters</p>
                                </div>
                            </div>
                            <select`
    },
    {
        search: /<p style=\{h3s\}>Annual EXI · year over year<\/p>\s*<p style=\{\{ \.\.\.subs, marginBottom: 14 \}\}>Aggregated from quarterly data<\/p>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "none" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #10b981 0%, #047857 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(16,185,129,0.25)" }}>
                                <BarChart2 size={16} color="#ffffff" />
                            </div>
                            <div>
                                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Annual EXI · year over year</p>
                                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Aggregated from quarterly data</p>
                            </div>
                        </div>`
    },
    {
        search: /<p style=\{\{ \.\.\.h3s, marginBottom: 14 \}\}>Year-over-year comparison<\/p>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "none" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }}>
                                <Calendar size={16} color="#ffffff" />
                            </div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Year-over-year comparison</p>
                        </div>`
    },
    {
        search: /<div style=\{\{ display: "flex", alignItems: "center", justifyContent: "space-between" \}\}>\s*<div>\s*<p style=\{\{ fontSize: 18, fontWeight: 700, color: "var\(--color-text-primary\)", margin: 0 \}\}>\s*Driver Scores\s*<\/p>\s*<p style=\{\{ fontSize: 12, color: "var\(--color-text-tertiary\)", margin: "2px 0 0" \}\}>\s*\{cq\.q\} · \{DRIVERS\.length\} drivers · click any card to explore\s*<\/p>\s*<\/div>/g,
        replace: `<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 10px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(20,184,166,0.25)" }}>
                        <BarChart2 size={16} color="#ffffff" />
                    </div>
                    <div>
                        <p style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-.01em" }}>
                            Driver Scores
                        </p>
                        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>
                            {cq.q} · {DRIVERS.length} drivers · click any card to explore
                        </p>
                    </div>
                </div>`
    },
    {
        search: /<div style=\{\{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 \}\}>\s*<div>\s*<p style=\{h3s\}>Driver score history<\/p>\s*<p style=\{\{ \.\.\.subs, marginTop: 2 \}\}>Last \{hist\.length\} quarters · dashed = \{benchmark\.label\} \(\{benchmark\.value\}\)<\/p>\s*<\/div>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>
                            <TrendingUp size={16} color="#ffffff" />
                        </div>
                        <div>
                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Driver score history</p>
                            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Last {hist.length} quarters · dashed = {benchmark.label} ({benchmark.value})</p>
                        </div>
                    </div>`
    },
    {
        search: /<p style=\{h3s\}>Participation & health ” QoQ · \{cq\.q\} vs \{pq\.q\}<\/p>\s*<p style=\{\{ \.\.\.subs, marginBottom: 14 \}\}>Current quarter vs previous quarter<\/p>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(139,92,246,0.25)" }}>
                        <Activity size={16} color="#ffffff" />
                    </div>
                    <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Participation & health ” QoQ · {cq.q} vs {pq.q}</p>
                        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Current quarter vs previous quarter</p>
                    </div>
                </div>`
    },
    {
        search: /<p style=\{h3s\}>Annual EXI ” year over year<\/p>\s*<p style=\{\{ \.\.\.subs, marginBottom: 14 \}\}>Dashed = \{benchmark\.label\} \(\{benchmark\.value\}\)<\/p>/g,
        replace: `<div style={{ padding: "18px 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "none" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #10b981 0%, #047857 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(16,185,129,0.25)" }}>
                                <BarChart2 size={16} color="#ffffff" />
                            </div>
                            <div>
                                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", letterSpacing: "-.01em" }}>Annual EXI ” year over year</p>
                                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                            </div>
                        </div>`
    }
];

let modified = false;
reps.forEach((r, i) => {
    if (content.match(r.search)) {
        content = content.replace(r.search, r.replace);
        console.log('Replaced item ' + i);
        modified = true;
    } else {
        console.log('NOT FOUND item ' + i);
    }
});

if (modified) {
    fs.writeFileSync('c:\\\\Users\\\\DenishRixawala\\\\Downloads\\\\survey-company-analytics\\\\src\\\\Analytics.tsx', content);
    console.log('File written.');
}
