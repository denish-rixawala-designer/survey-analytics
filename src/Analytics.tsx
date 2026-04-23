/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, RadarChart,
    PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell,
    ComposedChart, Area
} from "recharts";
import {
    TrendingUp, Users, BarChart2, Activity, Zap, ChevronRight,
    Shield, Heart, Star, Award, Briefcase, Lock, Compass,
    DollarSign, Sparkles, X, Calendar, ChevronDown, ChevronUp,
    Layers, Search, Target, HelpCircle, LayoutDashboard,
    Info, ArrowUp, ArrowDown, Minus, AlertTriangle,
    EyeOff, Plus, Edit2, Trash2, User, Building2,
    CheckSquare, RefreshCw, Circle
} from "lucide-react";

/* ”” tokens ”” */
const T = {
    green: { bg: "#eaf8eb", text: "#0b6d1a", border: "#c8e8cd", bar: "#00a811" },
    amber: { bg: "#fff7e8", text: "#8f6500", border: "#f1deaf", bar: "#f4b400" },
    red: { bg: "#ffedf0", text: "#a92234", border: "#f5c9d0", bar: "#ff2741" },
    blue: { bg: "#e8ecff", text: "#001689", border: "#c7cff3", bar: "#001689" },
    gray: { bg: "#f3f4f7", text: "#4f5f7f", border: "#dde2eb", bar: "#888888" },
    purple: { bg: "#f1ebff", text: "#4f2f8e", border: "#d9ccf6", bar: "#5f35a1" },
    teal: { bg: "#e9f8fa", text: "#0f6d78", border: "#c8e8ed", bar: "#2ea5b4" },
};
const card = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,252,255,0.96) 100%)",
    border: "1px solid var(--color-border-tertiary)",
    boxShadow: "var(--shadow-soft)",
    borderRadius: "var(--border-radius-lg)",
    padding: 20,
};
const surf = {
    background: "var(--color-background-primary)",
    border: "1px solid var(--color-border-tertiary)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.88)",
    borderRadius: "var(--border-radius-md)",
    padding: "16px 16px"
};
const lbl = { fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase" };
const h3s = { fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" };
const subs = { fontSize: 12, color: "var(--color-text-secondary)", margin: 0 };
const pill = (c: { bg: string; text: string; border: string }) => ({ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600, letterSpacing: ".01em", background: c.bg, color: c.text, border: `0.5px solid ${c.border}` });

/* ”” constants ”” */
const ANON = 5;
const TREND_Q = 6;
const MGR_DEPT = "Engineering";
const ALL_DEPTS = ["Engineering", "Operations", "Recruiting", "Finance", "HR Immigration", "Sales", "Hiring"];
const TOTAL = ALL_DEPTS.length;
const SURVEY_TYPES = ["Engagement", "Pulse", "Benefits", "360 Feedback", "Onboarding", "Exit"];

const VIEW_MODES = [
    { key: "admin", label: "Admin" },
    { key: "manager", label: "Manager" },
    { key: "executive", label: "Executive" },
];
const BENCHMARKS = [
    { key: "it_staffing", label: "IT Staffing", value: 68, eNPS: 12, participation: 72 },
    { key: "consulting", label: "Consulting", value: 71, eNPS: 15, participation: 75 },
    { key: "general_tech", label: "General Tech", value: 72, eNPS: 18, participation: 78 },
    { key: "all_industry", label: "All industries", value: 70, eNPS: 14, participation: 74 },
];

/* ”” data ”” */
const QH = [
    { q: "Q2'24", yr: 2024, exi: 65, participation: 58, responseRate: 52, burden: 1.8, dropoff: 14, eNPS: -2, mNPS: -8, recognition: 67, manager: 70, comp: 76, wellbeing: 72, belonging: 70, alignment: 70, leadership: 68, enablement: 70, pride: 71, safety: 68, growth: 68, deptResp: { "Engineering": 8, "Operations": 6, "Recruiting": 3, "Finance": 4, "HR Immigration": 3, "Sales": 2, "Hiring": 1 } },
    { q: "Q3'24", yr: 2024, exi: 67, participation: 61, responseRate: 55, burden: 2.0, dropoff: 13, eNPS: 2, mNPS: -4, recognition: 69, manager: 71, comp: 75, wellbeing: 73, belonging: 72, alignment: 71, leadership: 69, enablement: 71, pride: 72, safety: 69, growth: 69, deptResp: { "Engineering": 9, "Operations": 7, "Recruiting": 4, "Finance": 5, "HR Immigration": 4, "Sales": 3, "Hiring": 2 } },
    { q: "Q4'24", yr: 2024, exi: 68, participation: 63, responseRate: 56, burden: 2.1, dropoff: 12, eNPS: 6, mNPS: 0, recognition: 71, manager: 73, comp: 74, wellbeing: 74, belonging: 73, alignment: 72, leadership: 70, enablement: 72, pride: 73, safety: 70, growth: 70, deptResp: { "Engineering": 10, "Operations": 8, "Recruiting": 5, "Finance": 5, "HR Immigration": 4, "Sales": 3, "Hiring": 2 } },
    { q: "Q1'25", yr: 2025, exi: 69, participation: 65, responseRate: 57, burden: 2.1, dropoff: 11, eNPS: 8, mNPS: 4, recognition: 72, manager: 74, comp: 74, wellbeing: 75, belonging: 74, alignment: 73, leadership: 71, enablement: 73, pride: 74, safety: 71, growth: 71, deptResp: { "Engineering": 11, "Operations": 8, "Recruiting": 5, "Finance": 6, "HR Immigration": 4, "Sales": 3, "Hiring": 2 } },
    { q: "Q2'25", yr: 2025, exi: 70, participation: 67, responseRate: 58, burden: 2.2, dropoff: 11, eNPS: 10, mNPS: 8, recognition: 73, manager: 75, comp: 74, wellbeing: 75, belonging: 75, alignment: 74, leadership: 72, enablement: 74, pride: 75, safety: 72, growth: 72, deptResp: { "Engineering": 12, "Operations": 9, "Recruiting": 6, "Finance": 6, "HR Immigration": 5, "Sales": 4, "Hiring": 2 } },
    { q: "Q3'25", yr: 2025, exi: 71, participation: 70, responseRate: 59, burden: 2.2, dropoff: 10, eNPS: 12, mNPS: 12, recognition: 75, manager: 75, comp: 72, wellbeing: 76, belonging: 76, alignment: 75, leadership: 73, enablement: 75, pride: 76, safety: 73, growth: 73, deptResp: { "Engineering": 13, "Operations": 10, "Recruiting": 7, "Finance": 7, "HR Immigration": 5, "Sales": 4, "Hiring": 2 } },
    { q: "Q4'25", yr: 2025, exi: 72, participation: 74, responseRate: 61, burden: 2.3, dropoff: 10, eNPS: 14, mNPS: 14, recognition: 77, manager: 75, comp: 70, wellbeing: 75, belonging: 77, alignment: 75, leadership: 73, enablement: 75, pride: 77, safety: 74, growth: 74, deptResp: { "Engineering": 14, "Operations": 11, "Recruiting": 8, "Finance": 7, "HR Immigration": 5, "Sales": 4, "Hiring": 3 } },
    { q: "Q1'26", yr: 2026, exi: 71, participation: 76, responseRate: 62, burden: 2.3, dropoff: 10, eNPS: 14, mNPS: 9, recognition: 77, manager: 74, comp: 65, wellbeing: 73, belonging: 78, alignment: 74, leadership: 71, enablement: 74, pride: 77, safety: 73, growth: 73, deptResp: { "Engineering": 15, "Operations": 12, "Recruiting": 9, "Finance": 8, "HR Immigration": 5, "Sales": 4, "Hiring": 3 } },
    { q: "Q2'26", yr: 2026, exi: 74, participation: 80, responseRate: 63, burden: 2.4, dropoff: 8, eNPS: 18, mNPS: 6, recognition: 81, manager: 72, comp: 58, wellbeing: 71, belonging: 79, alignment: 73, leadership: 70, enablement: 76, pride: 78, safety: 74, growth: 75, deptResp: { "Engineering": 16, "Operations": 13, "Recruiting": 10, "Finance": 9, "HR Immigration": 6, "Sales": 5, "Hiring": 3 } },
];

const ANNUAL = (() => {
    const byYr = {};
    QH.forEach(q => { if (!byYr[q.yr]) byYr[q.yr] = []; byYr[q.yr].push(q); });
    return Object.entries(byYr).map(([yr, qs]) => {
        const avg = k => Math.round(qs.reduce((s, q) => s + (q[k] || 0), 0) / qs.length);
        return {
            yr: +yr, label: String(yr), exi: avg("exi"), participation: avg("participation"),
            recognition: avg("recognition"), manager: avg("manager"), comp: avg("comp"),
            wellbeing: avg("wellbeing"), belonging: avg("belonging"), leadership: avg("leadership"),
            eNPS: avg("eNPS"), mNPS: avg("mNPS"), qs: qs.length
        };
    });
})();

const DEPT_EXI = {
    "Engineering": [78, 79, 79, 80, 80, 81, 82, 82, 84],
    "Operations": [73, 74, 74, 75, 75, 76, 77, 77, 78],
    "Recruiting": [70, 71, 72, 72, 73, 73, 73, 74, 74],
    "Finance": [72, 72, 73, 73, 73, 72, 72, 71, 70],
    "HR Immigration": [68, 69, 69, 70, 70, 70, 69, 68, 67],
    "Sales": [69, 69, 70, 70, 70, 68, 67, 65, 62],
    "Hiring": [65, 65, 66, 66, 66, 64, 63, 61, 59],
};
const DEPT_DRV = {
    "Engineering": { exi: 84, recognition: 85, manager: 80, comp: 74, wellbeing: 78, belonging: 82, alignment: 80, leadership: 78, enablement: 82, pride: 83, safety: 79, growth: 81, eNPS: 32, mNPS: 24, participation: 92, resp: 16 },
    "Operations": { exi: 78, recognition: 79, manager: 74, comp: 61, wellbeing: 73, belonging: 80, alignment: 74, leadership: 72, enablement: 77, pride: 79, safety: 75, growth: 76, eNPS: 18, mNPS: 14, participation: 85, resp: 13 },
    "Recruiting": { exi: 74, recognition: 77, manager: 73, comp: 59, wellbeing: 72, belonging: 78, alignment: 73, leadership: 71, enablement: 76, pride: 78, safety: 73, growth: 75, eNPS: 14, mNPS: 10, participation: 80, resp: 10 },
    "Finance": { exi: 70, recognition: 72, manager: 69, comp: 56, wellbeing: null, belonging: 76, alignment: 71, leadership: 68, enablement: 74, pride: 76, safety: 72, growth: 74, eNPS: 8, mNPS: 6, participation: 78, resp: 9 },
    "HR Immigration": { exi: 67, recognition: 68, manager: null, comp: 54, wellbeing: null, belonging: 74, alignment: 69, leadership: 66, enablement: 72, pride: 74, safety: 70, growth: 72, eNPS: 4, mNPS: 2, participation: 72, resp: 6 },
    "Sales": { exi: 62, recognition: 64, manager: null, comp: 52, wellbeing: null, belonging: 72, alignment: 67, leadership: null, enablement: 70, pride: 72, safety: 68, growth: 70, eNPS: -6, mNPS: -12, participation: 65, resp: 5 },
    "Hiring": { exi: null, recognition: null, manager: null, comp: null, wellbeing: null, belonging: null, alignment: null, leadership: null, enablement: null, pride: null, safety: null, growth: null, eNPS: null, mNPS: null, participation: 32, resp: 3 },
};
const DEPT_HIST = ALL_DEPTS.reduce((acc, d) => { acc[d] = QH.map((q, i) => ({ q: q.q, score: DEPT_EXI[d]?.[i] || 0 })); return acc; }, {});
const DEPT_SURVEY = {
    "Engineering": { Engagement: 92, Pulse: 88, Benefits: 85, "360 Feedback": 80, Onboarding: 95, Exit: 70 },
    "Operations": { Engagement: 85, Pulse: 80, Benefits: 78, "360 Feedback": 72, Onboarding: 90, Exit: 55 },
    "Recruiting": { Engagement: 80, Pulse: 75, Benefits: 72, "360 Feedback": 68, Onboarding: 88, Exit: 50 },
    "Finance": { Engagement: 78, Pulse: null, Benefits: 74, "360 Feedback": 65, Onboarding: 85, Exit: 45 },
    "HR Immigration": { Engagement: 72, Pulse: null, Benefits: 68, "360 Feedback": null, Onboarding: 80, Exit: 40 },
    "Sales": { Engagement: 65, Pulse: null, Benefits: 60, "360 Feedback": null, Onboarding: 75, Exit: 35 },
    "Hiring": { Engagement: 32, Pulse: null, Benefits: 28, "360 Feedback": null, Onboarding: 40, Exit: 20 },
};

const SIGNAL_MIX = [
    { name: "Engagement", value: 38, color: T.blue.bar }, { name: "Pulse / VibeCheck", value: 22, color: T.teal.bar },
    { name: "Manager Survey", value: 14, color: T.green.bar }, { name: "Benefits", value: 10, color: T.red.bar },
    { name: "Onboarding / Exit", value: 9, color: T.purple.bar }, { name: "360 Feedback", value: 7, color: T.amber.bar },
];
const HOTSPOTS = [
    { dept: "Hiring", pattern: "Low participation ” data unreliable", risk: "high" },
    { dept: "Sales", pattern: "Manager trust decline + low response", risk: "high" },
    { dept: "HR Immigration", pattern: "Wellbeing & comp both declining", risk: "med" },
    { dept: "Finance", pattern: "Feedback inconsistency", risk: "med" },
    { dept: "Engineering", pattern: "Survey fatigue signal emerging", risk: "low" },
];
const HM_DRV = ["Recog.", "Collab.", "Mgr Eff.", "Growth", "Belong.", "Leader.", "Enable.", "Pride", "Psych S.", "Align.", "Comp", "Wellbeing"];
const HM_DEPT = ["Engineering", "Operations", "Recruiting", "Finance", "HR Immig.", "Sales", "Hiring"];
const HM_RESP = [[16, 16, 14, 16, 16, 16, 16, 16, 16, 16, 16, 14], [13, 13, 11, 13, 13, 13, 13, 13, 13, 13, 13, 11], [10, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 9], [9, 9, 8, 9, 9, 8, 9, 9, 9, 9, 9, null], [6, 6, 5, 6, 6, 5, 6, 6, 6, 6, 6, null], [5, 5, null, 5, 5, null, 5, 5, 5, 5, 5, null], [3, 3, null, 3, 3, null, 3, 3, 3, 3, 3, null]];
const HM_SCORES = [[85, 80, 78, 81, 82, 78, 80, 82, 77, 78, 74, 76], [79, 78, 74, 76, 80, 72, 77, 79, 75, 74, 61, 73], [77, 74, 73, 75, 78, 71, 76, 78, 73, 73, 59, 72], [72, 73, 69, 74, 76, 68, 74, 76, 72, 71, 56, null], [68, 71, 68, 72, 74, 66, 72, 74, 70, 69, 54, null], [64, 68, null, 70, 72, null, 70, 72, 68, 67, 52, null], [61, 65, null, 68, 70, null, 67, 70, 65, 64, 50, null]];
const TENURE = [{ tenure: "0“6 mo", exi: 72, comp: 68, wellbeing: 75, manager: 70, n: 12 }, { tenure: "6“12 mo", exi: 74, comp: 65, wellbeing: 74, manager: 72, n: 9 }, { tenure: "1“2 yr", exi: 76, comp: 62, wellbeing: 73, manager: 74, n: 18 }, { tenure: "2“4 yr", exi: 73, comp: 57, wellbeing: 70, manager: 71, n: 14 }, { tenure: "4+ yr", exi: 70, comp: 52, wellbeing: 68, manager: 68, n: 6 }];
const ROLES = [{ level: "IC", exi: 73, comp: 55, wellbeing: 70, manager: 71, n: 32 }, { level: "Senior IC", exi: 76, comp: 61, wellbeing: 72, manager: 74, n: 14 }, { level: "Team Lead", exi: 75, comp: 63, wellbeing: 74, manager: 73, n: 7 }, { level: "Manager", exi: 78, comp: 68, wellbeing: 76, manager: 79, n: 4 }, { level: "Director+", exi: 81, comp: 72, wellbeing: 80, manager: 83, n: 2 }];
const NPS_DEPT = [{ dept: "Engineering", eNPS: 32, mNPS: 24 }, { dept: "Operations", eNPS: 18, mNPS: 14 }, { dept: "Recruiting", eNPS: 14, mNPS: 10 }, { dept: "Finance", eNPS: 8, mNPS: 6 }, { dept: "HR Immig.", eNPS: 4, mNPS: 2 }, { dept: "Sales", eNPS: -6, mNPS: -12 }, { dept: "Hiring", eNPS: null, mNPS: null }];
const QUESTIONS = [
    { id: 1, text: "I feel proud to work at this company", driver: "Pride & Advocacy", survey: "Engagement", score: 82, prevScore: 79, delta: 3.1, responses: 234, type: "top" },
    { id: 2, text: "My team collaborates effectively", driver: "Collaboration", survey: "Engagement", score: 80, prevScore: 78, delta: 2.4, responses: 234, type: "top" },
    { id: 3, text: "I receive meaningful recognition for my work", driver: "Recognition & Feedback", survey: "Engagement", score: 79, prevScore: 74, delta: 4.8, responses: 234, type: "top" },
    { id: 4, text: "I feel a sense of belonging at this company", driver: "Belonging", survey: "Pulse", score: 78, prevScore: 77, delta: 1.2, responses: 164, type: "top" },
    { id: 5, text: "I have the tools and resources I need", driver: "Enablement", survey: "Engagement", score: 77, prevScore: 75, delta: 2.0, responses: 234, type: "top" },
    { id: 6, text: "My total compensation is fair for my role", driver: "Comp & Benefits", survey: "Benefits", score: 49, prevScore: 58, delta: -9.2, responses: 142, type: "bottom" },
    { id: 7, text: "Pay decisions at this company are transparent", driver: "Comp & Benefits", survey: "Benefits", score: 51, prevScore: 59, delta: -7.8, responses: 142, type: "bottom" },
    { id: 8, text: "Leadership communicates decisions openly", driver: "Leadership Trust", survey: "Engagement", score: 55, prevScore: 59, delta: -4.1, responses: 234, type: "bottom" },
    { id: 9, text: "My manager gives me useful feedback regularly", driver: "Manager Effectiveness", survey: "Engagement", score: 57, prevScore: 61, delta: -3.8, responses: 234, type: "bottom" },
    { id: 10, text: "I can manage my workload without burning out", driver: "Wellbeing", survey: "Pulse", score: 61, prevScore: 64, delta: -3.2, responses: 164, type: "bottom" },
    { id: 11, text: "I receive meaningful recognition for my work", driver: "Recognition & Feedback", survey: "Engagement", score: 79, prevScore: 74, delta: 4.8, responses: 234, type: "mover_up" },
    { id: 12, text: "I have clear opportunities to grow my career here", driver: "Growth & Development", survey: "Engagement", score: 75, prevScore: 71, delta: 4.1, responses: 234, type: "mover_up" },
    { id: 13, text: "My team feels psychologically safe to speak up", driver: "Psychological Safety", survey: "Engagement", score: 74, prevScore: 71, delta: 3.3, responses: 234, type: "mover_up" },
    { id: 14, text: "My total compensation is fair for my role", driver: "Comp & Benefits", survey: "Benefits", score: 49, prevScore: 58, delta: -9.2, responses: 142, type: "mover_down" },
    { id: 15, text: "I trust senior leadership to make good decisions", driver: "Leadership Trust", survey: "Engagement", score: 62, prevScore: 68, delta: -5.5, responses: 234, type: "mover_down" },
    { id: 16, text: "My manager supports my wellbeing at work", driver: "Wellbeing", survey: "Pulse", score: 63, prevScore: 68, delta: -4.9, responses: 164, type: "mover_down" },
];
const SURVEY_RUNS = [
    { name: "Culture & Values", type: "Engagement", date: "Apr 6", responses: 234, rate: 84, prevRate: 80, scope: "All departments", drivers: ["Belonging", "Psych Safety", "Leadership Trust"] },
    { name: "April Pulse Check", type: "Pulse Check", date: "Apr 7", responses: 164, rate: 71, prevRate: 68, scope: "Eng, Ops, Recruiting", drivers: ["Wellbeing", "Manager Eff.", "Enablement"] },
    { name: "Benefits Review Q1", type: "Benefits", date: "Mar 15", responses: 142, rate: 63, prevRate: 60, scope: "All departments", drivers: ["Comp & Benefits"] },
    { name: "New Hire Onboarding", type: "Onboarding", date: "Apr 1", responses: 31, rate: 58, prevRate: 55, scope: "All departments", drivers: ["Growth & Dev.", "Belonging", "Enablement"] },
    { name: "360 Feedback Cycle", type: "360 Feedback", date: "Mar 20", responses: 89, rate: 77, prevRate: 74, scope: "Eng, Ops, Rec, Finance", drivers: ["Manager Eff.", "Recognition & Feedback"] },
    { name: "Q1 Exit Interviews", type: "Exit", date: "Mar 30", responses: 22, rate: 44, prevRate: 48, scope: "All departments", drivers: ["Comp & Benefits", "Leadership Trust", "Manager Eff."] },
];
const BASE_INSIGHTS = [
    { id: "i1", type: "down", title: "Comp & Benefits dropped 8.1 pts", body: "Pay fairness (54) and transparency (52) are the weakest sub-drivers.", conf: "High confidence · 289 responses", driver: "Comp & Benefits", dept: "All" },
    { id: "i2", type: "down", title: "Manager Effectiveness declining", body: "mNPS dropped 3 pts. 1:1 quality (66) and coaching (68) are drag areas.", conf: "Medium confidence · 401 responses", driver: "Manager Effectiveness", dept: "Eng, Ops, Rec, Finance" },
    { id: "i3", type: "up", title: "Recognition & Feedback improving fastest", body: "Up 4.2 pts and above benchmark. Full coverage.", conf: "High confidence · 312 responses", driver: "Recognition & Feedback", dept: "All" },
    { id: "i4", type: "warn", title: "Hiring department data is unreliable", body: "Only 3 respondents ” below anonymity threshold.", conf: "Action needed", driver: "Participation", dept: "Hiring" },
    { id: "i5", type: "down", title: "Wellbeing partial coverage ” 3/7 depts", body: "Pulse scoped to Eng, Ops, Recruiting only.", conf: "Medium confidence · 234 responses", driver: "Wellbeing", dept: "Eng, Ops, Rec" },
    { id: "i6", type: "up", title: "Belonging strong across all departments", body: "Consistently at 79 avg, no department below 70.", conf: "High confidence · 198 responses", driver: "Belonging", dept: "All" },
];
const INIT_ACTIONS = [
    { id: "a1", title: "Review compensation benchmarks with leadership", insightId: "i1", driver: "Comp & Benefits", dept: "All", owner: "HR Lead", dueDate: "2026-05-30", status: "in_progress", note: "Benchmark data requested from Mercer.", createdAt: "Q2 '26" },
    { id: "a2", title: "Launch manager coaching program for 1:1 quality", insightId: "i2", driver: "Manager Effectiveness", dept: "Eng, Ops", owner: "L&D Team", dueDate: "2026-06-15", status: "not_started", note: "", createdAt: "Q2 '26" },
    { id: "a3", title: "Run re-engagement pulse in Hiring dept", insightId: "i4", driver: "Participation", dept: "Hiring", owner: "HR Business Partner", dueDate: "2026-05-15", status: "not_started", note: "", createdAt: "Q2 '26" },
];
const STATUS_META = {
    not_started: { label: "Not started", c: T.gray, Icon: Circle },
    in_progress: { label: "In progress", c: T.blue, Icon: RefreshCw },
    done: { label: "Done", c: T.green, Icon: CheckSquare },
};

/* ”” helpers ”” */
const scoreBar = s => s >= 75 ? T.green.bar : s >= 65 ? T.amber.bar : T.red.bar;
const scoreT = s => s >= 75 ? T.green : s >= 65 ? T.amber : T.red;
const covTier = (n, t) => n / t >= 0.8 ? "full" : n / t >= 0.4 ? "partial" : "low";
const covColor = t => t === "full" ? T.green : t === "partial" ? T.amber : T.red;
const fmtD = v => `${v > 0 ? "+" : ""}${v.toFixed(1)}`;
const trendSlice = idx => QH.slice(Math.max(0, idx - TREND_Q + 1), idx + 1);

const calcRisk = dept => {
    const d = DEPT_DRV[dept] || {};
    let score = 0; const flags = [];
    if ((d.comp || 99) < 65) { score += 2; flags.push("Comp below 65"); }
    else if ((d.comp || 99) < 70) { score += 1; flags.push("Comp declining"); }
    if ((d.manager || 99) < 70) { score += 2; flags.push("Manager eff. below 70"); }
    if ((d.eNPS || 0) < 0) { score += 2; flags.push("eNPS negative"); }
    else if ((d.eNPS || 0) < 10) { score += 1; flags.push("eNPS low"); }
    if ((d.resp || 100) < ANON) { score += 2; flags.push("Below anonymity threshold"); }
    return { score, tier: score >= 5 ? "high" : score >= 3 ? "medium" : "low", flags };
};

/* driver definitions */
const calcConf4 = ({ responses, deptCov, signals, daysOld }) => {
    const v = responses >= 200 ? 3 : responses >= 100 ? 2 : responses >= 50 ? 1 : 0;
    const c = deptCov >= 0.85 ? 3 : deptCov >= 0.55 ? 2 : deptCov >= 0.3 ? 1 : 0;
    const s = signals >= 3 ? 2 : signals >= 2 ? 1 : 0;
    const r = daysOld <= 30 ? 2 : daysOld <= 90 ? 1 : 0;
    const total = v + c + s + r;
    return {
        label: total >= 8 ? "High" : total >= 5 ? "Medium" : "Low", total, max: 10, factors: [
            { name: "Response volume", score: v, max: 3, note: `${responses} responses` },
            { name: "Dept coverage", score: c, max: 3, note: `${Math.round(deptCov * 100)}% of depts` },
            { name: "Signal diversity", score: s, max: 2, note: `${signals} signal types` },
            { name: "Data recency", score: r, max: 2, note: `${daysOld}d old` },
        ]
    };
};

const RAW_DRIVERS = [
    { id: 1, name: "Recognition & Feedback", score: 81, fav: 78, delta: 4.2, responses: 312, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 8, Icon: Star, hk: "recognition", subDrivers: [{ name: "Frequency of recognition", s: 83 }, { name: "Quality of feedback", s: 79 }, { name: "Manager acknowledgment", s: 80 }], radarData: [{ sub: "Frequency", score: 83 }, { sub: "Quality", score: 79 }, { sub: "Timeliness", score: 82 }, { sub: "Specificity", score: 77 }, { sub: "Mgr ack.", score: 80 }] },
    { id: 2, name: "Collaboration", score: 77, fav: 74, delta: 1.8, responses: 289, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 8, Icon: Users, hk: "growth", subDrivers: [{ name: "Cross-team cooperation", s: 79 }, { name: "Knowledge sharing", s: 74 }, { name: "Meeting effectiveness", s: 76 }], radarData: [{ sub: "Cross-team", score: 79 }, { sub: "Knowledge", score: 74 }, { sub: "Meetings", score: 76 }, { sub: "Tools", score: 78 }, { sub: "Async", score: 73 }] },
    { id: 3, name: "Manager Effectiveness", score: 72, fav: 69, delta: -2.1, responses: 401, coveredDepts: ["Engineering", "Operations", "Recruiting", "Finance"], intentionalScope: true, signals: 3, daysOld: 8, Icon: Briefcase, hk: "manager", subDrivers: [{ name: "Feedback & coaching", s: 68 }, { name: "Communication clarity", s: 71 }, { name: "Empowerment", s: 74 }, { name: "1:1 quality", s: 66 }], radarData: [{ sub: "Coaching", score: 68 }, { sub: "Clarity", score: 71 }, { sub: "Empowerment", score: 74 }, { sub: "1:1s", score: 66 }, { sub: "Recognition", score: 73 }] },
    { id: 4, name: "Growth & Development", score: 75, fav: 72, delta: 3.0, responses: 254, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 13, Icon: TrendingUp, hk: "growth", subDrivers: [{ name: "Career path clarity", s: 72 }, { name: "Learning opportunities", s: 78 }, { name: "Skill development", s: 75 }], radarData: [{ sub: "Career path", score: 72 }, { sub: "Learning", score: 78 }, { sub: "Skills", score: 75 }, { sub: "Mentorship", score: 73 }, { sub: "Promotion", score: 70 }] },
    { id: 5, name: "Belonging", score: 79, fav: 76, delta: 0.4, responses: 198, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 8, Icon: Heart, hk: "belonging", subDrivers: [{ name: "Inclusion", s: 81 }, { name: "Community feel", s: 78 }, { name: "Voice & respect", s: 77 }], radarData: [{ sub: "Inclusion", score: 81 }, { sub: "Community", score: 78 }, { sub: "Voice", score: 77 }, { sub: "Diversity", score: 80 }, { sub: "Fit", score: 76 }] },
    { id: 6, name: "Leadership Trust", score: 70, fav: 67, delta: -3.5, responses: 187, coveredDepts: ["Engineering", "Operations", "Recruiting", "Finance", "HR Immigration"], intentionalScope: false, signals: 2, daysOld: 8, Icon: Shield, hk: "leadership", subDrivers: [{ name: "Vision clarity", s: 72 }, { name: "Decision transparency", s: 67 }, { name: "Integrity", s: 74 }, { name: "Accessibility", s: 65 }], radarData: [{ sub: "Vision", score: 72 }, { sub: "Transparency", score: 67 }, { sub: "Integrity", score: 74 }, { sub: "Access", score: 65 }, { sub: "Follow-through", score: 68 }] },
    { id: 7, name: "Enablement", score: 76, fav: 73, delta: 2.2, responses: 221, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 7, Icon: Zap, hk: "enablement", subDrivers: [{ name: "Tools & resources", s: 78 }, { name: "Process clarity", s: 74 }, { name: "Autonomy", s: 77 }], radarData: [{ sub: "Tools", score: 78 }, { sub: "Process", score: 74 }, { sub: "Autonomy", score: 77 }, { sub: "Blockers", score: 73 }, { sub: "Support", score: 76 }] },
    { id: 8, name: "Pride & Advocacy", score: 78, fav: 75, delta: 1.5, responses: 176, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 8, Icon: Award, hk: "pride", subDrivers: [{ name: "Company pride", s: 80 }, { name: "Referral likelihood", s: 76 }, { name: "Mission alignment", s: 78 }], radarData: [{ sub: "Pride", score: 80 }, { sub: "Referral", score: 76 }, { sub: "Mission", score: 78 }, { sub: "Brand", score: 77 }, { sub: "Loyalty", score: 79 }] },
    { id: 9, name: "Psychological Safety", score: 74, fav: 71, delta: 0.8, responses: 163, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 8, Icon: Lock, hk: "safety", subDrivers: [{ name: "Speaking up", s: 72 }, { name: "Risk tolerance", s: 75 }, { name: "Failure acceptance", s: 74 }], radarData: [{ sub: "Speaking up", score: 72 }, { sub: "Risk", score: 75 }, { sub: "Failure ok", score: 74 }, { sub: "Candor", score: 73 }, { sub: "No retaliation", score: 76 }] },
    { id: 10, name: "Alignment", score: 73, fav: 70, delta: -1.2, responses: 142, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 2, daysOld: 7, Icon: Compass, hk: "alignment", subDrivers: [{ name: "Goal clarity", s: 74 }, { name: "Strategy understanding", s: 71 }, { name: "Priority alignment", s: 73 }], radarData: [{ sub: "Goals", score: 74 }, { sub: "Strategy", score: 71 }, { sub: "Priorities", score: 73 }, { sub: "Role clarity", score: 75 }, { sub: "Direction", score: 72 }] },
    { id: 11, name: "Comp & Benefits", score: 58, fav: 54, delta: -8.1, responses: 289, coveredDepts: ALL_DEPTS, intentionalScope: false, signals: 3, daysOld: 25, Icon: DollarSign, hk: "comp", subDrivers: [{ name: "Pay fairness", s: 54 }, { name: "Benefits quality", s: 61 }, { name: "Pay transparency", s: 52 }, { name: "Total comp clarity", s: 56 }], radarData: [{ sub: "Pay fairness", score: 54 }, { sub: "Benefits", score: 61 }, { sub: "Transparency", score: 52 }, { sub: "Total comp", score: 56 }, { sub: "Benchmarking", score: 58 }] },
    { id: 12, name: "Wellbeing", score: 71, fav: 68, delta: -2.8, responses: 234, coveredDepts: ["Engineering", "Operations", "Recruiting"], intentionalScope: true, signals: 2, daysOld: 7, Icon: Activity, hk: "wellbeing", subDrivers: [{ name: "Work-life balance", s: 68 }, { name: "Workload manageability", s: 70 }, { name: "Stress levels", s: 72 }, { name: "Manager support", s: 73 }], radarData: [{ sub: "Work-life", score: 68 }, { sub: "Workload", score: 70 }, { sub: "Stress", score: 72 }, { sub: "Support", score: 73 }, { sub: "Burnout risk", score: 69 }] },
];
const DRIVERS = RAW_DRIVERS.map(d => {
    const tier = covTier(d.coveredDepts.length, TOTAL);
    const conf = calcConf4({ responses: d.responses, deptCov: d.coveredDepts.length / TOTAL, signals: d.signals, daysOld: d.daysOld });
    const excluded = ALL_DEPTS.filter(dep => !d.coveredDepts.includes(dep));
    return { ...d, tier, conf, excluded };
});

/* ”” shared atoms ”” */
const TT = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 14px", fontSize: 12, minWidth: 160 }}>
            <p style={{ fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8 }}>{label}</p>
            {payload.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 4 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-text-secondary)" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />{p.name}
                    </span>
                    <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{p.value}</span>
                </div>
            ))}
        </div>
    );
};
const Delta = ({ v, lg }) => {
    const c = v > 0 ? T.green : v === 0 ? T.gray : T.red;
    const Icon = v > 0 ? ArrowUp : v === 0 ? Minus : ArrowDown;
    return <span style={{ ...pill(c), padding: lg ? "4px 10px" : "2px 7px", fontSize: lg ? 11 : 10 }}><Icon size={9} />{Math.abs(v).toFixed(1)} pts</span>;
};
const CovPill = ({ tier, covered, total }) => {
    const c = covColor(tier);
    return <span style={pill(c)}>{tier === "full" ? "" : " "} {covered}/{total} depts</span>;
};
const KpiStrip = ({ metrics }) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${metrics.length},minmax(0,1fr))`, gap: 10 }}>
        {metrics.map((m, i) => {
            const delta = m.current - m.previous;
            const good = m.higherIsBetter !== false ? delta >= 0 : delta <= 0;
            const c = good ? T.green : T.red;
            const Icon = delta > 0 ? ArrowUp : delta < 0 ? ArrowDown : Minus;
            return (
                <div key={i} style={surf}>
                    <p style={{ ...lbl, marginBottom: 6 }}>{m.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1, margin: "0 0 6px" }}>{m.current}{m.unit ? " " + m.unit : ""}</p>
                    <span style={pill(c)}><Icon size={8} /> {Math.abs(delta).toFixed(m.dec || 1)} vs prev</span>
                    {m.note && <p style={{ ...subs, marginTop: 5, fontSize: 10, lineHeight: 1.4 }}>{m.note}</p>}
                </div>
            );
        })}
    </div>
);
const HeatCell = ({ score, resp }) => {
    if (score === null || resp === null) return <div style={{ width: 58, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-background-secondary)", border: "0.5px dashed var(--color-border-secondary)", color: "var(--color-text-tertiary)", fontSize: 11 }}>”</div>;
    if (resp < ANON) return <div title={`Only ${resp} responses`} style={{ width: 58, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, background: T.gray.bg, border: `0.5px dashed ${T.gray.border}`, color: T.gray.text, fontSize: 10, cursor: "help" }}><EyeOff size={9} /><span style={{ fontSize: 9 }}>n&lt;{ANON}</span></div>;
    return <div style={{ width: 58, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, background: score >= 78 ? T.green.bg : score >= 72 ? T.blue.bg : score >= 66 ? T.amber.bg : score >= 60 ? "#fff3e0" : T.red.bg, color: score >= 78 ? T.green.text : score >= 72 ? T.blue.text : score >= 66 ? T.amber.text : score >= 60 ? "#9b5f00" : T.red.text }}>{score}</div>;
};

const DrawerThemeHeader = ({ onClose, children }) => (
    <header className="drawer-theme-header">
        <div className="drawer-theme-header__orbs" aria-hidden>
            <span className="drawer-h-orb drawer-h-orb-1" />
            <span className="drawer-h-orb drawer-h-orb-2" />
            <span className="drawer-h-orb drawer-h-orb-3" />
        </div>
        <div className="drawer-theme-header__row">
            <div className="drawer-theme-header__title-block">{children}</div>
            <button type="button" className="drawer-theme-header__close" onClick={onClose} aria-label="Close drawer">
                <X size={18} />
            </button>
        </div>
    </header>
);

/* ”” dept drawer ”” */
const DeptDrawer = ({ dept, onClose, benchmark, selIdx }) => {
    if (!dept) return null;
    const d = DEPT_DRV[dept] || {};
    const suppressed = (d.resp || 0) < ANON;
    const prevExi = DEPT_EXI[dept]?.[selIdx - 1] || 0;
    const risk = calcRisk(dept);
    const rC = risk.tier === "high" ? T.red : risk.tier === "medium" ? T.amber : T.green;
    const histArr = DEPT_HIST[dept] || [];
    const histData = histArr.slice(Math.max(0, selIdx - TREND_Q + 1), selIdx + 1);
    const lastScore = d.exi || 0;
    const rates = DEPT_SURVEY[dept] || {};
    const driverRows = [
        { n: "Recognition & Feedback", v: d.recognition }, { n: "Collaboration", v: d.growth },
        { n: "Manager Effectiveness", v: d.manager }, { n: "Growth & Development", v: d.growth },
        { n: "Belonging", v: d.belonging }, { n: "Leadership Trust", v: d.leadership },
        { n: "Enablement", v: d.enablement }, { n: "Pride & Advocacy", v: d.pride },
        { n: "Psychological Safety", v: d.safety }, { n: "Alignment", v: d.alignment },
        { n: "Comp & Benefits", v: d.comp }, { n: "Wellbeing", v: d.wellbeing },
    ];
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={onClose}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.12)" }} />
            <div onClick={e => e.stopPropagation()} className="drawer-theme-panel" style={{ position: "relative", width: 500, height: "100%", background: "var(--color-background-primary)", borderLeft: "0.5px solid var(--color-border-secondary)" }}>
                <DrawerThemeHeader onClose={onClose}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div className="drawer-theme-header__icon-wrap">
                            <Building2 size={18} color="#ffffff" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <p className="drawer-theme-header__title">{dept}</p>
                            <p className="drawer-theme-header__subtitle">{d.resp || 0} respondents · {QH[selIdx]?.q}</p>
                        </div>
                    </div>
                </DrawerThemeHeader>

                <div className="drawer-theme-body">
                    {suppressed ? (
                        <div style={{ padding: 14, borderRadius: "var(--border-radius-md)", background: T.gray.bg, border: `0.5px solid ${T.gray.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                            <EyeOff size={16} color={T.gray.text} />
                            <p style={{ fontSize: 12, color: T.gray.text, margin: 0, lineHeight: 1.6 }}>Data suppressed ” only {d.resp} respondents, below the anonymity threshold of {ANON}.</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                                <div style={surf}>
                                    <p style={{ ...lbl, marginBottom: 6 }}>Dept EXI · {QH[selIdx]?.q}</p>
                                    <p style={{ fontSize: 30, fontWeight: 500, color: scoreBar(lastScore), lineHeight: 1, margin: "0 0 6px" }}>{lastScore}</p>
                                    {prevExi > 0 && <Delta v={lastScore - prevExi} lg />}
                                </div>
                                <div style={{ ...surf, background: rC.bg, border: `0.5px solid ${rC.border}` }}>
                                    <p style={{ ...lbl, color: rC.text, marginBottom: 6 }}>Retention risk</p>
                                    <p style={{ fontSize: 15, fontWeight: 500, color: rC.text, margin: "0 0 6px", textTransform: "capitalize" }}>{risk.tier}</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, minHeight: 22, alignItems: "center" }}>
                                        {risk.flags.length === 0 ? (
                                            <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 20, background: "rgba(0,0,0,.08)", color: rC.text, lineHeight: 1.35 }}>No triggers</span>
                                        ) : (
                                            risk.flags.map((f, i) => <span key={i} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 20, background: "rgba(0,0,0,.08)", color: rC.text }}>{f}</span>)
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={{ boxSizing: "border-box", border: "1px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "12px 14px 10px", background: "var(--color-background-primary)", marginBottom: 14 }}>
                                <p style={{ ...h3s, marginBottom: 8 }}>EXI trend · last {histData.length} quarters</p>
                                <ResponsiveContainer width="100%" height={120}>
                                    <ComposedChart data={histData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                                        <XAxis dataKey="q" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                        <YAxis domain={[50, 90]} tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                        <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 2" strokeWidth={1} />
                                        <Tooltip content={<TT />} />
                                        <Area type="monotone" dataKey="score" name={dept} stroke={scoreBar(lastScore)} fill={scoreBar(lastScore)} fillOpacity={0.07} strokeWidth={2} dot={{ r: 3, fill: scoreBar(lastScore), strokeWidth: 0 }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                                <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 4, marginBottom: 0 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                                {[["eNPS", d.eNPS], ["mNPS", d.mNPS]].map(([label, val]) => (
                                    <div key={label} style={surf}>
                                        <p style={{ ...lbl, marginBottom: 6 }}>{label}</p>
                                        {val === null
                                            ? <p style={{ fontSize: 18, color: "var(--color-text-tertiary)", margin: 0 }}>”</p>
                                            : <p style={{ fontSize: 22, fontWeight: 500, color: val >= 0 ? T.green.text : T.red.text, margin: 0 }}>{val > 0 ? "+" : ""}{val}</p>
                                        }
                                    </div>
                                ))}
                            </div>

                            <p style={{ ...h3s, marginBottom: 10 }}>Driver scores · {QH[selIdx]?.q}</p>
                            {driverRows.map((dr, i) => {
                                if (dr.v === null || dr.v === undefined) return (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: "var(--border-radius-md)", background: T.gray.bg, marginBottom: 5 }}>
                                        <span style={{ fontSize: 12, flex: 1, color: "var(--color-text-secondary)" }}>{dr.n}</span>
                                        <EyeOff size={11} color={T.gray.text} />
                                        <span style={{ fontSize: 11, color: T.gray.text }}>Not surveyed</span>
                                    </div>
                                );
                                const sc = scoreT(dr.v);
                                return (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginBottom: 5 }}>
                                        <span style={{ fontSize: 12, flex: 1, color: "var(--color-text-primary)" }}>{dr.n}</span>
                                        <div style={{ width: 80, height: 4, borderRadius: 2, background: "var(--color-border-tertiary)" }}>
                                            <div style={{ height: 4, borderRadius: 2, width: `${dr.v}%`, background: sc.bar }} />
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 500, width: 28, textAlign: "right", color: sc.text }}>{dr.v}</span>
                                    </div>
                                );
                            })}

                            <p style={{ ...h3s, marginTop: 16, marginBottom: 10 }}>Participation by survey type</p>
                            {SURVEY_TYPES.map(st => {
                                const rate = rates[st];
                                if (rate === null || rate === undefined) return (
                                    <div key={st} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginBottom: 5 }}>
                                        <span style={{ fontSize: 12, flex: 1, color: "var(--color-text-secondary)" }}>{st}</span>
                                        <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Not scoped</span>
                                    </div>
                                );
                                const c = rate >= 80 ? T.green : rate >= 60 ? T.amber : T.red;
                                return (
                                    <div key={st} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginBottom: 5 }}>
                                        <span style={{ fontSize: 12, flex: 1, color: "var(--color-text-primary)" }}>{st}</span>
                                        <div style={{ width: 80, height: 4, borderRadius: 2, background: "var(--color-border-tertiary)" }}>
                                            <div style={{ height: 4, borderRadius: 2, width: `${rate}%`, background: c.bar }} />
                                        </div>
                                        <span style={{ fontSize: 11, fontWeight: 500, color: c.text, width: 30, textAlign: "right" }}>{rate}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ”” driver drawer ”” */
const DriverDrawer = ({ driver, onClose, benchmark, selIdx }) => {
    if (!driver) return null;
    const { name, score, fav, delta, tier, conf, responses, subDrivers, radarData, Icon, hk, coveredDepts, excluded, intentionalScope } = driver;
    const cc = covColor(tier);
    const hist = trendSlice(selIdx);
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={onClose}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.12)" }} />
            <div onClick={e => e.stopPropagation()} className="drawer-theme-panel" style={{ position: "relative", width: 460, height: "100%", background: "var(--color-background-primary)", borderLeft: "0.5px solid var(--color-border-secondary)" }}>
                <DrawerThemeHeader onClose={onClose}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div className="drawer-theme-header__icon-wrap">
                            <Icon size={18} color="#ffffff" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <p className="drawer-theme-header__title">{name}</p>
                            <p className="drawer-theme-header__subtitle">{responses.toLocaleString()} responses</p>
                        </div>
                    </div>
                </DrawerThemeHeader>

                <div className="drawer-theme-body">
                    <div style={{ ...surf, marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <p style={{ ...h3s, margin: 0 }}>4-factor confidence</p>
                            <span style={pill(conf.label === "High" ? T.blue : conf.label === "Medium" ? T.purple : T.red)}>{conf.label} · {conf.total}/{conf.max}</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {conf.factors.map((f, i) => (
                                <div key={i} style={{ background: "var(--color-background-primary)", borderRadius: "var(--border-radius-md)", padding: "8px 10px", border: "0.5px solid var(--color-border-tertiary)" }}>
                                    <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: "0 0 4px" }}>{f.name}</p>
                                    <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                                        {Array.from({ length: f.max }).map((_, j) => (
                                            <div key={j} style={{ flex: 1, height: 3, borderRadius: 2, background: j < f.score ? T.blue.bar : "var(--color-background-secondary)" }} />
                                        ))}
                                    </div>
                                    <p style={{ fontSize: 10, color: "var(--color-text-secondary)", margin: 0 }}>{f.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p style={{ ...lbl, marginBottom: 8 }}>Quarter over quarter</p>
                    <KpiStrip metrics={[
                        { label: "Score", current: score, previous: QH[selIdx - 1]?.[hk] || 0, unit: "/100", dec: 0 },
                        { label: "Favorability", current: fav, previous: fav - delta, unit: "%", dec: 1 },
                        { label: "Responses", current: responses, previous: Math.round(responses * .88), dec: 0, higherIsBetter: true },
                    ]} />

                    <div style={{ marginTop: 14, background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "16px" }}>
                        <p style={{ ...h3s, marginBottom: 10 }}>Score history · last {hist.length} quarters</p>
                        <ResponsiveContainer width="100%" height={120}>
                            <ComposedChart data={hist} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                                <XAxis dataKey="q" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                <YAxis domain={[45, 95]} tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 2" strokeWidth={1} />
                                <Tooltip content={<TT />} />
                                <Area type="monotone" dataKey={hk} name={name} stroke={scoreBar(score)} fill={scoreBar(score)} fillOpacity={0.07} strokeWidth={2} dot={{ r: 3, fill: scoreBar(score), strokeWidth: 0 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                        <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 4 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                    </div>

                    <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: "var(--border-radius-md)", background: cc.bg, border: `0.5px solid ${cc.border}` }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                            <p style={{ fontSize: 12, fontWeight: 500, color: cc.text, margin: 0 }}>{tier === "full" ? "Full coverage" : tier === "partial" ? "Partial" : "Low coverage"}</p>
                            <CovPill tier={tier} covered={coveredDepts.length} total={TOTAL} />
                        </div>
                        <p style={{ fontSize: 11, color: cc.text, lineHeight: 1.5, margin: "0 0 8px" }}>
                            {intentionalScope ? `Intentionally scoped to ${coveredDepts.length} departments.` : tier !== "full" ? "Some departments did not respond for this driver." : "All departments contributed."}
                        </p>
                        {excluded.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                <span style={{ fontSize: 10, color: cc.text, fontWeight: 500 }}>Excluded:</span>
                                {excluded.map(d => <span key={d} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 20, background: "rgba(0,0,0,.06)", color: cc.text, textDecoration: "line-through" }}>{d}</span>)}
                            </div>
                        )}
                    </div>

                    <p style={{ ...h3s, marginTop: 16, marginBottom: 10 }}>Sub-driver breakdown</p>
                    {subDrivers.map((sd, i) => {
                        const sc = scoreT(sd.s);
                        return (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginBottom: 6 }}>
                                <span style={{ fontSize: 12, flex: 1, color: "var(--color-text-primary)" }}>{sd.name}</span>
                                <div style={{ width: 80, height: 4, borderRadius: 2, background: "var(--color-border-tertiary)" }}>
                                    <div style={{ height: 4, borderRadius: 2, width: `${sd.s}%`, background: sc.bar }} />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 500, width: 28, textAlign: "right", color: sc.text }}>{sd.s}</span>
                            </div>
                        );
                    })}

                    <div style={{ marginTop: 16, background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "16px" }}>
                        <p style={{ ...h3s, marginBottom: 10 }}>Radar view</p>
                        <ResponsiveContainer width="100%" height={180}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="var(--color-border-tertiary)" />
                                <PolarAngleAxis dataKey="sub" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                                <Radar name={name} dataKey="score" stroke={scoreBar(score)} fill={scoreBar(score)} fillOpacity={0.12} strokeWidth={2} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ”” manager view ”” */
const ManagerView = ({ selIdx, benchmark }) => {
    const d = DEPT_DRV[MGR_DEPT] || {};
    const prevExi = DEPT_EXI[MGR_DEPT]?.[selIdx - 1] || 0;
    const risk = calcRisk(MGR_DEPT);
    const histArr = DEPT_HIST[MGR_DEPT] || [];
    const histData = histArr.slice(Math.max(0, selIdx - TREND_Q + 1), selIdx + 1);
    const rates = DEPT_SURVEY[MGR_DEPT] || {};
    const driverRows = [
        { n: "Recognition & Feedback", v: d.recognition }, { n: "Collaboration", v: d.growth },
        { n: "Manager Effectiveness", v: d.manager }, { n: "Growth & Development", v: d.growth },
        { n: "Belonging", v: d.belonging }, { n: "Leadership Trust", v: d.leadership },
        { n: "Enablement", v: d.enablement }, { n: "Pride & Advocacy", v: d.pride },
        { n: "Psychological Safety", v: d.safety }, { n: "Alignment", v: d.alignment },
        { n: "Comp & Benefits", v: d.comp }, { n: "Wellbeing", v: d.wellbeing },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: T.blue.bg, border: `0.5px solid ${T.blue.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                <User size={13} color={T.blue.text} />
                <p style={{ fontSize: 12, color: T.blue.text, margin: 0 }}>Showing data for <strong style={{ fontWeight: 500 }}>{MGR_DEPT}</strong> · {d.resp} respondents · {QH[selIdx]?.q} · Anonymity threshold applied</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}>
                <div style={card}>
                    <p style={{ ...lbl, marginBottom: 10 }}>Department EXI</p>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 6 }}>
                        <span style={{ fontSize: 44, fontWeight: 500, lineHeight: 1, color: scoreBar(d.exi || 0) }}>{d.exi || "”"}</span>
                        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 6 }}>/100</span>
                    </div>
                    {prevExi > 0 && <Delta v={(d.exi || 0) - prevExi} lg />}
                    <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--color-text-tertiary)", marginBottom: 4 }}>
                            <span>vs {benchmark.label}</span><span>{benchmark.value}</span>
                        </div>
                        <div style={{ position: "relative", height: 5, borderRadius: 3, background: "var(--color-background-secondary)" }}>
                            <div style={{ height: 5, borderRadius: 3, width: `${d.exi || 0}%`, background: scoreBar(d.exi || 0) }} />
                            <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: `${benchmark.value}%`, width: 1.5, height: 11, background: T.purple.bar, borderRadius: 1 }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10 }}>
                    {[
                        { label: "Participation", val: `${d.participation || 0}%`, sub: "response rate" },
                        { label: "Respondents", val: d.resp || 0, sub: "of team" },
                        { label: "eNPS", val: d.eNPS !== null ? (d.eNPS > 0 ? `+${d.eNPS}` : String(d.eNPS)) : "”", sub: "employee NPS" },
                        { label: "mNPS", val: d.mNPS !== null ? (d.mNPS > 0 ? `+${d.mNPS}` : String(d.mNPS)) : "”", sub: "manager NPS" },
                        { label: "Top strength", val: "Recognition", sub: `Score: ${d.recognition || "”"}` },
                        { label: "Top concern", val: "Comp & Benefits", sub: `Score: ${d.comp || "”"}`, danger: true },
                        { label: "Retention risk", val: risk.tier.charAt(0).toUpperCase() + risk.tier.slice(1), sub: `${risk.flags.length} flag${risk.flags.length !== 1 ? "s" : ""}`, danger: risk.tier === "high" },
                        { label: "Surveys run", val: "3", sub: "this quarter" },
                    ].map((k, i) => (
                        <div key={i} style={surf}>
                            <p style={{ ...lbl, marginBottom: 6 }}>{k.label}</p>
                            <p style={{ fontSize: k.val.toString().length > 6 ? 13 : 18, fontWeight: 500, color: k.danger ? "var(--color-text-danger)" : "var(--color-text-primary)", lineHeight: 1.2, margin: "0 0 4px" }}>{k.val}</p>
                            <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: 0 }}>{k.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={card}>
                <p style={h3s}>Department EXI trend · last {histData.length} quarters</p>
                <p style={{ ...subs, marginBottom: 14 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                <ResponsiveContainer width="100%" height={160}>
                    <ComposedChart data={histData} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                        <XAxis dataKey="q" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[60, 90]} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 3" strokeWidth={1} />
                        <Tooltip content={<TT />} />
                        <Area type="monotone" dataKey="score" name={MGR_DEPT} stroke={scoreBar(d.exi || 0)} fill={scoreBar(d.exi || 0)} fillOpacity={0.07} strokeWidth={2} dot={{ r: 4, fill: scoreBar(d.exi || 0), strokeWidth: 0 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div style={card}>
                <p style={h3s}>Driver scores · {MGR_DEPT} · {QH[selIdx]?.q}</p>
                <p style={{ ...subs, marginBottom: 14 }}>{d.resp} respondents · no cross-department comparisons in manager view</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 8 }}>
                    {driverRows.map((dr, i) => {
                        if (dr.v === null || dr.v === undefined) return (
                            <div key={i} style={{ padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: T.gray.bg, border: `0.5px solid ${T.gray.border}` }}>
                                <p style={{ fontSize: 10, color: T.gray.text, marginBottom: 4, lineHeight: 1.3 }}>{dr.n}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}><EyeOff size={11} color={T.gray.text} /><span style={{ fontSize: 11, color: T.gray.text }}>Not surveyed</span></div>
                            </div>
                        );
                        const sc = scoreT(dr.v);
                        return (
                            <div key={i} style={{ padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)" }}>
                                <p style={{ fontSize: 10, color: "var(--color-text-secondary)", marginBottom: 4, lineHeight: 1.3 }}>{dr.n}</p>
                                <p style={{ fontSize: 20, fontWeight: 500, color: sc.text, lineHeight: 1, margin: "0 0 4px" }}>{dr.v}</p>
                                <div style={{ height: 3, borderRadius: 2, background: "var(--color-border-tertiary)" }}>
                                    <div style={{ height: 3, borderRadius: 2, width: `${dr.v}%`, background: sc.bar }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={card}>
                <p style={h3s}>Participation by survey type · {MGR_DEPT}</p>
                <p style={{ ...subs, marginBottom: 14 }}>Response rates from your department this quarter</p>
                {SURVEY_TYPES.map(st => {
                    const rate = rates[st];
                    if (rate === null || rate === undefined) return (
                        <div key={st} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                            <span style={{ fontSize: 12, width: 140, flexShrink: 0, color: "var(--color-text-secondary)" }}>{st}</span>
                            <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Not scoped this quarter</span>
                        </div>
                    );
                    const c = rate >= 80 ? T.green : rate >= 60 ? T.amber : T.red;
                    return (
                        <div key={st} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                            <span style={{ fontSize: 12, width: 140, flexShrink: 0, color: "var(--color-text-primary)" }}>{st}</span>
                            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--color-background-secondary)" }}>
                                <div style={{ height: 4, borderRadius: 2, width: `${rate}%`, background: c.bar }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 500, color: c.text, width: 36, textAlign: "right" }}>{rate}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ”” executive view ”” */
const ExecutiveView = ({ selIdx, benchmark }) => {
    const cq = QH[selIdx];
    const pq = QH[selIdx - 1] || QH[0];
    const hist = trendSlice(selIdx);
    const annualD = ANNUAL.map((yr, i) => ({ ...yr, exiDelta: i > 0 ? yr.exi - ANNUAL[i - 1].exi : 0 }));
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: T.purple.bg, border: `0.5px solid ${T.purple.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                <Star size={13} color={T.purple.text} />
                <p style={{ fontSize: 12, color: T.purple.text, margin: 0 }}>Executive summary · {cq.q} · All departments · Drill-down disabled</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10 }}>
                {[
                    { label: "Company EXI", val: cq.exi, sub: `vs benchmark ${benchmark.value}`, big: true, good: cq.exi >= benchmark.value },
                    { label: "eNPS", val: cq.eNPS > 0 ? `+${cq.eNPS}` : String(cq.eNPS), sub: `vs benchmark +${benchmark.eNPS}` },
                    { label: "Participation", val: `${cq.participation}%`, sub: `vs benchmark ${benchmark.participation}%` },
                    { label: "QoQ EXI change", val: `${fmtD(cq.exi - pq.exi)} pts`, sub: `${pq.q} †’ ${cq.q}`, good: cq.exi >= pq.exi },
                ].map((k, i) => (
                    <div key={i} style={surf}>
                        <p style={{ ...lbl, marginBottom: 6 }}>{k.label}</p>
                        <p style={{ fontSize: k.big ? 36 : 22, fontWeight: 500, color: k.good === undefined ? "var(--color-text-primary)" : k.good ? T.green.text : T.red.text, lineHeight: 1, margin: "0 0 4px" }}>{k.val}</p>
                        <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: 0 }}>{k.sub}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={card}>
                    <p style={h3s}>EXI trend · last {hist.length} quarters</p>
                    <p style={{ ...subs, marginBottom: 14 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                    <ResponsiveContainer width="100%" height={160}>
                        <ComposedChart data={hist} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                            <XAxis dataKey="q" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                            <YAxis domain={[60, 82]} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                            <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 3" strokeWidth={1} />
                            <Tooltip content={<TT />} />
                            <Area type="monotone" dataKey="exi" name="EXI" stroke={T.green.bar} fill={T.green.bar} fillOpacity={0.07} strokeWidth={2} dot={{ r: 4, fill: T.green.bar, strokeWidth: 0 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div style={card}>
                    <p style={h3s}>Annual EXI · year over year</p>
                    <p style={{ ...subs, marginBottom: 14 }}>Aggregated from quarterly data</p>
                    <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                        {annualD.map((yr, i) => (
                            <div key={i} style={{ ...surf, flex: 1, textAlign: "center" }}>
                                <p style={{ ...lbl, marginBottom: 6 }}>{yr.label}</p>
                                <p style={{ fontSize: 20, fontWeight: 500, color: scoreBar(yr.exi), margin: 0 }}>{yr.exi}</p>
                                <p style={{ fontSize: 10, color: yr.exiDelta > 0 ? T.green.text : yr.exiDelta < 0 ? T.red.text : T.gray.text, marginTop: 3 }}>
                                    {i === 0 ? "baseline" : yr.exiDelta > 0 ? `–² +${yr.exiDelta}` : yr.exiDelta < 0 ? `–¼ ${yr.exiDelta}` : "†’ 0"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={card}>
                    <p style={{ ...h3s, marginBottom: 12 }}>Department EXI · {cq.q}</p>
                    {ALL_DEPTS.map((dep, i) => {
                        const curr = DEPT_EXI[dep]?.[selIdx] || 0;
                        const prev = DEPT_EXI[dep]?.[selIdx - 1] || 0;
                        const delta = curr - prev;
                        const suppressed = (cq.deptResp?.[dep] || 0) < ANON;
                        return (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < ALL_DEPTS.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                                <span style={{ fontSize: 12, width: 120, flexShrink: 0, color: "var(--color-text-primary)" }}>{dep}</span>
                                {suppressed ? (
                                    <span style={{ fontSize: 11, color: T.gray.text, display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
                                        <EyeOff size={11} color={T.gray.text} />Suppressed
                                    </span>
                                ) : (
                                    <span style={{ display: "contents" }}>
                                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--color-background-secondary)" }}>
                                            <div style={{ height: 4, borderRadius: 2, width: `${curr}%`, background: scoreBar(curr) }} />
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 500, width: 22, textAlign: "right", color: "var(--color-text-primary)" }}>{curr}</span>
                                        <span style={{ fontSize: 11, width: 28, textAlign: "right", color: delta > 0 ? T.green.text : delta < 0 ? T.red.text : T.gray.text }}>{delta > 0 ? "–²" : delta < 0 ? "–¼" : "†’"}{Math.abs(delta)}</span>
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div style={card}>
                    <p style={{ ...h3s, marginBottom: 12 }}>Key risks · {cq.q}</p>
                    {HOTSPOTS.map((h, i) => {
                        const c = h.risk === "high" ? T.red : h.risk === "med" ? T.amber : T.gray;
                        return (
                            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginBottom: 6 }}>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{h.dept}</p>
                                    <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{h.pattern}</p>
                                </div>
                                <span style={{ ...pill(c), flexShrink: 0 }}>{h.risk === "high" ? "High" : h.risk === "med" ? "Med" : "Low"}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ ...card, background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Sparkles size={14} color="var(--color-text-info)" />
                    <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-info)", margin: 0 }}>AI Summary · {cq.q}</p>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--color-text-primary)", margin: 0 }}>
                    EXI is <strong style={{ fontWeight: 500 }}>{cq.exi}</strong>, {cq.exi >= benchmark.value ? "above" : "below"} the {benchmark.label} benchmark of {benchmark.value}. Participation at {cq.participation}%. <strong style={{ fontWeight: 500 }}>Compensation & Benefits is the primary drag</strong> at 58. Sales and Hiring are high retention risk departments.
                </p>
            </div>
        </div>
    );
};

/* ”” admin tabs ”” */
const OverviewTab = ({ selIdx, benchmark, onDeptClick }) => {
    const cq = QH[selIdx];
    const pq = QH[selIdx - 1] || QH[0];
    const hist = trendSlice(selIdx);
    const partial = DRIVERS.filter(d => d.tier !== "full").length;
    const risks = ALL_DEPTS.map(dept => ({ dept, ...calcRisk(dept) })).sort((a, b) => b.score - a.score);
    const metricAccents = [T.blue, T.teal, T.purple, T.amber, T.green, T.blue, T.teal, T.red];
    const spotlightCard = {
        ...card,
        background: "linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%)",
        border: "1px solid #c8d5ef",
        boxShadow: "0 18px 30px -24px rgba(0,22,137,0.34)",
        position: "relative",
        overflow: "hidden"
    };
    const sectionCard = {
        ...card,
        background: "#ffffff",
        border: "1px solid #d5deef",
        boxShadow: "0 14px 26px -24px rgba(0,22,137,0.24)"
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(240px, 280px) 1fr", gap: 16, alignItems: "stretch" }}>
                <div style={spotlightCard}>
                    <p style={{ ...lbl, marginBottom: 12 }}>Experience Index · {cq.q}</p>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 48, fontWeight: 600, lineHeight: 1, color: "rgb(0,22,137)" }}>{cq.exi}</span>
                        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 8 }}>/100</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--color-text-primary)", margin: "0 0 6px", fontWeight: 500 }}>71% favorability</p>
                    <Delta v={+(cq.exi - pq.exi).toFixed(1)} lg />
                    <div style={{ marginTop: 14, marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--color-text-tertiary)", marginBottom: 4 }}>
                            <span>vs {benchmark.label}</span><span>{benchmark.value}</span>
                        </div>
                        <div style={{ position: "relative", height: 8, borderRadius: 999, background: "#edf2fc", border: "1px solid #d3def2" }}>
                            <div style={{ height: "100%", borderRadius: 999, width: `${cq.exi}%`, background: "linear-gradient(90deg, #001689 0%, #5f35a1 100%)" }} />
                            <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: `${benchmark.value}%`, width: 1.5, height: 11, background: T.purple.bar, borderRadius: 1 }} />
                        </div>
                    </div>
                    <span style={{ ...pill(cq.exi >= benchmark.value ? T.green : T.amber), fontSize: 11, padding: "4px 10px", gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: cq.exi >= benchmark.value ? T.green.bar : T.amber.bar }} />
                        {cq.exi >= benchmark.value ? "Above benchmark" : "Below benchmark"}
                    </span>
                    {partial > 0 && (
                        <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: "var(--border-radius-md)", background: T.amber.bg, border: `0.5px solid ${T.amber.border}` }}>
                            <p style={{ fontSize: 10, color: T.amber.text, lineHeight: 1.5, margin: 0 }}>  {partial} drivers have partial dept coverage.</p>
                        </div>
                    )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(170px,1fr))", gap: 10 }}>
                    {[
                        { label: "Participation rate", val: `${cq.participation}%`, sub: `vs ${benchmark.participation}% benchmark` },
                        { label: "Avg response rate", val: `${cq.responseRate}%`, sub: "across all surveys" },
                        { label: "Survey burden", val: cq.burden.toFixed(1), sub: "surveys per employee" },
                        { label: "Drop-off rate", val: `${cq.dropoff}%`, sub: `–¼ ${pq.dropoff - cq.dropoff}% improved` },
                        { label: "eNPS", val: cq.eNPS > 0 ? `+${cq.eNPS}` : String(cq.eNPS), sub: `benchmark +${benchmark.eNPS}` },
                        { label: "mNPS", val: cq.mNPS > 0 ? `+${cq.mNPS}` : String(cq.mNPS), sub: `vs ${pq.mNPS > 0 ? "+" : ""}${pq.mNPS} prev` },
                        { label: "Confidence model", val: "High", sub: "4-factor" },
                        { label: "Top drag", val: "Comp & Benefits", sub: "–¼ 8.1 pts", danger: true },
                    ].map((k, i) => (
                        <div key={i} style={{ ...surf, background: "#ffffff", border: "1px solid #d8e1f2", position: "relative", overflow: "hidden", boxShadow: "0 10px 20px -22px rgba(0,22,137,0.35)" }}>
                            <div style={{ position: "absolute", inset: "0 auto auto 0", width: "100%", height: 3, background: metricAccents[i].bar }} />
                            <p style={{ ...lbl, marginBottom: 8 }}>{k.label}</p>
                            <p style={{ fontSize: k.val.toString().length > 8 ? 16 : 26, fontWeight: 700, color: k.danger ? "var(--color-text-danger)" : "var(--color-text-primary)", lineHeight: 1.1, margin: "0 0 6px" }}>{k.val}</p>
                            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{k.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ ...sectionCard, background: "white", border: "1px solid #cfdaf0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                    <div>
                        <p style={{ ...h3s, marginBottom: 4 }}>Quarter over quarter ” {cq.q} vs {pq.q}</p>
                        <p style={{ ...subs, marginBottom: 0 }}>Current quarter vs previous quarter</p>
                    </div>
                    <span style={{ ...pill(T.blue), fontSize: 10, fontWeight: 700, padding: "4px 9px" }}>Performance Delta</span>
                </div>
                <div style={{ height: 1, background: "linear-gradient(90deg, rgba(0,22,137,0.22) 0%, rgba(46,165,180,0.16) 48%, rgba(95,53,161,0.15) 100%)", marginBottom: 14 }} />
                <KpiStrip metrics={[
                    { label: "EXI Score", current: cq.exi, previous: pq.exi, unit: "/100", dec: 0 },
                    { label: "Participation", current: cq.participation, previous: pq.participation, unit: "%", dec: 1 },
                    { label: "Response rate", current: cq.responseRate, previous: pq.responseRate, unit: "%", dec: 1 },
                    { label: "Burden", current: cq.burden, previous: pq.burden, unit: "surveys", dec: 1, higherIsBetter: false },
                    { label: "Drop-off", current: cq.dropoff, previous: pq.dropoff, unit: "%", dec: 0, higherIsBetter: false },
                    { label: "eNPS", current: cq.eNPS, previous: pq.eNPS, dec: 0 },
                    { label: "mNPS", current: cq.mNPS, previous: pq.mNPS, dec: 0 },
                ]} />
                <p style={{ ...lbl, marginTop: 14, marginBottom: 8, color: "rgb(0,22,137)" }}>Driver deltas {pq.q} †’ {cq.q}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {DRIVERS.map(d => {
                        const c = d.delta > 0 ? T.green : d.delta < 0 ? T.red : T.gray;
                        return (
                            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 999, background: `linear-gradient(180deg, ${c.bg} 0%, #ffffff 100%)`, border: `1px solid ${c.border}`, boxShadow: "0 10px 16px -14px rgba(0,22,137,0.5)" }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.bar, flexShrink: 0 }} />
                                <span style={{ fontSize: 11, color: "var(--color-text-primary)", fontWeight: 600 }}>{d.name.split(" ")[0]}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: c.text }}>{fmtD(d.delta)}</span>
                                {d.tier !== "full" && <CovPill tier={d.tier} covered={d.coveredDepts.length} total={TOTAL} />}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={sectionCard}>
                <p style={h3s}>EXI history · last {hist.length} quarters</p>
                <p style={{ ...subs, marginBottom: 14 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                <ResponsiveContainer width="100%" height={180}>
                    <ComposedChart data={hist} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                        <XAxis dataKey="q" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[60, 82]} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 3" strokeWidth={1} />
                        <Tooltip content={<TT />} />
                        <Area type="monotone" dataKey="exi" name="EXI" stroke={T.blue.bar} fill={T.blue.bar} fillOpacity={0.12} strokeWidth={2.5} dot={{ r: 4, fill: T.blue.bar, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div style={{ ...sectionCard, background: "white", border: "1px solid #cfdaf0" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
                        <p style={h3s}>Retention risk</p>
                        <span style={{ ...pill(T.blue), fontSize: 9, fontWeight: 700 }}>Dept deep dive</span>
                    </div>
                    <div style={{ height: 1, background: "linear-gradient(90deg, rgba(0,22,137,0.24) 0%, rgba(46,165,180,0.18) 100%)", marginBottom: 8 }} />
                    {risks.map((r, i) => {
                        const c = r.tier === "high" ? T.red : r.tier === "medium" ? T.amber : T.green;
                        return (
                            <div key={i} onClick={() => onDeptClick(r.dept)}
                                style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 8px", borderBottom: i < risks.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none", cursor: "pointer", borderRadius: 10, background: i % 2 === 0 ? "rgba(243,247,255,0.55)" : "transparent" }}>
                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.bar, flexShrink: 0, boxShadow: `0 0 0 3px ${c.bg}` }} />
                                <span style={{ fontSize: 12, flex: 1, color: "var(--color-text-primary)" }}>{r.dept}</span>
                                <span style={{ ...pill(c), fontSize: 9, fontWeight: 700 }}>{r.tier === "high" ? "High" : r.tier === "medium" ? "Med" : "Low"}</span>
                                <span
                                    style={{ minWidth: 56, display: "inline-flex", justifyContent: "flex-end", flexShrink: 0, fontSize: 9, color: "var(--color-text-tertiary)", fontVariantNumeric: "tabular-nums" }}
                                    aria-label={r.flags.length > 0 ? `${r.flags.length} flags: ${r.flags.join(", ")}` : "No risk flags"}
                                >
                                    {r.flags.length > 0 ? (
                                        <span title={r.flags.join(" · ")} style={{ cursor: "help" }}>{r.flags.length} flags</span>
                                    ) : (
                                        <span style={{ opacity: 0.35 }}>”</span>
                                    )}
                                </span>
                                <ChevronRight size={11} color="var(--color-text-tertiary)" style={{ flexShrink: 0 }} />
                            </div>
                        );
                    })}
                </div>
                <div style={{ ...sectionCard, background: "white", border: "1px solid #cfdcf0" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
                        <p style={{ ...h3s, marginBottom: 0 }}>Hotspot watch</p>
                        <span style={{ ...pill(T.teal), fontSize: 9, fontWeight: 700 }}>Live patterns</span>
                    </div>
                    <div style={{ height: 1, background: "linear-gradient(90deg, rgba(46,165,180,0.24) 0%, rgba(0,22,137,0.14) 100%)", marginBottom: 8 }} />
                    {HOTSPOTS.map((h, i) => {
                        const c = h.risk === "high" ? T.red : h.risk === "med" ? T.amber : T.gray;
                        return (
                            <div key={i} onClick={() => onDeptClick(h.dept)}
                                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "linear-gradient(95deg, rgba(243,247,255,0.95) 0%, rgba(255,255,255,0.95) 100%)", marginBottom: 7, cursor: "pointer", border: "1px solid #d2dbef", boxShadow: "0 10px 16px -16px rgba(0,22,137,0.5)" }}>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>{h.dept}</p>
                                    <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{h.pattern}</p>
                                </div>
                                <span style={{ ...pill(c), flexShrink: 0 }}>{h.risk === "high" ? "High" : h.risk === "med" ? "Med" : "Low"}</span>
                            </div>
                        );
                    })}
                </div>
                <div style={{ ...sectionCard, background: "white", border: "1px solid #cfd9ef" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
                        <p style={{ ...h3s, marginBottom: 0 }}>Signal mix</p>
                        <span style={{ ...pill(T.purple), fontSize: 9, fontWeight: 700 }}>Source balance</span>
                    </div>
                    <div style={{ height: 1, background: "linear-gradient(90deg, rgba(95,53,161,0.24) 0%, rgba(0,22,137,0.16) 100%)", marginBottom: 10 }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <PieChart width={100} height={100}>
                            <Pie data={SIGNAL_MIX} cx={48} cy={48} innerRadius={28} outerRadius={48} dataKey="value" strokeWidth={0}>
                                {SIGNAL_MIX.map((sm, i) => <Cell key={i} fill={sm.color} />)}
                            </Pie>
                        </PieChart>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
                            {SIGNAL_MIX.map((sm, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 6px", borderRadius: 8, background: "rgba(255,255,255,0.7)" }}>
                                    <span style={{ width: 9, height: 9, borderRadius: 3, background: sm.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)", flex: 1 }}>{sm.name}</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-primary)" }}>{sm.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ ...sectionCard, background: "linear-gradient(180deg, #f6f8ff 0%, #edf3ff 100%)", border: "1px solid #c7d4ef" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Sparkles size={14} color="rgb(0,22,137)" />
                    <p style={{ fontSize: 13, fontWeight: 600, color: "rgb(0,22,137)", margin: 0 }}>AI Summary · {cq.q}</p>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--color-text-primary)", margin: 0 }}>
                    EXI is <strong style={{ fontWeight: 500 }}>{cq.exi}</strong>, {cq.exi >= benchmark.value ? "above" : "below"} the {benchmark.label} benchmark of {benchmark.value}. Participation at {cq.participation}%. <strong style={{ fontWeight: 500 }}>Compensation & Benefits is the primary drag</strong> at 58 (ˆ’8.1 pts). {partial} drivers have partial coverage. eNPS +{cq.eNPS} vs benchmark +{benchmark.eNPS}.
                </p>
            </div>
        </div>
    );
};

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
                    {[{ color: T.green.bar, label: "Healthy ‰¥75" }, { color: T.amber.bar, label: "Watch 65“74" }, { color: T.red.bar, label: "Alert <65" }].map(({ color, label }) => (
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
                                    {isAlert && <span style={{ ...pill(T.red), fontSize: 9, padding: "1px 6px" }}>  Alert</span>}
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
                                        <span style={{ color: T.green.bar }}></span> Full coverage
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
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drivers…"
                        style={{ fontSize: 13, flex: 1, fontFamily: "inherit", border: "none", background: "transparent", outline: "none", boxShadow: "none", padding: "2px 0", color: "var(--color-text-primary)" }} />
                    {search && (
                        <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--color-text-tertiary)", display: "flex", alignItems: "center" }}>
                            <X size={13} />
                        </button>
                    )}
                </div>
                <div style={{ display: "flex", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 3, gap: 2 }}>
                    {["score", "delta", "name"].map(k => (
                        <button key={k} onClick={() => setSort(k)} style={{ fontSize: 11, padding: "6px 12px", borderRadius: "var(--border-radius-md)", fontWeight: sort === k ? 600 : 400, border: "none", cursor: "pointer", fontFamily: "inherit", background: sort === k ? "var(--color-background-primary)" : "transparent", color: sort === k ? "var(--color-primary)" : "var(--color-text-secondary)", boxShadow: sort === k ? "0 0 0 1px var(--color-border-secondary), 0 2px 6px -2px rgba(0,22,137,.12)" : "none", transition: "all 150ms ease" }}>
                            {k === "score" ? "Score ↓" : k === "delta" ? "Change" : "A–Z"}
                        </button>
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

const TrendsTab = ({ selIdx, benchmark }) => {
    const [mode, setMode] = useState("quarterly");
    const [dept, setDept] = useState("Engineering");
    const hist = trendSlice(selIdx);
    const deptArr = DEPT_HIST[dept] || [];
    const deptData = deptArr.slice(Math.max(0, selIdx - TREND_Q + 1), selIdx + 1);
    const lastScore = deptData.length > 0 ? deptData[deptData.length - 1].score : 72;
    const annualD = ANNUAL.map((yr, i) => ({ ...yr, exiDelta: i > 0 ? yr.exi - ANNUAL[i - 1].exi : 0 }));
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 3, gap: 2 }}>
                    {[["quarterly", "Quarterly"], ["annual", "Annual / YoY"]].map(([k, l]) => (
                        <button key={k} onClick={() => setMode(k)} style={{ fontSize: 12, padding: "6px 14px", borderRadius: "var(--border-radius-md)", fontWeight: mode === k ? 500 : 400, border: "none", cursor: "pointer", fontFamily: "inherit", background: mode === k ? "var(--color-background-primary)" : "transparent", color: mode === k ? "var(--color-text-primary)" : "var(--color-text-secondary)", boxShadow: mode === k ? "0 0 0 0.5px var(--color-border-secondary)" : "none" }}>{l}</button>
                    ))}
                </div>
                <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
                    {mode === "quarterly" ? `Last ${hist.length} quarters` : "All years · aggregated from quarterly data"}
                </span>
            </div>

            {mode === "quarterly" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={card}>
                        <p style={h3s}>Driver score trends · last {hist.length} quarters</p>
                        <p style={{ ...subs, marginBottom: 14 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={hist} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                                <XAxis dataKey="q" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                <YAxis domain={[45, 90]} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 3" strokeWidth={1} />
                                <Tooltip content={<TT />} />
                                {[["recognition", "Recognition", T.green.bar], ["manager", "Manager Eff.", T.amber.bar], ["comp", "Comp & Ben.", T.red.bar], ["wellbeing", "Wellbeing", T.blue.bar], ["belonging", "Belonging", T.purple.bar], ["leadership", "Leadership", "#2c57b8"]].map(([k, l, c]) => (
                                    <Line key={k} type="monotone" dataKey={k} name={l} stroke={c} strokeWidth={1.5} dot={{ r: 2.5, fill: c, strokeWidth: 0 }} activeDot={{ r: 4 }} />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={card}>
                            <p style={{ ...h3s, marginBottom: 12 }}>Department EXI ” QoQ</p>
                            {ALL_DEPTS.map((dep, i) => {
                                const curr = DEPT_EXI[dep]?.[selIdx] || 0;
                                const prev = DEPT_EXI[dep]?.[selIdx - 1] || 0;
                                const delta = curr - prev;
                                return (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < ALL_DEPTS.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                                        <span style={{ fontSize: 12, width: 120, flexShrink: 0, color: "var(--color-text-primary)" }}>{dep}</span>
                                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--color-background-secondary)" }}>
                                            <div style={{ height: 4, borderRadius: 2, width: `${curr}%`, background: scoreBar(curr) }} />
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 500, width: 22, textAlign: "right", color: "var(--color-text-primary)" }}>{curr}</span>
                                        <span style={{ fontSize: 11, width: 28, textAlign: "right", color: delta > 0 ? T.green.text : delta < 0 ? T.red.text : T.gray.text }}>{delta > 0 ? "–²" : delta < 0 ? "–¼" : "†’"}{Math.abs(delta)}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={card}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                                <div><p style={{ ...h3s, margin: 0 }}>Dept EXI trend</p><p style={subs}>Last {deptData.length} quarters</p></div>
                                <select className="analytics-select" value={dept} onChange={e => setDept(e.target.value)} style={{ fontSize: 12, padding: "6px 10px", fontFamily: "inherit", cursor: "pointer" }}>
                                    {ALL_DEPTS.map(d => <option key={d}>{d}</option>)}
                                </select>
                            </div>
                            <ResponsiveContainer width="100%" height={190}>
                                <ComposedChart data={deptData} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                                    <XAxis dataKey="q" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[50, 90]} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                    <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 2" strokeWidth={1} />
                                    <Tooltip content={<TT />} />
                                    <Area type="monotone" dataKey="score" name={dept} stroke={scoreBar(lastScore)} fill={scoreBar(lastScore)} fillOpacity={0.07} strokeWidth={1.5} dot={{ r: 3, strokeWidth: 0, fill: scoreBar(lastScore) }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={card}>
                        <p style={h3s}>Annual EXI ” year over year</p>
                        <p style={{ ...subs, marginBottom: 14 }}>Dashed = {benchmark.label} ({benchmark.value})</p>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${ANNUAL.length},minmax(0,1fr))`, gap: 10, marginBottom: 16 }}>
                            {annualD.map((yr, i) => (
                                <div key={i} style={surf}>
                                    <p style={{ ...lbl, marginBottom: 6 }}>{yr.label}</p>
                                    <p style={{ fontSize: 24, fontWeight: 500, color: scoreBar(yr.exi), lineHeight: 1, margin: 0 }}>{yr.exi}</p>
                                    <p style={{ fontSize: 11, fontWeight: 500, color: yr.exiDelta > 0 ? T.green.text : yr.exiDelta < 0 ? T.red.text : T.gray.text, marginTop: 4 }}>
                                        {i === 0 ? "baseline" : yr.exiDelta > 0 ? `–² +${yr.exiDelta}` : yr.exiDelta < 0 ? `–¼ ${yr.exiDelta}` : "†’ 0"} YoY
                                    </p>
                                    <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 2 }}>{yr.qs} quarters</p>
                                </div>
                            ))}
                        </div>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={annualD} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                <YAxis domain={[60, 80]} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                <ReferenceLine y={benchmark.value} stroke={T.purple.bar} strokeDasharray="4 2" strokeWidth={1} />
                                <Tooltip content={<TT />} />
                                <Bar dataKey="exi" name="Annual EXI avg" fill={T.green.bar} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={card}>
                        <p style={{ ...h3s, marginBottom: 14 }}>Year-over-year comparison</p>
                        <div style={{ overflowX: "auto" }}>
                            <table className="analytics-data-table" style={{ fontSize: 12 }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", padding: "6px 10px", fontSize: 11, color: "var(--color-text-tertiary)", fontWeight: 500, borderBottom: "0.5px solid var(--color-border-tertiary)" }}>Metric</th>
                                        {ANNUAL.map(yr => <th key={yr.yr} style={{ textAlign: "center", padding: "6px 10px", fontSize: 11, color: "var(--color-text-tertiary)", fontWeight: 500, borderBottom: "0.5px solid var(--color-border-tertiary)" }}>{yr.label}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {["exi", "participation", "comp", "manager", "recognition", "eNPS"].map((k, ri) => (
                                        <tr key={k} style={{ background: ri % 2 === 0 ? "var(--color-background-secondary)" : "transparent" }}>
                                            <td style={{ padding: "8px 10px", color: "var(--color-text-primary)", fontWeight: 600 }}>{k === "exi" ? "EXI" : k === "eNPS" ? "eNPS" : k.charAt(0).toUpperCase() + k.slice(1)}</td>
                                            {ANNUAL.map((yr, i) => {
                                                const prev = i > 0 ? ANNUAL[i - 1][k] : null;
                                                const delta = prev !== null ? yr[k] - prev : null;
                                                return (
                                                    <td key={yr.yr} style={{ textAlign: "center", padding: "8px 10px" }}>
                                                        <span style={{ fontWeight: 500, color: scoreBar(yr[k] || 0) }}>{yr[k]}</span>
                                                        {delta !== null && <span style={{ fontSize: 10, color: delta > 0 ? T.green.text : delta < 0 ? T.red.text : T.gray.text, marginLeft: 4 }}>{delta > 0 ? "+" : ""}{delta}</span>}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const HeatmapTab = ({ onDeptClick }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Privacy notice banner ── */}
        <div style={{
            display: "flex", alignItems: "center", gap: 16, padding: "14px 20px",
            borderRadius: "var(--border-radius-lg)",
            background: "linear-gradient(100deg,#eff6ff 0%,#ffffff 100%)",
            border: "1px solid #bfdbfe", boxShadow: "0 2px 8px rgba(0,102,255,.06)",
            position: "relative", overflow: "hidden"
        }}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, borderRadius: "4px 0 0 4px", background: "linear-gradient(180deg,#60a5fa,#3b82f6)" }} />
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#eff6ff,#dbeafe)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #bfdbfe" }}>
                <EyeOff size={18} color="#3b82f6" />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>Data privacy · Rule of {ANON}</p>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 100, padding: "1px 8px", textTransform: "uppercase", letterSpacing: ".05em" }}>Active</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
                    Cells with fewer than <strong style={{ color: "#2563eb" }}>{ANON} respondents</strong> are hidden to protect employee privacy. Click any department name to open its full profile.
                </p>
            </div>
        </div>

        {/* ── Main heatmap card ── */}
        <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.1)", border: "1px solid var(--color-border-secondary)" }}>

            {/* gradient hero header */}
            <div style={{ padding: "26px 28px 22px", background: "linear-gradient(130deg,#1e3a5f 0%,#1d4ed8 55%,#7c3aed 100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
                <div style={{ position: "absolute", bottom: -70, right: 100, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <span style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,.2)", fontSize: 10, fontWeight: 700, color: "#ffffff", textTransform: "uppercase", letterSpacing: ".08em" }}>Heatmap</span>
                        <span style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,.12)", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,.85)", letterSpacing: ".04em" }}>Q2 2026</span>
                    </div>
                    <p style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", margin: "0 0 5px", letterSpacing: "-0.02em" }}>Department · Driver Heatmap</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", margin: 0 }}>Systemic organizational health benchmark across all departments and engagement drivers</p>
                </div>
            </div>

            {/* heat-scale reference bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 28px", background: "#f8faff", borderBottom: "1px solid var(--color-border-tertiary)" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: ".08em", whiteSpace: "nowrap" }}>Score scale</span>
                <div style={{ display: "flex", gap: 3, flex: 1 }}>
                    {[["< 60", T.red.bg, T.red.border, T.red.text], ["60–65", "#fff3e0", "#ffe0b2", "#e65100"], ["66–71", T.amber.bg, T.amber.border, T.amber.text], ["72–77", T.blue.bg, T.blue.border, T.blue.text], ["78+", T.green.bg, T.green.border, T.green.text]].map(([lbl, bg, bdr, txt]) => (
                        <div key={lbl} style={{ flex: 1, padding: "5px 4px", background: bg, border: `1px solid ${bdr}`, borderRadius: 6, textAlign: "center" }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: txt }}>{lbl}</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 8, background: "#ffffff", border: "1px solid var(--color-border-tertiary)", whiteSpace: "nowrap" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: T.gray.bg, border: `1px dashed ${T.gray.border}` }} />
                    <span style={{ fontSize: 11, color: T.gray.text, fontWeight: 600 }}>Suppressed</span>
                </div>
            </div>

            {/* scrollable table */}
            <div style={{ padding: "20px 28px", overflowX: "auto", background: "#ffffff" }}>
                <table className="analytics-data-table" style={{ borderCollapse: "separate", borderSpacing: 4, width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ width: 148, textAlign: "left", fontSize: 10, color: "var(--color-text-tertiary)", fontWeight: 700, padding: "0 8px 14px", textTransform: "uppercase", letterSpacing: ".08em" }}>Department</th>
                            {HM_DRV.map(d => (
                                <th key={d} style={{ fontSize: 9, color: "var(--color-text-tertiary)", fontWeight: 700, textAlign: "center", width: 70, padding: "0 4px 14px", lineHeight: 1.3, verticalAlign: "bottom", textTransform: "uppercase", letterSpacing: ".04em" }}>{d}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {HM_DEPT.map((dep, di) => (
                            <tr key={dep}
                                onMouseEnter={e => { e.currentTarget.style.background = "#f0f6ff"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                                style={{ transition: "background 120ms ease" }}
                            >
                                <td onClick={() => onDeptClick(dep.replace("HR Immig.", "HR Immigration"))}
                                    style={{ padding: "6px 8px 6px 0", whiteSpace: "nowrap", cursor: "pointer" }}
                                    onMouseEnter={e => { const s = e.currentTarget.querySelector("span"); if (s) s.style.color = "#1d4ed8"; }}
                                    onMouseLeave={e => { const s = e.currentTarget.querySelector("span"); if (s) s.style.color = "#3b82f6"; }}
                                >
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", borderBottom: "1.5px solid #bfdbfe", paddingBottom: 1, transition: "color 150ms ease" }}>{dep}</span>
                                </td>
                                {(HM_SCORES[di] || []).map((score, si) => (
                                    <td key={si} style={{ padding: 2 }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 120ms ease" }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.14)"; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                                        >
                                            <HeatCell score={score} resp={(HM_RESP[di] || [])[si]} />
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* ── Bottom two summary cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* Coverage summary card */}
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #bbf7d0", boxShadow: "0 2px 12px rgba(22,163,74,.07)" }}>
                <div style={{ padding: "16px 20px", background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderBottom: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "#ffffff", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Target size={15} color="#16a34a" />
                    </div>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#166534", margin: 0 }}>Coverage Summary</p>
                        <p style={{ fontSize: 11, color: "#15803d", margin: 0 }}>Drivers with partial department coverage</p>
                    </div>
                </div>
                <div style={{ padding: "14px 20px", background: "#ffffff" }}>
                    {DRIVERS.filter(d => d.tier !== "full").map((d, i) => (
                        <div key={i}
                            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 8, background: covColor(d.tier).bg, border: `1px solid ${covColor(d.tier).border}`, transition: "transform 120ms ease, box-shadow 120ms ease" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.06)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                            <d.Icon size={14} color={covColor(d.tier).text} style={{ marginTop: 2, flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3, flexWrap: "wrap" }}>
                                    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>{d.name}</p>
                                    <CovPill tier={d.tier} covered={d.coveredDepts.length} total={TOTAL} />
                                    {d.intentionalScope && <span style={{ ...pill(T.blue), fontSize: 9 }}>Intentional</span>}
                                </div>
                                <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: 0 }}>Excluded: {d.excluded.join(", ") || "None"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Critical intersections card */}
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #fecdd3", boxShadow: "0 2px 12px rgba(220,38,38,.07)" }}>
                <div style={{ padding: "16px 20px", background: "linear-gradient(135deg,#fff1f2,#ffe4e6)", borderBottom: "1px solid #fecdd3", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "#ffffff", border: "1px solid #fecdd3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <AlertTriangle size={15} color="#dc2626" />
                    </div>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#991b1b", margin: 0 }}>Critical Intersections</p>
                        <p style={{ fontSize: 11, color: "#b91c1c", margin: 0 }}>Dept × driver combinations scoring below 60</p>
                    </div>
                </div>
                <div style={{ padding: "14px 20px", background: "#ffffff" }}>
                    {HM_DEPT
                        .flatMap((dep, di) => (HM_SCORES[di] || []).map((score, si) => ({ dep, drv: HM_DRV[si], score, resp: (HM_RESP[di] || [])[si] })))
                        .filter(x => x.score !== null && x.score < 60 && (x.resp || 0) >= ANON)
                        .sort((a, b) => a.score - b.score)
                        .slice(0, 6)
                        .map((x, i) => (
                            <div key={i}
                                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: i === 0 ? "#fff1f2" : T.red.bg, border: `1px solid ${i === 0 ? "#fca5a5" : T.red.border}`, marginBottom: 8, transition: "transform 120ms ease, box-shadow 120ms ease" }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(220,38,38,.08)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <div style={{ width: 24, height: 24, borderRadius: "50%", background: i === 0 ? "#dc2626" : "#fca5a5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: i === 0 ? "#ffffff" : "#7f1d1d" }}>#{i + 1}</span>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: T.red.text, margin: "0 0 1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{x.dep}</p>
                                    <p style={{ fontSize: 11, color: T.red.text, margin: 0, opacity: 0.8 }}>{x.drv}</p>
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <p style={{ fontSize: 22, fontWeight: 800, color: T.red.text, margin: 0, lineHeight: 1 }}>{x.score}</p>
                                    <p style={{ fontSize: 9, color: T.red.text, margin: "2px 0 0", opacity: 0.7, textTransform: "uppercase", letterSpacing: ".04em" }}>Score</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    </div>
);

const SegmentsTab = () => {
    const [seg, setSeg] = useState("tenure");
    const data = seg === "tenure" ? TENURE : ROLES;
    const xKey = seg === "tenure" ? "tenure" : "level";
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ ...card, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 3, gap: 2 }}>
                        {[["tenure", "By tenure"], ["role", "By role level"]].map(([k, l]) => (
                            <button key={k} onClick={() => setSeg(k)} style={{ fontSize: 12, padding: "7px 14px", borderRadius: "var(--border-radius-md)", fontWeight: seg === k ? 700 : 500, border: "none", cursor: "pointer", fontFamily: "inherit", background: seg === k ? "var(--color-background-primary)" : "transparent", color: seg === k ? "var(--color-text-primary)" : "var(--color-text-secondary)", boxShadow: seg === k ? "0 0 0 1px var(--color-border-secondary)" : "none" }}>{l}</button>
                        ))}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)" }}>
                        <Info size={14} color="var(--color-text-tertiary)" />
                        Segment scores are current quarter only.
                    </div>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${data.length},minmax(0,1fr))`, gap: 10 }}>
                {data.map((t, i) => {
                    const warn = seg === "tenure" && i === 3;
                    return (
                        <div key={i} style={{ ...card, border: warn ? `0.5px solid ${T.amber.border}` : "0.5px solid var(--color-border-tertiary)", padding: "14px 16px" }}>
                            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 2px", lineHeight: 1.3 }}>{t[xKey]}</p>
                            <p style={{ ...subs, marginBottom: 10 }}>{t.n} employees</p>
                            <p style={{ fontSize: 24, fontWeight: 500, color: scoreBar(t.exi), lineHeight: 1, marginBottom: 10 }}>{t.exi}</p>
                            {[["Comp", t.comp, T.red.bar], ["Manager", t.manager, T.amber.bar], ["Wellbeing", t.wellbeing, T.blue.bar]].map(([label, val, clr]) => (
                                <div key={label} style={{ marginBottom: 6 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--color-text-tertiary)", marginBottom: 2 }}>
                                        <span>{label}</span><span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{val}</span>
                                    </div>
                                    <div style={{ height: 3, borderRadius: 2, background: "var(--color-background-secondary)" }}>
                                        <div style={{ height: 3, borderRadius: 2, width: `${val}%`, background: clr }} />
                                    </div>
                                </div>
                            ))}
                            {warn && <span style={{ ...pill(T.amber), marginTop: 8, fontSize: 10, gap: 4 }}><AlertTriangle size={8} /> Watch</span>}
                        </div>
                    );
                })}
            </div>
            <div style={card}>
                <p style={h3s}>EXI by {seg === "tenure" ? "tenure" : "role level"}</p>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -24 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                        <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[45, 90]} tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                        <ReferenceLine y={72} stroke={T.purple.bar} strokeDasharray="4 2" strokeWidth={1} />
                        <Tooltip content={<TT />} />
                        <Bar dataKey="exi" name="EXI" fill={T.green.bar} radius={[3, 3, 0, 0]} />
                        <Bar dataKey="comp" name="Comp & Ben." fill={T.red.bar} radius={[3, 3, 0, 0]} />
                        <Bar dataKey="wellbeing" name="Wellbeing" fill={T.blue.bar} radius={[3, 3, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const QuestionsTab = () => {
    const [qt, setQt] = useState("bottom");
    const QTABS = [{ k: "top", l: "Top questions", desc: "Highest scoring" }, { k: "bottom", l: "Bottom questions", desc: "Lowest scoring" }, { k: "mover_up", l: "Rising fastest", desc: "Biggest positive movers" }, { k: "mover_down", l: "Falling fastest", desc: "Biggest negative movers" }];
    const curr = QTABS.find(t => t.k === qt) || QTABS[0];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 3, gap: 2, width: "fit-content" }}>
                {QTABS.map(t => (
                    <button key={t.k} onClick={() => setQt(t.k)} style={{ fontSize: 12, padding: "6px 12px", borderRadius: "var(--border-radius-md)", fontWeight: qt === t.k ? 500 : 400, border: "none", cursor: "pointer", fontFamily: "inherit", background: qt === t.k ? "var(--color-background-primary)" : "transparent", color: qt === t.k ? "var(--color-text-primary)" : "var(--color-text-secondary)", boxShadow: qt === t.k ? "0 0 0 0.5px var(--color-border-secondary)" : "none" }}>{t.l}</button>
                ))}
            </div>
            <div style={card}>
                <p style={h3s}>{curr.l}</p>
                <p style={{ ...subs, marginBottom: 14 }}>{curr.desc} · current vs previous quarter</p>
                {QUESTIONS.filter(q => q.type === qt).map((q, i, arr) => {
                    const sc = scoreT(q.score);
                    return (
                        <div key={q.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 0", borderBottom: i < arr.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                            <div style={{ width: 26, height: 26, borderRadius: "var(--border-radius-md)", background: sc.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                <span style={{ fontSize: 10, fontWeight: 500, color: sc.text }}>#{i + 1}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.5, margin: "0 0 6px" }}>"{q.text}"</p>
                                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                    <span style={pill(T.blue)}>{q.driver}</span>
                                    <span style={pill(T.gray)}>{q.survey}</span>
                                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{q.responses} responses</span>
                                </div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "flex-end", marginBottom: 4 }}>
                                    <span style={{ fontSize: 18, fontWeight: 500, color: sc.text }}>{q.score}</span>
                                    <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>/ {q.prevScore} prev</span>
                                </div>
                                <Delta v={q.delta} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ParticipationTab = ({ selIdx, onDeptClick }) => {
    const cq = QH[selIdx];
    const pq = QH[selIdx - 1] || QH[0];
    const hist = trendSlice(selIdx);
    const [exp, setExp] = useState(null);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={card}>
                <p style={h3s}>Participation & health ” QoQ · {cq.q} vs {pq.q}</p>
                <p style={{ ...subs, marginBottom: 14 }}>Current quarter vs previous quarter</p>
                <KpiStrip metrics={[
                    { label: "Participation rate", current: cq.participation, previous: pq.participation, unit: "%", dec: 1, note: "Surveys run: Q2=6, Q1=5" },
                    { label: "Avg response rate", current: cq.responseRate, previous: pq.responseRate, unit: "%", dec: 1 },
                    { label: "Survey burden", current: cq.burden, previous: pq.burden, unit: "surveys", dec: 1, higherIsBetter: false },
                    { label: "Drop-off rate", current: cq.dropoff, previous: pq.dropoff, unit: "%", dec: 0, higherIsBetter: false },
                ]} />
            </div>
            <div style={card}>
                <p style={h3s}>Dept — survey participation matrix</p>
                <p style={{ ...subs, marginBottom: 14 }}>Click dept name to open profile · grey = suppressed</p>
                <div style={{ overflowX: "auto" }}>
                    <table className="analytics-data-table" style={{ borderCollapse: "separate", borderSpacing: 4, width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", fontSize: 10, color: "var(--color-text-tertiary)", fontWeight: 500, padding: "0 8px 8px 0", whiteSpace: "nowrap" }}>Department</th>
                                {SURVEY_TYPES.map(st => <th key={st} style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontWeight: 500, textAlign: "center", padding: "0 4px 8px", whiteSpace: "nowrap" }}>{st}</th>)}
                                <th style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontWeight: 500, textAlign: "center", padding: "0 4px 8px" }}>Avg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ALL_DEPTS.map(dep => {
                                const rates = DEPT_SURVEY[dep] || {};
                                const deptRespCount = cq.deptResp?.[dep] || 0;
                                const validRates = SURVEY_TYPES.map(st => rates[st]).filter(r => r !== null && r !== undefined);
                                const avg = validRates.length > 0 ? Math.round(validRates.reduce((s, r) => s + r, 0) / validRates.length) : null;
                                return (
                                    <tr key={dep}>
                                        <td onClick={() => onDeptClick(dep)} style={{ fontSize: 12, fontWeight: 500, color: T.blue.text, padding: "3px 8px 3px 0", whiteSpace: "nowrap", cursor: "pointer", textDecoration: "underline", textDecorationColor: T.blue.border }}>{dep}</td>
                                        {SURVEY_TYPES.map(st => {
                                            const rate = rates[st];
                                            if (rate === null || rate === undefined) return <td key={st} style={{ padding: 3 }}><div style={{ width: 72, height: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-background-secondary)", border: "0.5px dashed var(--color-border-tertiary)", fontSize: 11, color: "var(--color-text-tertiary)" }}>”</div></td>;
                                            if (deptRespCount < ANON) return <td key={st} style={{ padding: 3 }}><div title={`Only ${deptRespCount} responses`} style={{ width: 72, height: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, background: T.gray.bg, border: `0.5px dashed ${T.gray.border}`, fontSize: 10, color: T.gray.text, cursor: "help" }}><EyeOff size={9} />n&lt;{ANON}</div></td>;
                                            const c = rate >= 80 ? T.green : rate >= 60 ? T.amber : T.red;
                                            return <td key={st} style={{ padding: 3 }}><div style={{ width: 72, height: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, background: c.bg, color: c.text }}>{rate}%</div></td>;
                                        })}
                                        <td style={{ padding: 3 }}>
                                            {avg !== null && deptRespCount >= ANON
                                                ? <div style={{ width: 48, height: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, background: avg >= 70 ? T.green.bg : T.amber.bg, color: avg >= 70 ? T.green.text : T.amber.text }}>{avg}%</div>
                                                : <div style={{ width: 48, height: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--color-text-tertiary)", background: "var(--color-background-secondary)" }}>”</div>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={card}>
                    <p style={h3s}>Participation rate history · last {hist.length} quarters</p>
                    <ResponsiveContainer width="100%" height={150}>
                        <ComposedChart data={hist} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                            <XAxis dataKey="q" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                            <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                            <Tooltip content={<TT />} />
                            <Area type="monotone" dataKey="participation" name="Participation %" stroke={T.green.bar} fill={T.green.bar} fillOpacity={0.07} strokeWidth={1.5} dot={{ r: 3, fill: T.green.bar, strokeWidth: 0 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div style={card}>
                    <p style={h3s}>Survey run history ” {cq.q}</p>
                    <p style={{ ...subs, marginBottom: 12 }}>Click to expand</p>
                    {SURVEY_RUNS.map((run, i) => {
                        const delta = run.rate - run.prevRate;
                        return (
                            <div key={i} style={{ borderBottom: i < SURVEY_RUNS.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                                <div onClick={() => setExp(exp === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 0", cursor: "pointer" }}>
                                    <div style={{ width: 28, height: 28, borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <Calendar size={12} color="var(--color-text-secondary)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{run.name}</p>
                                        <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: 0 }}>{run.type} · {run.date}</p>
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)" }}>{run.rate}%</span>
                                    <span style={{ fontSize: 10, color: delta >= 0 ? T.green.text : T.red.text }}>{delta >= 0 ? "–²" : "–¼"}{Math.abs(delta)}%</span>
                                    {exp === i ? <ChevronUp size={12} color="var(--color-text-tertiary)" /> : <ChevronDown size={12} color="var(--color-text-tertiary)" />}
                                </div>
                                {exp === i && (
                                    <div style={{ padding: "0 0 10px 36px" }}>
                                        <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 5 }}>Scope: {run.scope} · {run.responses} responses</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                            {run.drivers.map(d => <span key={d} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "var(--color-background-secondary)", color: "var(--color-text-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>{d}</span>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const NpsTab = ({ selIdx }) => {
    const cq = QH[selIdx];
    const pq = QH[selIdx - 1] || QH[0];
    const hist = trendSlice(selIdx);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={card}>
                <p style={h3s}>NPS ” {cq.q} vs {pq.q}</p>
                <p style={{ ...subs, marginBottom: 14 }}>Current quarter vs previous quarter</p>
                <KpiStrip metrics={[
                    { label: "eNPS score", current: cq.eNPS, previous: pq.eNPS, dec: 0, note: "176 responses · Full company" },
                    { label: "mNPS score", current: cq.mNPS, previous: pq.mNPS, dec: 0, note: "401 responses · 4/7 depts" },
                ]} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ title: "eNPS", sub: "Pride & Advocacy", score: cq.eNPS, prev: pq.eNPS, p: 40, pa: 38, d: 22, r: 176, ind: 14, hk: "eNPS" }, { title: "mNPS", sub: "Manager Effectiveness", score: cq.mNPS, prev: pq.mNPS, p: 40, pa: 26, d: 34, r: 401, ind: 12, hk: "mNPS" }].map(n => {
                    const delta = n.score - n.prev;
                    return (
                        <div key={n.title} style={card}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                <div><p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{n.title}</p><p style={{ ...subs, marginTop: 2 }}>{n.sub}</p></div>
                                <Delta v={delta} lg />
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 14 }}>
                                <span style={{ fontSize: 44, fontWeight: 500, lineHeight: 1, color: n.score >= 0 ? T.green.text : T.red.text }}>{n.score > 0 ? "+" : ""}{n.score}</span>
                                <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 6 }}>ˆ’100 to +100 · prev: {n.prev > 0 ? "+" : ""}{n.prev}</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                                {[[n.d, "Detractors", T.red], [n.pa, "Passives", T.gray], [n.p, "Promoters", T.green]].map(([pct, label, c]) => (
                                    <div key={label} style={{ textAlign: "center", padding: "10px 4px", borderRadius: "var(--border-radius-md)", background: c.bg, border: `0.5px solid ${c.border}` }}>
                                        <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 1, color: c.text, margin: 0 }}>{pct}%</p>
                                        <p style={{ fontSize: 10, color: c.text, marginTop: 3 }}>{label}</p>
                                    </div>
                                ))}
                            </div>
                            <ResponsiveContainer width="100%" height={80}>
                                <ComposedChart data={hist} margin={{ top: 5, right: 5, bottom: 0, left: -30 }}>
                                    <XAxis dataKey="q" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                                    <ReferenceLine y={0} stroke="var(--color-border-tertiary)" strokeWidth={1} />
                                    <Tooltip content={<TT />} />
                                    <Area type="monotone" dataKey={n.hk} name={n.title} stroke={n.score >= n.ind ? T.green.bar : T.red.bar} fill={n.score >= n.ind ? T.green.bar : T.red.bar} fillOpacity={0.07} strokeWidth={1.5} dot={{ r: 3, fill: n.score >= n.ind ? T.green.bar : T.red.bar, strokeWidth: 0 }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    );
                })}
            </div>
            <div style={card}>
                <p style={{ ...h3s, marginBottom: 12 }}>eNPS & mNPS by department</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {NPS_DEPT.map((d, i) => {
                        const enpsColor = d.eNPS === null ? T.gray : d.eNPS >= 10 ? T.green : d.eNPS >= 0 ? T.amber : T.red;
                        const mnpsColor = d.mNPS === null ? T.gray : d.mNPS >= 8 ? T.green : d.mNPS >= 0 ? T.amber : T.red;
                        const npsMix = (score: number | null) => {
                            if (score === null) return { d: null, p: null, pr: null };
                            const passives = 36;
                            const promoters = Math.max(8, Math.min(78, Math.round((100 - passives + score) / 2)));
                            const detractors = Math.max(8, Math.min(78, 100 - passives - promoters));
                            return { d: detractors, p: passives, pr: promoters };
                        };
                        const enMix = npsMix(d.eNPS);
                        const mnMix = npsMix(d.mNPS);
                        return (
                            <div key={i} style={{ ...surf, padding: "10px 12px", display: "grid", gridTemplateColumns: "150px 1fr 1fr", alignItems: "center", gap: 10 }}>
                                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>{d.dept}</p>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                                        <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>eNPS</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: enpsColor.text }}>{d.eNPS === null ? "”" : `${d.eNPS > 0 ? "+" : ""}${d.eNPS}`}</span>
                                    </div>
                                    <div style={{ height: 5, borderRadius: 3, background: "var(--color-background-secondary)" }}>
                                        <div style={{ height: 5, borderRadius: 3, width: `${d.eNPS === null ? 0 : Math.max(8, Math.min(100, ((d.eNPS + 40) / 80) * 100))}%`, background: enpsColor.bar }} />
                                    </div>
                                    {enMix.d !== null && (
                                        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                                            <span style={{ ...pill(T.red), fontSize: 9, padding: "2px 6px" }}>D {enMix.d}%</span>
                                            <span style={{ ...pill(T.gray), fontSize: 9, padding: "2px 6px" }}>P {enMix.p}%</span>
                                            <span style={{ ...pill(T.green), fontSize: 9, padding: "2px 6px" }}>Pr {enMix.pr}%</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                                        <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>mNPS</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: mnpsColor.text }}>{d.mNPS === null ? "”" : `${d.mNPS > 0 ? "+" : ""}${d.mNPS}`}</span>
                                    </div>
                                    <div style={{ height: 5, borderRadius: 3, background: "var(--color-background-secondary)" }}>
                                        <div style={{ height: 5, borderRadius: 3, width: `${d.mNPS === null ? 0 : Math.max(8, Math.min(100, ((d.mNPS + 40) / 80) * 100))}%`, background: mnpsColor.bar }} />
                                    </div>
                                    {mnMix.d !== null && (
                                        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                                            <span style={{ ...pill(T.red), fontSize: 9, padding: "2px 6px" }}>D {mnMix.d}%</span>
                                            <span style={{ ...pill(T.gray), fontSize: 9, padding: "2px 6px" }}>P {mnMix.p}%</span>
                                            <span style={{ ...pill(T.green), fontSize: 9, padding: "2px 6px" }}>Pr {mnMix.pr}%</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const InsightsTab = ({ onAddAction, actions }) => {
    const byInsight = actions.reduce((acc, a) => { if (!acc[a.insightId]) acc[a.insightId] = []; acc[a.insightId].push(a); return acc; }, {});
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...card, background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Sparkles size={14} color="var(--color-text-info)" />
                    <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-info)", margin: 0 }}>AI Summary · Q2 2026</p>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--color-text-primary)", margin: 0 }}>
                    EXI is <strong style={{ fontWeight: 500 }}>74</strong>. <strong style={{ fontWeight: 500 }}>Compensation & Benefits is the primary drag</strong> at 58 (ˆ’8.1 pts). Two drivers have partial coverage. eNPS +18, mNPS +6. Hiring dept data is suppressed.
                </p>
            </div>
            {BASE_INSIGHTS.map((ins, i) => {
                const cfg = ins.type === "up" ? { c: T.green, Icon: ArrowUp } : ins.type === "down" ? { c: T.red, Icon: ArrowDown } : { c: T.amber, Icon: AlertTriangle };
                const insActions = byInsight[ins.id] || [];
                return (
                    <div key={i} style={{ ...card, padding: "16px 18px" }}>
                        <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ width: 30, height: 30, borderRadius: "var(--border-radius-md)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: cfg.c.bg }}>
                                <cfg.Icon size={13} color={cfg.c.text} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 4px" }}>{ins.title}</p>
                                <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>{ins.body}</p>
                                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: insActions.length > 0 ? 10 : 0 }}>
                                    <span style={pill(T.blue)}>{ins.driver}</span>
                                    <span style={pill(T.gray)}>{ins.dept}</span>
                                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{ins.conf}</span>
                                </div>
                                {insActions.length > 0 && (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
                                        {insActions.map((a, j) => {
                                            const sm = STATUS_META[a.status];
                                            return (
                                                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: "var(--border-radius-md)", background: sm.c.bg, border: `0.5px solid ${sm.c.border}` }}>
                                                    <sm.Icon size={11} color={sm.c.text} />
                                                    <span style={{ fontSize: 12, flex: 1, color: "var(--color-text-primary)" }}>{a.title}</span>
                                                    <span style={{ fontSize: 10, color: sm.c.text }}>{a.owner}</span>
                                                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{a.dueDate}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <button onClick={() => onAddAction()} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-secondary)", color: "var(--color-text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                                    <Plus size={12} /> Add action
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const ActionCenter = ({ actions, setActions }) => {
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ title: "", insightId: "", driver: "", dept: "All", owner: "", dueDate: "", status: "not_started", note: "" });
    const [filter, setFilter] = useState("all");
    const openNew = () => { setForm({ title: "", insightId: "", driver: "", dept: "All", owner: "", dueDate: "", status: "not_started", note: "" }); setEditId(null); setShowForm(true); };
    const openEdit = a => { setForm({ ...a }); setEditId(a.id); setShowForm(true); };
    const save = () => { if (!form.title.trim()) return; if (editId) { setActions(p => p.map(a => a.id === editId ? { ...form, id: editId } : a)); } else { setActions(p => [...p, { ...form, id: "a" + Date.now(), createdAt: "Q2 '26" }]); } setShowForm(false); };
    const remove = id => setActions(p => p.filter(a => a.id !== id));
    const cycle = id => setActions(p => p.map(a => { if (a.id !== id) return a; const n = { not_started: "in_progress", in_progress: "done", done: "not_started" }; return { ...a, status: n[a.status] || "not_started" }; }));
    const filtered = filter === "all" ? actions : actions.filter(a => a.status === filter);
    const counts = { total: actions.length, not_started: actions.filter(a => a.status === "not_started").length, in_progress: actions.filter(a => a.status === "in_progress").length, done: actions.filter(a => a.status === "done").length };
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10 }}>
                {[["Total actions", counts.total, T.blue], ["Not started", counts.not_started, T.gray], ["In progress", counts.in_progress, T.amber], ["Done", counts.done, T.green]].map(([label, val, c], i) => (
                    <div key={i} style={surf}><p style={{ ...lbl, marginBottom: 6 }}>{label}</p><p style={{ fontSize: 24, fontWeight: 500, color: c.text, lineHeight: 1, margin: 0 }}>{val}</p></div>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={openNew} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: "var(--border-radius-md)", background: T.blue.bar, border: "none", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                    <Plus size={14} /> New action
                </button>
                <div style={{ display: "flex", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 3, gap: 2 }}>
                    {[["all", "All"], ["not_started", "Not started"], ["in_progress", "In progress"], ["done", "Done"]].map(([k, l]) => (
                        <button key={k} onClick={() => setFilter(k)} className="analytics-filter-chip" style={{ fontSize: 11, padding: "5px 10px", fontWeight: filter === k ? 700 : 600, cursor: "pointer", fontFamily: "inherit", background: filter === k ? "linear-gradient(180deg, rgba(0,22,137,.12) 0%, rgba(46,165,180,.16) 100%)" : "#f4f8ff", color: filter === k ? "rgb(0,22,137)" : "var(--color-text-secondary)", boxShadow: filter === k ? "0 0 0 1px #bdcaee inset" : "none" }}>{l}</button>
                    ))}
                </div>
                <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginLeft: "auto" }}>{filtered.length} action{filtered.length !== 1 ? "s" : ""}</span>
            </div>
            {showForm && (
                <div style={{ ...card, border: `0.5px solid ${T.blue.border}`, background: T.blue.bg }}>
                    <p style={{ ...h3s, color: T.blue.text, marginBottom: 14 }}>{editId ? "Edit action" : "New action"}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                        <div style={{ gridColumn: "1/-1" }}>
                            <p style={{ ...lbl, marginBottom: 5 }}>Action title *</p>
                            <input className="analytics-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Describe the action¦" style={{ width: "100%", padding: "8px 10px", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                        <div>
                            <p style={{ ...lbl, marginBottom: 5 }}>Linked insight</p>
                            <select className="analytics-select" value={form.insightId} onChange={e => setForm(f => ({ ...f, insightId: e.target.value }))} style={{ width: "100%", padding: "8px 10px", fontSize: 12, fontFamily: "inherit" }}>
                                <option value="">” none ”</option>
                                {BASE_INSIGHTS.map(ins => <option key={ins.id} value={ins.id}>{ins.title.substring(0, 45)}¦</option>)}
                            </select>
                        </div>
                        <div>
                            <p style={{ ...lbl, marginBottom: 5 }}>Driver</p>
                            <input className="analytics-input" value={form.driver} onChange={e => setForm(f => ({ ...f, driver: e.target.value }))} placeholder="e.g. Comp & Benefits" style={{ width: "100%", padding: "8px 10px", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                        <div>
                            <p style={{ ...lbl, marginBottom: 5 }}>Department</p>
                            <select className="analytics-select" value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))} style={{ width: "100%", padding: "8px 10px", fontSize: 12, fontFamily: "inherit" }}>
                                <option value="All">All departments</option>
                                {ALL_DEPTS.map(d => <option key={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <p style={{ ...lbl, marginBottom: 5 }}>Owner</p>
                            <input className="analytics-input" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="e.g. HR Lead" style={{ width: "100%", padding: "8px 10px", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                        <div>
                            <p style={{ ...lbl, marginBottom: 5 }}>Due date</p>
                            <input className="analytics-input" type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} style={{ width: "100%", padding: "8px 10px", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                        <div style={{ gridColumn: "1/-1" }}>
                            <p style={{ ...lbl, marginBottom: 5 }}>Note</p>
                            <input className="analytics-input" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Optional note¦" style={{ width: "100%", padding: "8px 10px", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={save} style={{ padding: "8px 16px", borderRadius: "var(--border-radius-md)", background: T.blue.bar, border: "none", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Save action</button>
                        <button onClick={() => setShowForm(false)} style={{ padding: "8px 14px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", color: "var(--color-text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                    </div>
                </div>
            )}
            {filtered.length === 0 ? (
                <div style={{ ...card, textAlign: "center", padding: "40px 20px" }}>
                    <CheckSquare size={28} color="var(--color-text-tertiary)" style={{ marginBottom: 10 }} />
                    <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>No actions yet. Add one from an insight or click "New action".</p>
                </div>
            ) : (
                <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                    {filtered.map((a, i) => {
                        const sm = STATUS_META[a.status];
                        const linked = BASE_INSIGHTS.find(ins => ins.id === a.insightId);
                        return (
                            <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 20px", borderBottom: i < filtered.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                                <button onClick={() => cycle(a.id)} title="Click to cycle status" style={{ width: 28, height: 28, borderRadius: "var(--border-radius-md)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: sm.c.bg, border: `0.5px solid ${sm.c.border}`, cursor: "pointer", marginTop: 1 }}>
                                    <sm.Icon size={12} color={sm.c.text} />
                                </button>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 13, fontWeight: 500, color: a.status === "done" ? "var(--color-text-tertiary)" : "var(--color-text-primary)", textDecoration: a.status === "done" ? "line-through" : "none", margin: "0 0 4px" }}>{a.title}</p>
                                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center", marginBottom: a.note ? 4 : 0 }}>
                                        {a.driver && <span style={pill(T.blue)}>{a.driver}</span>}
                                        {a.dept && <span style={pill(T.gray)}>{a.dept}</span>}
                                        {linked && <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>†— {linked.title.substring(0, 35)}¦</span>}
                                    </div>
                                    {a.note && <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>{a.note}</p>}
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0, minWidth: 100 }}>
                                    <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: 0 }}>{a.owner || "Unassigned"}</p>
                                    {a.dueDate && <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 2 }}>Due {a.dueDate}</p>}
                                    <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 2 }}>Created {a.createdAt}</p>
                                </div>
                                <div style={{ display: "flex", gap: 4, flexShrink: 0, marginTop: 1 }}>
                                    <button onClick={() => openEdit(a)} style={{ width: 26, height: 26, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit2 size={11} color="var(--color-text-secondary)" /></button>
                                    <button onClick={() => remove(a.id)} style={{ width: 26, height: 26, borderRadius: "var(--border-radius-md)", border: `0.5px solid ${T.red.border}`, background: T.red.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={11} color={T.red.text} /></button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

/* ”” root ”” */
const ADMIN_TABS = [
    { id: "overview", label: "Overview", Icon: LayoutDashboard },
    { id: "drivers", label: "Drivers", Icon: BarChart2 },
    { id: "trends", label: "Trends", Icon: TrendingUp },
    { id: "heatmap", label: "Heatmap", Icon: Layers },
    { id: "segments", label: "Segments", Icon: Users },
    { id: "questions", label: "Questions", Icon: HelpCircle },
    { id: "participation", label: "Participation", Icon: Activity },
    { id: "nps", label: "NPS", Icon: Target },
    { id: "insights", label: "Insights", Icon: Sparkles },
    { id: "actions", label: "Action Center", Icon: CheckSquare },
];

const TopBar = ({ selIdx, setSelIdx, viewMode, setViewMode, isLive, cq, title, color }) => (
    <div className="topbar-glass" style={{ position: "sticky", top: 0, zIndex: 40 }}>
        <div className="topbar-inner">
            <div className="topbar-title-group">
                <div className="topbar-icon" style={{ background: `linear-gradient(155deg, ${color} 0%, ${T.teal.bar} 100%)` }}>
                    <BarChart2 size={14} color="#fff" />
                </div>
                <div>
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 7 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: ".01em" }}>{title}</span>
                        {isLive !== undefined && (
                            <span style={{ ...pill(isLive ? T.green : T.amber), fontSize: 10, gap: 5 }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: isLive ? T.green.bar : T.amber.bar }} />
                                {isLive ? "Live" : "Historical"}
                            </span>
                        )}
                    </div>
                    <p style={{ ...subs, marginTop: 2 }}>{cq.q} snapshot · 59 employees · {ALL_DEPTS.length} departments</p>
                </div>
            </div>
            <div className="topbar-controls">
                <div className="control-chip" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 11px", borderRadius: "var(--border-radius-md)", background: "rgba(255,255,255,.86)", border: "1px solid var(--color-border-tertiary)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.8)" }}>
                    <Calendar size={11} color="var(--color-text-tertiary)" />
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Quarter</span>
                    <select value={selIdx} onChange={e => setSelIdx(+e.target.value)} style={{ fontSize: 11, border: "none", background: "transparent", color: "var(--color-text-primary)", fontFamily: "inherit", cursor: "pointer", fontWeight: 600 }}>
                        {QH.map((q, i) => <option key={i} value={i}>{q.q}{i === QH.length - 1 ? " (current)" : ""}</option>)}
                    </select>
                </div>
                <div className="control-chip" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 11px", borderRadius: "var(--border-radius-md)", background: "rgba(255,255,255,.86)", border: "1px solid var(--color-border-tertiary)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.8)" }}>
                    <User size={11} color="var(--color-text-tertiary)" />
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>View</span>
                    <select value={viewMode} onChange={e => setViewMode(e.target.value)} style={{ fontSize: 11, border: "none", background: "transparent", color: "var(--color-text-primary)", fontFamily: "inherit", cursor: "pointer", fontWeight: 600 }}>
                        {VIEW_MODES.map(v => <option key={v.key} value={v.key}>{v.label}</option>)}
                    </select>
                </div>
            </div>
        </div>
        <div className="topbar-note-row">
            <Info size={11} color="var(--color-text-tertiary)" />
            <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: 0 }}>
                Quarter selector sets analysis period · trend charts use last {TREND_Q} quarters · anonymity threshold n&lt;{ANON} suppresses data
            </p>
        </div>
    </div>
);

export default function Analytics() {
    const [tab, setTab] = useState("overview");
    const [selIdx, setSelIdx] = useState(QH.length - 1);
    const [drvDrawer, setDrvDrawer] = useState(null);
    const [deptDrawer, setDeptDrawer] = useState(null);
    const [viewMode, setViewMode] = useState("admin");
    const [actions, setActions] = useState(INIT_ACTIONS);

    const benchKey = "general_tech";
    const benchmark = BENCHMARKS.find(b => b.key === benchKey) || BENCHMARKS[2];
    const cq = QH[selIdx];
    const isLive = selIdx === QH.length - 1;
    const openDept = dept => setDeptDrawer(dept);

    const sharedBarProps = { selIdx, viewMode, setViewMode, cq };

    if (viewMode === "manager") return (
        <div className="analytics-shell analytics-app-root px-6 py-5" style={{ fontFamily: "var(--font-sans)", background: "var(--color-background-tertiary)", width: "100%" }}>
            <div className="admin-topbar-block">
                <TopBar {...sharedBarProps} setSelIdx={setSelIdx} title={`My Department ” ${MGR_DEPT}`} color={T.blue.bar} />
            </div>
            <div className="analytics-panel analytics-frame analytics-scroll-panel rounded-2xl border border-slate-200/70 bg-white/74" style={{ width: "100%", padding: 24 }}>
                <ManagerView selIdx={selIdx} benchmark={benchmark} />
            </div>
        </div>
    );

    if (viewMode === "executive") return (
        <div className="analytics-shell analytics-app-root px-6 py-5" style={{ fontFamily: "var(--font-sans)", background: "var(--color-background-tertiary)", width: "100%" }}>
            <div className="admin-topbar-block">
                <TopBar {...sharedBarProps} setSelIdx={setSelIdx} title="Company Analytics ” Executive" color={T.purple.bar} />
            </div>
            <div className="analytics-panel analytics-frame analytics-scroll-panel rounded-2xl border border-slate-200/70 bg-white/74" style={{ width: "100%", padding: 24 }}>
                <ExecutiveView selIdx={selIdx} benchmark={benchmark} />
            </div>
        </div>
    );

    const renderTab = () => {
        switch (tab) {
            case "overview": return <OverviewTab selIdx={selIdx} benchmark={benchmark} onDeptClick={openDept} />;
            case "drivers": return <DriversTab selIdx={selIdx} benchmark={benchmark} onSelect={setDrvDrawer} />;
            case "trends": return <TrendsTab selIdx={selIdx} benchmark={benchmark} />;
            case "heatmap": return <HeatmapTab onDeptClick={openDept} />;
            case "segments": return <SegmentsTab />;
            case "questions": return <QuestionsTab />;
            case "participation": return <ParticipationTab selIdx={selIdx} onDeptClick={openDept} />;
            case "nps": return <NpsTab selIdx={selIdx} />;
            case "insights": return <InsightsTab onAddAction={() => setTab("actions")} actions={actions} />;
            case "actions": return <ActionCenter actions={actions} setActions={setActions} />;
            default: return <OverviewTab selIdx={selIdx} benchmark={benchmark} onDeptClick={openDept} />;
        }
    };
    const openActions = actions.filter(a => a.status !== "done").length;

    return (
        <>
            <DeptDrawer dept={deptDrawer} onClose={() => setDeptDrawer(null)} benchmark={benchmark} selIdx={selIdx} />
            <DriverDrawer driver={drvDrawer} onClose={() => setDrvDrawer(null)} benchmark={benchmark} selIdx={selIdx} />
            <div className="analytics-shell analytics-app-root px-6 py-5" style={{ fontFamily: "var(--font-sans)", background: "var(--color-background-tertiary)", width: "100%" }}>
                <div className="dashboard-main">
                    <div className="topbar-wrap admin-topbar-block z-40 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur" style={{ background: "var(--color-background-primary)", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                        <TopBar {...sharedBarProps} setSelIdx={setSelIdx} title="Company Analytics" color={T.green.bar} isLive={isLive} />
                        <nav className="admin-tabs-nav" role="tablist" aria-label="Analytics sections">
                            {ADMIN_TABS.map(t => (
                                <button
                                    key={t.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={tab === t.id}
                                    onClick={() => setTab(t.id)}
                                    className={`admin-tab-h ${tab === t.id ? "admin-tab-h--active" : ""}`}
                                >
                                    <span>{t.label}</span>
                                    {t.id === "actions" && openActions > 0 && (
                                        <span className="admin-tab-h__badge" style={{ background: T.amber.bg, color: T.amber.text, border: `1px solid ${T.amber.border}` }}>
                                            {openActions}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="analytics-panel analytics-frame analytics-scroll-panel rounded-2xl border border-slate-200/70 bg-white/74" style={{ padding: 24 }}>
                        {renderTab()}
                    </div>
                </div>
            </div>
        </>
    );
}
