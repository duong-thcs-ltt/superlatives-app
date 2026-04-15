import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0f1117",
  card: "#1a1d2e",
  cardLight: "#242840",
  accent: "#f0c040",
  accentGlow: "#f0c04033",
  blue: "#4fc3f7",
  green: "#69f0ae",
  red: "#ff5252",
  purple: "#ce93d8",
  text: "#e8eaf6",
  muted: "#8892b0",
};

const LESSONS = [
  {
    id: 1,
    title: "Dạng 1: Không ai... hơn X",
    subtitle: "No one / Nobody... more than X → X is the most...",
    icon: "🏆",
    color: "#f0c040",
    formula: {
      input: "No one / Nobody + V + more + adj + than + X",
      output: "X + is + the most + adj + (in/of...)",
      note: "Áp dụng với tính từ dài (≥ 2 âm tiết: beautiful, intelligent, expensive...)"
    },
    steps: [
      { step: 1, title: "Xác định chủ thể X", desc: "Tìm đối tượng đứng sau 'than'" },
      { step: 2, title: "Lấy tính từ gốc", desc: "Bỏ 'more' → giữ nguyên tính từ" },
      { step: 3, title: "Thêm 'the most'", desc: "Đặt 'the most' trước tính từ" },
      { step: 4, title: "Hoàn thành câu", desc: "X + is + the most + adj" },
    ],
    examples: [
      {
        from: "No one in the class is more intelligent than Mary.",
        to: "Mary is the most intelligent student in the class.",
        explain: ["X = Mary", "adj = intelligent (dài, 4 âm tiết)", "Thêm 'the most' → the most intelligent", "Mary + is + the most intelligent"]
      },
      {
        from: "Nobody is more beautiful than Helen.",
        to: "Helen is the most beautiful (person).",
        explain: ["X = Helen", "adj = beautiful (dài, 3 âm tiết)", "Thêm 'the most' → the most beautiful", "Helen + is + the most beautiful"]
      },
      {
        from: "No one works more carefully than Peter.",
        to: "Peter works the most carefully.",
        explain: ["X = Peter", "adv = carefully", "Thêm 'the most' → the most carefully", "Peter + works + the most carefully"]
      }
    ]
  },
  {
    id: 2,
    title: "Dạng 2: Không ai... bằng X (short adj)",
    subtitle: "No one / Nobody... as + adj + as X → X is the most...",
    icon: "⚡",
    color: "#4fc3f7",
    formula: {
      input: "No one / Nobody + V + as + adj + as + X",
      output: "X + is + the + adj-est (in/of...)",
      note: "Áp dụng với tính từ ngắn (1 âm tiết: tall, fast, hot... hoặc 2 âm tiết: clever, happy...)"
    },
    steps: [
      { step: 1, title: "Nhận dạng 'as...as'", desc: "Đây là so sánh bằng phủ định → suy ra X là nhất" },
      { step: 2, title: "Xác định tính từ", desc: "Tính từ ngắn → dùng đuôi -est" },
      { step: 3, title: "Biến đổi tính từ", desc: "tall→tallest, hot→hottest, happy→happiest" },
      { step: 4, title: "Hoàn thành câu", desc: "X + is + the + adj-est" },
    ],
    examples: [
      {
        from: "No one in the team runs as fast as Tom.",
        to: "Tom runs the fastest in the team.",
        explain: ["X = Tom", "adj = fast (ngắn, 1 âm tiết)", "fast → fastest", "Tom + runs + the fastest"]
      },
      {
        from: "Nobody in the school is as tall as John.",
        to: "John is the tallest in the school.",
        explain: ["X = John", "adj = tall (ngắn, 1 âm tiết)", "tall → tallest", "John + is + the tallest"]
      },
      {
        from: "No one is as happy as she is.",
        to: "She is the happiest.",
        explain: ["X = she", "adj = happy (2 âm tiết kết thúc -y)", "happy → happiest (y→i+est)", "She + is + the happiest"]
      }
    ]
  },
  {
    id: 3,
    title: "Dạng 3: X là nhất → Không ai bằng/hơn",
    subtitle: "X is the most/adj-est → No one is more/as adj as X",
    icon: "🔄",
    color: "#69f0ae",
    formula: {
      input: "X + is + the most + adj / the + adj-est",
      output: "No one / Nobody is + more adj than X  OR  as adj as X",
      note: "Có thể dùng cả hai dạng: 'more...than' hoặc 'as...as' đều đúng!"
    },
    steps: [
      { step: 1, title: "Xác định tính từ", desc: "Tính từ dài → dùng 'more', ngắn → dùng '-er'" },
      { step: 2, title: "Đặt 'No one / Nobody'", desc: "Bắt đầu câu mới bằng No one / Nobody" },
      { step: 3, title: "Chọn cấu trúc", desc: "more...than X  hoặc  as...as X" },
      { step: 4, title: "Kiểm tra nghĩa", desc: "Đảm bảo câu mới cùng nghĩa câu gốc" },
    ],
    examples: [
      {
        from: "Lan is the most hardworking student in class.",
        to: "No one in class is more hardworking than Lan.\nNobody in class is as hardworking as Lan.",
        explain: ["X = Lan", "adj = hardworking (dài → more)", "Dạng 1: No one... more hardworking than Lan", "Dạng 2: Nobody... as hardworking as Lan"]
      },
      {
        from: "Mt. Everest is the highest mountain in the world.",
        to: "No mountain in the world is higher than Mt. Everest.\nNo mountain in the world is as high as Mt. Everest.",
        explain: ["X = Mt. Everest", "adj = high (ngắn → higher/as high)", "high → higher", "No mountain... higher than / as high as Mt. Everest"]
      }
    ]
  }
];

const EXERCISES = [
  {
    id: 1,
    type: "transform",
    direction: "→ superlative",
    question: "No one in the village is more generous than Mr. Brown.",
    answer: "Mr. Brown is the most generous (person) in the village.",
    hint: "Tìm X sau 'than', adj = generous (dài → the most)",
    explanation: "generous là tính từ dài (3 âm tiết) → dùng 'the most generous'. X = Mr. Brown → Mr. Brown is the most generous in the village."
  },
  {
    id: 2,
    type: "transform",
    direction: "→ superlative",
    question: "Nobody in our school sings as beautifully as Lisa.",
    answer: "Lisa sings the most beautifully in our school.",
    hint: "Cấu trúc 'as...as' phủ định → X là nhất. beautifully là trạng từ dài",
    explanation: "beautifully là trạng từ dài → the most beautifully. X = Lisa → Lisa sings the most beautifully."
  },
  {
    id: 3,
    type: "transform",
    direction: "→ superlative",
    question: "No student works as hard as Nam.",
    answer: "Nam works the hardest.",
    hint: "hard là tính từ ngắn → thêm -est. X = Nam",
    explanation: "hard (ngắn, 1 âm tiết) → hardest. X = Nam → Nam works the hardest."
  },
  {
    id: 4,
    type: "transform",
    direction: "→ comparative",
    question: "Tokyo is the most expensive city in Asia.",
    answer: "No city in Asia is more expensive than Tokyo.",
    hint: "expensive dài → dùng 'more expensive than'",
    explanation: "expensive (3 âm tiết) → more expensive. Câu mới: No city in Asia is more expensive than Tokyo."
  },
  {
    id: 5,
    type: "transform",
    direction: "→ comparative",
    question: "She is the kindest person I have ever met.",
    answer: "No one I have ever met is as kind as she is.",
    hint: "kind ngắn (1 âm tiết) → dùng 'as kind as'",
    explanation: "kind (ngắn) → as kind as. Câu mới: No one I have ever met is as kind as she is (hoặc: kinder than she is)."
  },
  {
    id: 6,
    type: "transform",
    direction: "→ superlative",
    question: "No one in the competition dances more gracefully than Mia.",
    answer: "Mia dances the most gracefully in the competition.",
    hint: "gracefully là trạng từ dài → the most gracefully. X = Mia",
    explanation: "gracefully (4 âm tiết) → the most gracefully. Mia dances the most gracefully in the competition."
  },
  {
    id: 7,
    type: "transform",
    direction: "→ comparative",
    question: "The Amazon is the longest river in the world.",
    answer: "No river in the world is longer than the Amazon.",
    hint: "long ngắn → longer than",
    explanation: "long (ngắn) → longer. No river in the world is longer than the Amazon."
  },
  {
    id: 8,
    type: "error",
    direction: "Tìm lỗi sai",
    question: "No one is more tall than my father.",
    wrongAnswer: "My father is the most tall.",
    correctAnswer: "My father is the tallest.",
    hint: "tall là tính từ ngắn (1 âm tiết) → KHÔNG dùng 'more', dùng '-est'",
    explanation: "❌ 'more tall' SAI – tall là adj ngắn (1 âm tiết)\n✅ Đúng: 'No one is taller than my father' hoặc 'My father is the tallest'"
  }
];

const COMMON_ERRORS = [
  {
    error: "Dùng 'more' với tính từ ngắn",
    wrong: "more tall ❌, more fast ❌, more big ❌",
    correct: "taller ✅, faster ✅, bigger ✅",
    rule: "Tính từ 1 âm tiết → thêm -er/-est, KHÔNG dùng more/most"
  },
  {
    error: "Dùng -est với tính từ dài",
    wrong: "beautifulest ❌, importantest ❌",
    correct: "the most beautiful ✅, the most important ✅",
    rule: "Tính từ ≥ 2 âm tiết thường → dùng more/most"
  },
  {
    error: "Quên 'the' trước dạng nhất",
    wrong: "She is most beautiful ❌",
    correct: "She is THE most beautiful ✅",
    rule: "So sánh nhất LUÔN cần 'the' phía trước"
  },
  {
    error: "Nhầm X trong câu phủ định",
    wrong: "No one is taller than [No one] ❌",
    correct: "No one... than X → X là nhất ✅",
    rule: "X là đối tượng đứng sau 'than' hoặc sau 'as...as'"
  },
  {
    error: "Quên đuôi -est bị biến đổi",
    wrong: "happyest ❌, hotter ❌ (thiếu tt)",
    correct: "happiest ✅ (y→i), hottest ✅ (double t)",
    rule: "Kết thúc -y → đổi thành -iest | Kết thúc CVC → gấp đôi phụ âm"
  }
];

const SPELLING_RULES = [
  { rule: "Thêm -est thông thường", example: "tall → tallest, smart → smartest", color: "#69f0ae" },
  { rule: "Kết thúc -e → thêm -st", example: "nice → nicest, large → largest", color: "#4fc3f7" },
  { rule: "Kết thúc -y → đổi thành -iest", example: "happy → happiest, easy → easiest", color: "#ce93d8" },
  { rule: "Kết thúc CVC → nhân đôi phụ âm + -est", example: "big → biggest, hot → hottest, fat → fattest", color: "#f0c040" },
  { rule: "Bất quy tắc (học thuộc lòng)", example: "good→best, bad→worst, far→furthest, little→least", color: "#ff5252" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("learn");
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [animKey, setAnimKey] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const lesson = LESSONS[activeLesson];
  const exercise = EXERCISES[exIdx];

  useEffect(() => {
    setActiveStep(0);
    setAnimKey(k => k + 1);
  }, [activeLesson]);

  useEffect(() => {
    setUserAnswer("");
    setFeedback(null);
    setShowAnswer(false);
    setShowHint(false);
  }, [exIdx]);

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    const ua = userAnswer.trim().toLowerCase().replace(/[.,!?]/g, "");
    const correct = exercise.answer.toLowerCase().replace(/[.,!?]/g, "");
    const isOk = correct.split("\n").some(ans => ua === ans.trim());
    setFeedback(isOk ? "correct" : "wrong");
    setScore(s => ({ correct: s.correct + (isOk ? 1 : 0), total: s.total + 1 }));
    if (isOk) setShowAnswer(false);
  };

  const nextEx = () => {
    setExIdx(i => (i + 1) % EXERCISES.length);
  };

  const tabs = [
    { id: "learn", label: "📚 Lý Thuyết", },
    { id: "examples", label: "💡 Ví Dụ", },
    { id: "errors", label: "⚠️ Lỗi Thường Gặp", },
    { id: "practice", label: "✏️ Bài Tập", },
    { id: "spelling", label: "🔤 Chính Tả", },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f1117 0%, #1a1d2e 50%, #0f1117 100%)",
      fontFamily: "'Segoe UI', 'Roboto', sans-serif",
      color: COLORS.text,
      padding: "0 0 60px 0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #1a1d2e, #242840)",
        borderBottom: "2px solid #f0c04033",
        padding: "18px 20px 14px",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 30px #0008"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>🎓</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.accent, letterSpacing: 0.5 }}>
                SO SÁNH NHẤT ↔ PHỦ ĐỊNH
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>
                Superlative ↔ Negative Comparison • THCS Tiếng Anh
              </div>
            </div>
            {score.total > 0 && (
              <div style={{
                marginLeft: "auto", background: "#f0c04022",
                border: "1px solid #f0c04066", borderRadius: 20,
                padding: "4px 12px", fontSize: 13, color: COLORS.accent
              }}>
                ✅ {score.correct}/{score.total}
              </div>
            )}
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 10 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                background: activeTab === t.id ? COLORS.accent : "#ffffff11",
                color: activeTab === t.id ? "#0f1117" : COLORS.muted,
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 16px" }}>

        {/* ===== TAB: LÝ THUYẾT ===== */}
        {activeTab === "learn" && (
          <div key={animKey}>
            {/* Lesson selector */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {LESSONS.map((l, i) => (
                <button key={l.id} onClick={() => setActiveLesson(i)} style={{
                  flex: 1, minWidth: 180, padding: "12px 16px", borderRadius: 14,
                  border: `2px solid ${activeLesson === i ? l.color : "#ffffff22"}`,
                  background: activeLesson === i ? l.color + "22" : "#1a1d2e",
                  cursor: "pointer", color: COLORS.text, textAlign: "left", transition: "all 0.2s"
                }}>
                  <div style={{ fontSize: 22 }}>{l.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: l.color, marginTop: 4 }}>{l.title}</div>
                </button>
              ))}
            </div>

            {/* Formula box */}
            <div style={{
              background: lesson.color + "15", border: `2px solid ${lesson.color}44`,
              borderRadius: 16, padding: 20, marginBottom: 20
            }}>
              <div style={{ fontSize: 13, color: lesson.color, fontWeight: 700, marginBottom: 12 }}>
                {lesson.icon} {lesson.title}
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>{lesson.subtitle}</div>
              <div style={{
                background: "#00000033", borderRadius: 10, padding: "12px 16px",
                display: "flex", flexDirection: "column", gap: 8
              }}>
                <div style={{ fontSize: 13 }}>
                  <span style={{ color: COLORS.muted, marginRight: 8 }}>📥 Câu gốc:</span>
                  <span style={{ color: COLORS.blue, fontFamily: "monospace" }}>{lesson.formula.input}</span>
                </div>
                <div style={{ textAlign: "center", color: lesson.color }}>⬇ Chuyển đổi</div>
                <div style={{ fontSize: 13 }}>
                  <span style={{ color: COLORS.muted, marginRight: 8 }}>📤 Câu mới:</span>
                  <span style={{ color: COLORS.green, fontFamily: "monospace" }}>{lesson.formula.output}</span>
                </div>
              </div>
              <div style={{
                marginTop: 12, fontSize: 12, color: COLORS.accent,
                background: "#f0c04011", borderRadius: 8, padding: "8px 12px"
              }}>
                💡 <strong>Lưu ý:</strong> {lesson.formula.note}
              </div>
            </div>

            {/* Step by step */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: COLORS.accent }}>
                📋 Các bước thực hiện:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {lesson.steps.map((s, i) => (
                  <div key={i} onClick={() => setActiveStep(i)} style={{
                    display: "flex", gap: 14, alignItems: "flex-start",
                    background: activeStep === i ? lesson.color + "22" : "#1a1d2e",
                    border: `2px solid ${activeStep === i ? lesson.color : "#ffffff11"}`,
                    borderRadius: 12, padding: "12px 16px", cursor: "pointer", transition: "all 0.2s"
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: activeStep === i ? lesson.color : "#ffffff11",
                      color: activeStep === i ? "#0f1117" : COLORS.muted,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 14, flexShrink: 0
                    }}>{s.step}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: activeStep === i ? lesson.color : COLORS.text }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* First example preview */}
            <div style={{
              background: "#1a1d2e", border: "1px solid #ffffff11",
              borderRadius: 16, padding: 18
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, marginBottom: 12 }}>
                🔍 Ví dụ nhanh:
              </div>
              <div style={{
                fontSize: 13, color: COLORS.blue, fontStyle: "italic",
                background: "#4fc3f711", borderRadius: 8, padding: "10px 14px", marginBottom: 10
              }}>
                {lesson.examples[0].from}
              </div>
              <div style={{ textAlign: "center", fontSize: 18, color: lesson.color }}>⬇</div>
              <div style={{
                fontSize: 13, color: COLORS.green, fontWeight: 600,
                background: "#69f0ae11", borderRadius: 8, padding: "10px 14px", marginTop: 10
              }}>
                {lesson.examples[0].to}
              </div>
              <button onClick={() => setActiveTab("examples")} style={{
                marginTop: 14, width: "100%", padding: "10px",
                background: lesson.color + "22", border: `1px solid ${lesson.color}44`,
                borderRadius: 10, color: lesson.color, fontWeight: 700, cursor: "pointer",
                fontSize: 13
              }}>Xem đầy đủ ví dụ có giải thích chi tiết →</button>
            </div>
          </div>
        )}

        {/* ===== TAB: VÍ DỤ ===== */}
        {activeTab === "examples" && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 16 }}>
              💡 Ví Dụ Có Giải Thích Chi Tiết Từng Bước
            </div>
            {/* Lesson selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {LESSONS.map((l, i) => (
                <button key={i} onClick={() => setActiveLesson(i)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "none",
                  background: activeLesson === i ? l.color : "#ffffff11",
                  color: activeLesson === i ? "#0f1117" : COLORS.muted,
                  cursor: "pointer", fontSize: 12, fontWeight: 600
                }}>{l.icon} {l.title.replace("Dạng ", "")}</button>
              ))}
            </div>

            {LESSONS[activeLesson].examples.map((ex, i) => (
              <div key={i} style={{
                background: "#1a1d2e", borderRadius: 16, padding: 18,
                marginBottom: 16, border: `1px solid ${LESSONS[activeLesson].color}33`
              }}>
                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>Ví dụ {i + 1}:</div>
                {/* From */}
                <div style={{
                  background: "#4fc3f711", border: "1px solid #4fc3f733",
                  borderRadius: 10, padding: "12px 14px", marginBottom: 8
                }}>
                  <div style={{ fontSize: 10, color: COLORS.blue, fontWeight: 700, marginBottom: 4 }}>📥 CÂU GỐC</div>
                  <div style={{ fontSize: 14, color: COLORS.blue, fontStyle: "italic" }}>{ex.from}</div>
                </div>
                {/* Steps */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                  {ex.explain.map((e, j) => (
                    <div key={j} style={{
                      display: "flex", gap: 10, alignItems: "center",
                      fontSize: 12, color: COLORS.text
                    }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: LESSONS[activeLesson].color + "33",
                        color: LESSONS[activeLesson].color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 11, flexShrink: 0
                      }}>{j + 1}</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
                {/* To */}
                <div style={{
                  background: "#69f0ae11", border: "1px solid #69f0ae33",
                  borderRadius: 10, padding: "12px 14px"
                }}>
                  <div style={{ fontSize: 10, color: COLORS.green, fontWeight: 700, marginBottom: 4 }}>📤 CÂU KẾT QUẢ</div>
                  {ex.to.split("\n").map((line, j) => (
                    <div key={j} style={{ fontSize: 14, color: COLORS.green, fontWeight: 600, marginTop: j > 0 ? 4 : 0 }}>
                      {j > 0 ? "→ " : ""}{line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== TAB: LỖI THƯỜNG GẶP ===== */}
        {activeTab === "errors" && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 16 }}>
              ⚠️ Những Lỗi Học Sinh Hay Mắc Phải
            </div>
            {COMMON_ERRORS.map((e, i) => (
              <div key={i} style={{
                background: "#1a1d2e", borderRadius: 14, padding: 16,
                marginBottom: 14, border: "1px solid #ff525233"
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: COLORS.red,
                  marginBottom: 10, display: "flex", alignItems: "center", gap: 8
                }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "#ff525222", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 12
                  }}>⚠</span>
                  {e.error}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                  <div style={{
                    flex: 1, minWidth: 140, background: "#ff525211", borderRadius: 10,
                    padding: "10px 12px", border: "1px solid #ff525233"
                  }}>
                    <div style={{ fontSize: 10, color: COLORS.red, fontWeight: 700, marginBottom: 6 }}>❌ SAI</div>
                    <div style={{ fontSize: 12, color: COLORS.red, fontFamily: "monospace" }}>{e.wrong}</div>
                  </div>
                  <div style={{
                    flex: 1, minWidth: 140, background: "#69f0ae11", borderRadius: 10,
                    padding: "10px 12px", border: "1px solid #69f0ae33"
                  }}>
                    <div style={{ fontSize: 10, color: COLORS.green, fontWeight: 700, marginBottom: 6 }}>✅ ĐÚNG</div>
                    <div style={{ fontSize: 12, color: COLORS.green, fontFamily: "monospace" }}>{e.correct}</div>
                  </div>
                </div>
                <div style={{
                  background: "#f0c04011", borderRadius: 8, padding: "8px 12px",
                  fontSize: 12, color: COLORS.accent
                }}>
                  📌 Quy tắc: {e.rule}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== TAB: BÀI TẬP ===== */}
        {activeTab === "practice" && (
          <div>
            {/* Progress */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 16
            }}>
              <div style={{ fontSize: 13, color: COLORS.muted }}>
                Câu {exIdx + 1} / {EXERCISES.length}
              </div>
              <div style={{
                background: "#f0c04022", border: "1px solid #f0c04055",
                borderRadius: 20, padding: "4px 14px", fontSize: 13, color: COLORS.accent
              }}>
                🏆 {score.correct}/{score.total} đúng
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ background: "#ffffff11", borderRadius: 10, height: 6, marginBottom: 20 }}>
              <div style={{
                width: `${((exIdx + 1) / EXERCISES.length) * 100}%`,
                height: "100%", background: COLORS.accent, borderRadius: 10, transition: "width 0.3s"
              }} />
            </div>

            {/* Exercise card */}
            <div style={{
              background: "#1a1d2e", borderRadius: 18, padding: 20,
              border: "1px solid #ffffff11", marginBottom: 16
            }}>
              {/* Direction badge */}
              <div style={{
                display: "inline-block", padding: "4px 12px", borderRadius: 20,
                background: "#ce93d822", border: "1px solid #ce93d855",
                color: COLORS.purple, fontSize: 11, fontWeight: 700, marginBottom: 14
              }}>
                🔄 Nhiệm vụ: Chuyển đổi {exercise.direction}
              </div>

              {/* Question */}
              <div style={{
                background: "#4fc3f711", border: "1px solid #4fc3f733",
                borderRadius: 12, padding: "14px 16px", marginBottom: 16
              }}>
                <div style={{ fontSize: 11, color: COLORS.blue, fontWeight: 700, marginBottom: 6 }}>📥 CÂU GỐC</div>
                <div style={{ fontSize: 15, color: COLORS.blue, fontStyle: "italic", lineHeight: 1.5 }}>
                  {exercise.question}
                </div>
              </div>

              {/* Error example if type=error */}
              {exercise.type === "error" && (
                <div style={{
                  background: "#ff525211", border: "1px solid #ff525233",
                  borderRadius: 12, padding: "12px 16px", marginBottom: 16
                }}>
                  <div style={{ fontSize: 11, color: COLORS.red, fontWeight: 700, marginBottom: 6 }}>❌ Câu sai (tìm lỗi)</div>
                  <div style={{ fontSize: 14, color: COLORS.red, fontFamily: "monospace" }}>
                    {exercise.wrongAnswer}
                  </div>
                </div>
              )}

              {/* Input */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 700, marginBottom: 8 }}>
                  📝 Viết câu đúng:
                </div>
                <textarea
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời của bạn..."
                  style={{
                    width: "100%", minHeight: 70, background: "#ffffff08",
                    border: `2px solid ${feedback === "correct" ? COLORS.green : feedback === "wrong" ? COLORS.red : "#ffffff22"}`,
                    borderRadius: 12, padding: "12px 14px", color: COLORS.text,
                    fontSize: 14, resize: "vertical", outline: "none",
                    fontFamily: "'Segoe UI', sans-serif", boxSizing: "border-box"
                  }}
                  disabled={feedback === "correct"}
                />
              </div>

              {/* Hint */}
              {showHint && (
                <div style={{
                  background: "#f0c04011", border: "1px solid #f0c04033",
                  borderRadius: 10, padding: "10px 14px", marginBottom: 12,
                  fontSize: 12, color: COLORS.accent
                }}>
                  💡 <strong>Gợi ý:</strong> {exercise.hint}
                </div>
              )}

              {/* Feedback */}
              {feedback && (
                <div style={{
                  background: feedback === "correct" ? "#69f0ae11" : "#ff525211",
                  border: `1px solid ${feedback === "correct" ? "#69f0ae33" : "#ff525233"}`,
                  borderRadius: 12, padding: "14px 16px", marginBottom: 12
                }}>
                  <div style={{
                    fontSize: 15, fontWeight: 700, color: feedback === "correct" ? COLORS.green : COLORS.red,
                    marginBottom: 8
                  }}>
                    {feedback === "correct" ? "🎉 Xuất sắc! Đúng rồi!" : "❌ Chưa đúng. Xem giải thích:"}
                  </div>
                  {(feedback === "wrong" || showAnswer) && (
                    <>
                      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>✅ Đáp án đúng:</div>
                      {exercise.answer.split("\n").map((a, i) => (
                        <div key={i} style={{ fontSize: 13, color: COLORS.green, fontWeight: 600, marginBottom: 2 }}>{a}</div>
                      ))}
                      <div style={{ marginTop: 10, fontSize: 12, color: COLORS.text, lineHeight: 1.6 }}>
                        📖 {exercise.explanation}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {!feedback && (
                  <>
                    <button onClick={checkAnswer} style={{
                      flex: 2, padding: "12px", background: COLORS.accent,
                      border: "none", borderRadius: 12, color: "#0f1117",
                      fontWeight: 800, fontSize: 14, cursor: "pointer"
                    }}>✓ Kiểm tra</button>
                    <button onClick={() => setShowHint(h => !h)} style={{
                      flex: 1, padding: "12px", background: "#f0c04022",
                      border: "1px solid #f0c04044", borderRadius: 12,
                      color: COLORS.accent, fontWeight: 700, fontSize: 13, cursor: "pointer"
                    }}>💡 Gợi ý</button>
                    <button onClick={() => setShowAnswer(true)} style={{
                      flex: 1, padding: "12px", background: "#ffffff11",
                      border: "1px solid #ffffff22", borderRadius: 12,
                      color: COLORS.muted, fontWeight: 700, fontSize: 13, cursor: "pointer"
                    }}>👁 Đáp án</button>
                  </>
                )}
                {showAnswer && !feedback && (
                  <div style={{
                    width: "100%", background: "#69f0ae11", border: "1px solid #69f0ae33",
                    borderRadius: 12, padding: "12px 16px"
                  }}>
                    {exercise.answer.split("\n").map((a, i) => (
                      <div key={i} style={{ fontSize: 14, color: COLORS.green, fontWeight: 600 }}>{a}</div>
                    ))}
                    <div style={{ marginTop: 8, fontSize: 12, color: COLORS.text }}>{exercise.explanation}</div>
                  </div>
                )}
                {(feedback || showAnswer) && (
                  <button onClick={nextEx} style={{
                    flex: 1, padding: "12px", background: COLORS.accent,
                    border: "none", borderRadius: 12, color: "#0f1117",
                    fontWeight: 800, fontSize: 14, cursor: "pointer"
                  }}>Câu tiếp theo →</button>
                )}
              </div>
            </div>

            {/* Exercise list nav */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {EXERCISES.map((_, i) => (
                <button key={i} onClick={() => setExIdx(i)} style={{
                  width: 34, height: 34, borderRadius: "50%", border: "none",
                  background: i === exIdx ? COLORS.accent : "#ffffff11",
                  color: i === exIdx ? "#0f1117" : COLORS.muted,
                  fontWeight: 700, fontSize: 13, cursor: "pointer"
                }}>{i + 1}</button>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB: CHÍNH TẢ ===== */}
        {activeTab === "spelling" && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 16 }}>
              🔤 Quy Tắc Viết Dạng So Sánh Nhất (-est / the most)
            </div>

            {/* Shortcut card */}
            <div style={{
              background: "#f0c04011", border: "2px solid #f0c04044",
              borderRadius: 16, padding: 18, marginBottom: 20
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.accent, marginBottom: 14 }}>
                ⚡ MẸO NHỚ NHANH (từ hình ảnh)
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { src: "Không ai hơn X", arrow: "=", dst: "X là nhất", color: COLORS.blue },
                  { src: "Không ai bằng X", arrow: "=", dst: "X là nhất", color: COLORS.green },
                  { src: "X là nhất", arrow: "=", dst: "Không ai hơn / bằng X", color: COLORS.purple },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "#00000033", borderRadius: 10, padding: "10px 14px"
                  }}>
                    <span style={{ fontSize: 13, color: r.color, fontWeight: 600, flex: 1 }}>{r.src}</span>
                    <span style={{ color: COLORS.accent, fontWeight: 800 }}>{r.arrow}</span>
                    <span style={{ fontSize: 13, color: r.color, fontWeight: 700, flex: 1, textAlign: "right" }}>{r.dst}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tính từ ngắn/dài */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { title: "Tính từ NGẮN (1 âm tiết)", rule: "→ thêm -er / -est", ex: "tall→taller→tallest\nfast→faster→fastest\nbig→bigger→biggest", color: COLORS.blue },
                { title: "Tính từ DÀI (≥2 âm tiết)", rule: "→ more / the most", ex: "beautiful→more→most\nimportant→more→most\nhardworking→more→most", color: COLORS.purple },
              ].map((c, i) => (
                <div key={i} style={{
                  flex: 1, minWidth: 200, background: c.color + "11",
                  border: `1px solid ${c.color}33`, borderRadius: 14, padding: 16
                }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: c.color, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.accent, marginBottom: 10 }}>{c.rule}</div>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: COLORS.text, lineHeight: 1.8 }}>
                    {c.ex.split("\n").map((line, j) => <div key={j}>{line}</div>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Spelling rules */}
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, marginBottom: 12 }}>
              📝 Quy Tắc Chính Tả Đặc Biệt:
            </div>
            {SPELLING_RULES.map((r, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                background: "#1a1d2e", borderRadius: 12, padding: "12px 16px",
                marginBottom: 10, border: `1px solid ${r.color}22`
              }}>
                <div style={{
                  width: 8, height: "100%", minHeight: 40, borderRadius: 4,
                  background: r.color, flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: r.color, marginBottom: 4 }}>{r.rule}</div>
                  <div style={{ fontSize: 12, color: COLORS.text, fontFamily: "monospace" }}>{r.example}</div>
                </div>
              </div>
            ))}

            {/* Bất quy tắc */}
            <div style={{
              background: "#ff525211", border: "2px solid #ff525233",
              borderRadius: 14, padding: 16, marginTop: 20
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.red, marginBottom: 12 }}>
                🚨 Tính từ BẤT QUY TẮC – Học Thuộc Lòng!
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  ["good", "better", "best"],
                  ["bad", "worse", "worst"],
                  ["many/much", "more", "most"],
                  ["little", "less", "least"],
                  ["far", "further", "furthest"],
                  ["old", "elder", "eldest"],
                ].map(([base, comp, sup], i) => (
                  <div key={i} style={{
                    background: "#00000033", borderRadius: 10, padding: "8px 12px",
                    display: "flex", gap: 6, alignItems: "center", fontSize: 12
                  }}>
                    <span style={{ color: COLORS.text }}>{base}</span>
                    <span style={{ color: COLORS.muted }}>→</span>
                    <span style={{ color: COLORS.blue }}>{comp}</span>
                    <span style={{ color: COLORS.muted }}>→</span>
                    <span style={{ color: COLORS.red, fontWeight: 700 }}>{sup}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
